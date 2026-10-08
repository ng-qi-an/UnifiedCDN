import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";

export const instant = false;

export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session){
        return <div className="flex">
            <SidebarProvider>
                <DashboardSidebar/>
                <main>
                    {children} 
                </main>
            </SidebarProvider>
        </div>
    } else {
        redirect("/auth/sign-in", "replace");
    }
}