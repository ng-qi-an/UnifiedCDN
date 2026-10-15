import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { InvalidConfigurationError, NotFoundError } from "@/lib/errors";
import { errorToResponse, userHasPermissionServer, verifyUser } from "@/lib/permissionHelpers";
import { applications } from "@/lib/schema/schema";
import { and, eq } from "drizzle-orm";

export const POST = verifyUser(async(req, ctx, user) => {
    const { name, hasExpiry, expiryDate, appId, keyId } = await req.json();
    if (!name || !appId || hasExpiry && !expiryDate){
        return errorToResponse(new InvalidConfigurationError())
    }
    const viewAllPerms = await userHasPermissionServer({applications: ["viewAll"]}, user);
    const app = await db.select().from(applications).where(and(eq(applications.id, appId), viewAllPerms.isAuthorised ? undefined : eq(applications.ownerId, viewAllPerms.user.id)));
    if (!app){
        return errorToResponse(new NotFoundError("The application you are trying to edit an API key for does not exist or you do not have access to it."))
    }
    const expiryDateObj = hasExpiry ? new Date(expiryDate) : null;
    try {
        const result = await auth.api.updateApiKey({
            body: {
                keyId,
                userId: user.id,
                name,
                expiresIn: expiryDateObj ? Math.ceil((expiryDateObj.getTime() - Date.now()) / 1000) : null,
            }
        })
        return Response.json({ message: "API key updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return errorToResponse(error)
    }
})