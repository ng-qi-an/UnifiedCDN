import { db } from "@/lib/db";
import { InvalidConfigurationError, NotFoundError } from "@/lib/errors";
import { errorToResponse, userHasPermissionServer, verifyUser } from "@/lib/permissionHelpers";
import { apikey } from "@/lib/schema/auth-schema";
import { and, eq } from "drizzle-orm";

export const DELETE = verifyUser(async(req, ctx, user) => {
    const { keyId } = await req.json();
    if (!keyId){
        return errorToResponse(new InvalidConfigurationError())
    }
    const viewAllPerms = await userHasPermissionServer({applications: ["viewAll"]}, user);
    const keyData = await db.select().from(apikey).where(and(eq(apikey.id, keyId), viewAllPerms.isAuthorised ? undefined : eq(apikey.referenceId, viewAllPerms.user.id)));
    if (!keyData){
        return errorToResponse(new NotFoundError("The API key you are trying to delete does not exist or you do not have access to it."))
    }
    await db.delete(apikey).where(eq(apikey.id, keyId));
    return Response.json({ message: "API key deleted successfully" }, { status: 200 });
})