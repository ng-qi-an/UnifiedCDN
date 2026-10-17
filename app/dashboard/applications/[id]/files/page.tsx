import { FilesDataTable } from "@/components/tables/files/data-table";
import { filesColumns } from "@/components/tables/files/columns";
import { db } from "@/lib/db";
import { files } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

export const instant = false;

export default async function ApplicationFiles({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const filesData  = await db.select().from(files).where(eq(files.applicationId, id));
    return <div className="pt-4 h-full relative min-w-0 max-w-full">
        <FilesDataTable columns={filesColumns} data={filesData} appId={id}/>
    </div>
}