import { db } from "@/lib/db";
import { userHasPermissionServer } from "@/lib/permissionHelpers";
import { databases } from "@/lib/schema/schema";
import { eq, or } from "drizzle-orm";
import { CreateApplicationsForm } from "./form";
import { User } from "@/lib/schema/schemaTypes";
import { redirect } from "next/navigation";

export default async function CreateApplicationsRendered(){
    const createPerms = await userHasPermissionServer({applications: ["create"]});
    const requestPerms = await userHasPermissionServer({applications: ["request"]}, createPerms.user as User);
    const viewAllDbPerms = await userHasPermissionServer({databases: ["viewAll"]}, createPerms.user as User);
    if (!createPerms.isAuthorised && !requestPerms.isAuthorised) {
        return redirect("/dashboard/applications", "replace");
    }
    const fetchedDatabases = await db.select({id: databases.id, name: databases.name, ownerId: databases.ownerId, service: databases.service, visibility: databases.visibility}).from(databases).where(!viewAllDbPerms.isAuthorised ? or(eq(databases.visibility, "public"), eq(databases.ownerId, createPerms.user.id)) : undefined);
    let dbCreatePerms;
    if (fetchedDatabases.length < 1) {
        dbCreatePerms = await userHasPermissionServer({databases: ["create"]}, createPerms.user as User);
    }
    return <CreateApplicationsForm dbCreatePerms={dbCreatePerms} fetchedDatabases={fetchedDatabases} createPerms={createPerms} requestPerms={requestPerms}/>;
}
