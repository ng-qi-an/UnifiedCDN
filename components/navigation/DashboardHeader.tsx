'use client';

import { Fragment } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";

export default function DashboardHeader({breadcrumbs, actionRender}: {breadcrumbs: {name?: string, href?: string, component?: string}[], actionRender?: React.ReactNode}){
    return <div className="flex items-center h-12 w-full border-b px-2">
        <SidebarTrigger/>
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return <Fragment key={index}>
                        <BreadcrumbItem>
                            {breadcrumb.name ? (isLast ?
                                <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                            :
                                <BreadcrumbLink render={<Link href={breadcrumb.href || "#"}/>}>{breadcrumb.name}</BreadcrumbLink>
                            ) : breadcrumb.component &&
                                breadcrumb.component
                            }
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator/>}
                    </Fragment>
                })}
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-1"/>
        {actionRender}
    </div>
}