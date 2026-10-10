import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { db } from "@/lib/db";
import { userHasPermissionServer } from "@/lib/permissionHelpers";
import { databases } from "@/lib/schema/schema";
import { eq, getColumns, getTableColumns } from "drizzle-orm";
import { AppWindowMac, Database } from "lucide-react";
import Link from "next/link";
import DatabaseItem from "./DatabaseItem";

export default async function DatabasesRendered({searchParams}: {searchParams: Promise<{layout?: string | undefined}>}){
    const data = await userHasPermissionServer({databases: ["viewAll"]});
    const { keys, ...databaseColumns } = getColumns(databases);
    const fetchedDbs = await db.select(databaseColumns).from(databases).where(!data.isAuthorised ? eq(databases.ownerId, data.user.id) : undefined);
    const { layout } = await searchParams;
    return fetchedDbs.length > 0 ? <div className={`grid ${layout == 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'} mt-8`}>
        {fetchedDbs.map((db, index) => <DatabaseItem key={db.id} index={index} db={db} layout={layout || 'grid'}/>)}
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