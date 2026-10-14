import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { db } from "@/lib/db";
import { userHasPermissionServer } from "@/lib/permissionHelpers";
import { redirect } from "next/navigation";
import AppSwitcher from "./AppSwitcher";

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
            <AppSwitcher key={appData.id} otherApps={transformedOtherApps} appId={appData.id} appName={appData.name}/>
        </div>}]}/>
        <DashboardBody>
            <DashboardSectionHeader title={`Manage "${appData.name}"`} description={appData.description}/>
            {children}
        </DashboardBody>
    </Dashboard>
}