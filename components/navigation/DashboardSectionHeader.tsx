import { cn } from "cn";
import { ReactNode } from "react";

export default function DashboardSectionHeader({title, description, beforeHeadingRender, actionRender, className}: {title: string, description?: string, beforeHeadingRender?: ReactNode, actionRender?: ReactNode, className?: string}){
    return <div className={cn("w-full flex xl:pt-2 flex-col sm:flex-row sm:items-center", className)}>
        <div className="flex items-center">
            {beforeHeadingRender}
            <div className="flex flex-col mr-4 ml-2">
                <h1 className="font-heading text-lg font-semibold tracking-wider uppercase">{title}</h1>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
        </div>
        {actionRender && <div className="ml-auto w-full sm:w-max">{actionRender}</div>}
    </div>
}