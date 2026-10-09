'use server';
import { headers } from "next/headers";
import { auth } from "./auth";
import { User } from "./schema/schemaTypes";

export async function userHasPermissionServer(permissions: Record<string, string[]>, existingUser?: User) {
    let user;
    if (!existingUser){
        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session) {
            throw new Error("Unauthorised");
        }
        user = session.user;
        if (!user) {
            throw new Error("Unauthorised");
        }
    } else {
        user = existingUser;
    }
    const data = await auth.api.userHasPermission({
        body: {
            userId: user.id,
            role: user.role as any,
            permissions
        }
    })
    return {isAuthorised: data.success, user, error: data.error};
}