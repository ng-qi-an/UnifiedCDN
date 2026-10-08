import { Label } from "@/components/ui/label";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AppWindowMac, Book, Cloud, Database, ExternalLink, Home, Key, Logs, Search, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserDropdown from "./UserDropdown";

export default async function DashboardSidebar() {
    return <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-2! mt-1 hover:bg-transparent active:bg-transparent">
                        <Cloud className="size-5.5!" fill={"var(--foreground)"}/>
                        <span className="text-base font-semibold ml-1">Unified CDN</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search for anything..."
                        className="pl-8"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Link href="/dashboard">
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive><Home/>Dashboard</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/applications">
                            <SidebarMenuItem>
                                <SidebarMenuButton><AppWindowMac/>Applications</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/api-keys">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Key/>API Keys</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/logs">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Logs/>Logs</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Link href="/dashboard/admin/users">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Users/>Users</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/admin/databases">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Database/>Databases</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/admin/audit">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Shield/>Audit</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/dashboard/admin/settings">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Settings/>Settings</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Help</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Link href="/">
                            <SidebarMenuItem>
                                <SidebarMenuButton><Book/>Documentation</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                        <Link href="/">
                            <SidebarMenuItem>
                                <SidebarMenuButton><ExternalLink/>Github</SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Suspense fallback={<div className="p-2">Loading...</div>}>
                        <UserDropdown/>
                    </Suspense>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
}