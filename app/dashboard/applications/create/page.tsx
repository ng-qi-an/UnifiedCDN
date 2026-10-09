import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import CreateApplicationsRendered from "./rendered";
import { Suspense } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function ApplicationsPage(){
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Applications", href: "/dashboard/applications"}, {name: "Create application"}]}/>
        <DashboardBody>
            <DashboardSectionHeader title="Create an application" beforeHeadingRender={<Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/dashboard/applications"/>}><ChevronLeft/></Button>}/>
            <Suspense>
                <CreateApplicationsRendered/>
            </Suspense>
        </DashboardBody>
    </Dashboard>
}
