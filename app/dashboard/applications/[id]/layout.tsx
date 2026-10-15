import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { db } from "@/lib/db";
import { userHasPermissionServer } from "@/lib/permissionHelpers";
import { redirect } from "next/navigation";
import AppSwitcher from "./AppSwitcher";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationTabs from "./ApplicationTabs";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export const instant = false;

export default async function ApplicationPage({params, children}: {params: Promise<{id: string}>, children: React.ReactNode}){
    const { id } = await params;
    const viewAllPerms = await userHasPermissionServer({applications: ["viewAll"]});
    const appData = await db.query.applications.findFirst({
        where: {
            id,
            ownerId: viewAllPerms.isAuthorised ? {isNotNull: true} : viewAllPerms.user.id
        },
    })
    if (!appData) return redirect("/dashboard/applications");
    
    const otherApps = await db.query.applications.findMany({
        where: {
            ownerId: viewAllPerms.isAuthorised ? {isNotNull: true} : viewAllPerms.user.id
        },
        columns: {
            id: true,
            name: true
        }
    })
    const transformedOtherApps = otherApps.map((app)=> ({label: app.name, value: app.id}))
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Applications", href: "/dashboard/applications"}, {component: <div className="flex items-center">
            <AppSwitcher otherApps={transformedOtherApps} appId={appData.id} appName={appData.name}/>
        </div>}]}/>
        <DashboardBody>
            <DashboardSectionHeader title={`${appData.name}`} description={appData.description} actionRender={<Button size="icon-sm" variant="ghost"><Ellipsis/></Button>}/>
            <ApplicationTabs appId={appData.id}/>
            {children}
        </DashboardBody>
    </Dashboard>
}