import 'server-only'
import { headers } from "next/headers";
import { auth } from "./auth";
import { User } from "./schema/schemaTypes";
import { CustomHttpError, InsufficientPermissionsError, UnauthorisedError } from "./errors";
import { NextRequest } from "next/server";
import { unstable_rethrow } from "next/navigation";

export async function getUser(){
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        throw new UnauthorisedError();
    }
    const user = session.user;
    if (!user) {
        throw new UnauthorisedError();
    }
    return user;
}

export async function userHasPermissionServer(permissions: Record<string, string[]>, existingUser?: User) {
    const user = existingUser ?? await getUser();
    const data = await auth.api.userHasPermission({
        body: {
            userId: user.id,
            role: user.role as any,
            permissions
        }
    })
    return {isAuthorised: data.success, user, error: data.error};
}
// For API
export function errorToResponse(error: unknown): Response {
    unstable_rethrow(error)
    if (error instanceof CustomHttpError) {
        return Response.json({ error: error.name, message: error.message },{ status: error.status_code })
    }
    console.error(error)
    return Response.json({ error: 'INTERNAL', message: "An unexpected error occured"}, { status: 500 })
}

export function verifyUser<C extends { params: Promise<unknown> }>(handler: (req: NextRequest, ctx: C, user: User)=> Promise<Response>){
    return async(req: NextRequest, ctx: C)=>{
        let user: User;
        try {
            user = await getUser();
        } catch (error) {
            return errorToResponse(error);
        }
        return handler(req, ctx, user);
    }
}

export function verifyUserWithPermission<C extends { params: Promise<unknown> }>(permissions: Record<string, string[]>, handler: (req: NextRequest, ctx: C, user: User)=> Promise<Response>){
    return verifyUser(async(req, ctx: C, user: User)=>{
        const data = await userHasPermissionServer(permissions, user);
        if (!data.isAuthorised) {
            return errorToResponse(new InsufficientPermissionsError());
        }
        return handler(req, ctx, user);
    })
}