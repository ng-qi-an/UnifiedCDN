import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ApplicationsRendered from "./rendered";
import { Suspense } from "react";
import Link from "next/link";
import DashboardViewLayoutSwitch from "@/components/navigation/DashboardViewLayoutSwitch";

export default function ApplicationsPage(){
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Applications", href: "/dashboard/applications"}]}/>
        <DashboardBody>
            <DashboardSectionHeader title="Applications" description="View your applications and their configurations." actionRender={<>
                <DashboardViewLayoutSwitch/>
                <Button size="sm" className="h-10" nativeButton={false} render={<Link href="/dashboard/applications/create"/>}><Plus/><span>Create</span><span className="md:block hidden">New</span></Button>
                </>}/>
            <Suspense>
                <ApplicationsRendered/>
            </Suspense>
        </DashboardBody>
    </Dashboard>
}