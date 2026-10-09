import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DatabasesRendered from "./rendered";
import { Suspense } from "react";
import Link from "next/link";

export default function ApplicationsPage(){
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Databases"}]}/>
        <DashboardBody>
            <DashboardSectionHeader title="Databases" description="View your databases and their configurations." actionRender={<Button size="sm" nativeButton={false} render={<Link href="/dashboard/admin/databases/create"/>}><Plus/><span>Create</span><span className="md:block hidden">New</span></Button>}/>
            <Suspense>
                <DatabasesRendered/>
            </Suspense>
        </DashboardBody>
    </Dashboard>
}