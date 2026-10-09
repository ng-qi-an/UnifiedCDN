import { cn } from "cn";
import { ReactNode } from "react";

export default function DashboardSectionHeader({title, description, actionRender, className}: {title: string, description?: string, actionRender?: ReactNode, className?: string}){
    return <div className={cn("w-full flex gap-4 xl:pt-2 flex-col sm:flex-row sm:items-center", className)}>
        <div className="flex flex-col">
            <h1 className="font-heading text-lg font-semibold tracking-wider uppercase">{title}</h1>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {actionRender && <div className="ml-auto w-full sm:w-max">{actionRender}</div>}
    </div>
}