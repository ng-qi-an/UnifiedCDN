import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ApplicationsRendered from "./rendered";
import { Suspense } from "react";
import Link from "next/link";

export default function ApplicationsPage(){
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Dashboard", href: "/dashboard"}, {name: "Applications", href: "/dashboard/applications"}]}/>
        <DashboardBody>
            <DashboardSectionHeader title="Applications" description="Manage your applications and their settings." actionRender={<Button size="sm" nativeButton={false} render={<Link href="/dashboard/applications/create"/>}><Plus/><span>Create</span><span className="md:block hidden">New</span></Button>}/>
            <Suspense>
                <ApplicationsRendered/>
            </Suspense>
        </DashboardBody>
    </Dashboard>
}