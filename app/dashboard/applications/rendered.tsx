import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { applications } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { AppWindowMac } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ApplicationsRendered(){
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        return "Not logged in"
    }
    const user = session.user;
    if (!user) {
        return "User not found"
    }
    const data = await auth.api.userHasPermission({
        body: {
            userId: user.id,
            role: user.role as any,
            permissions: {"applications": ["viewAll"]}
        }
    })
    console.log("User role:", user.role);
    console.log("User has permission to view all applications:", data.success);
    const fetchedApps = await db.select().from(applications).where(!data.success ? eq(applications.ownerId, user.id) : undefined);
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
                <AppWindowMac/>
            </EmptyMedia>
            <EmptyTitle>No applications yet</EmptyTitle>
            <EmptyDescription>You havent created an application. Get started by creating one below.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Button nativeButton={false} render={<Link href="/dashboard/applications/create"/>}>Create Application</Button>
        </EmptyContent>
    </Empty>;
}