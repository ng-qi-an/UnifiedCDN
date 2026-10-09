'use client';

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardSidebarLink({href, Icon, name}: {href: string, Icon: ReactNode, name: string}){
    const pathname = usePathname();
    return <Link href={pathname == href ? "" : href}>
        <SidebarMenuItem>
            <SidebarMenuButton isActive={pathname == href}>{Icon}{name}</SidebarMenuButton>
        </SidebarMenuItem>
    </Link>
}