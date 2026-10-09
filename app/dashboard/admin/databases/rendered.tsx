import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { db } from "@/lib/db";
import { userHasPermissionServer } from "@/lib/permissionHelpers";
import { applications } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { AppWindowMac, Database } from "lucide-react";
import Link from "next/link";

export default async function DatabasesRendered(){
    const data = await userHasPermissionServer({applications: ["viewAll"]});
    const fetchedApps = await db.select().from(applications).where(!data.isAuthorised ? eq(applications.ownerId, data.user.id) : undefined);
    return fetchedApps.length > 0 ? <div className="grid grid-cols-4 gap-4 p-4">
        {fetchedApps.map((app) => (
            <div key={app.id}>
                <h2>{app.name}</h2>
                <p>Owner ID: {app.ownerId}</p>
                <p>Database ID: {app.databaseId}</p>
                <p>Limit: {app.limit}</p>
                <p>Alerts: {JSON.stringify(app.alerts)}</p>
                <p>Created At: {new Date(app.createdAt).toISOString()}</p>
                <p>Updated At: {new Date(app.updatedAt).toISOString()}</p>
            </div>
        ))}
    </div> : <Empty className="border mt-4 h-full">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Database/>
            </EmptyMedia>
            <EmptyTitle>No databases yet</EmptyTitle>
            <EmptyDescription>You havent created a database yet. Get started by creating one below.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Button nativeButton={false} render={<Link href="/dashboard/admin/databases/create"/>}>Create Database</Button>
        </EmptyContent>
    </Empty>;
}