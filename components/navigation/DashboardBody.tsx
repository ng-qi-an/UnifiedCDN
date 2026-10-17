import { cn } from "cn"

export default function DashboardBody({children, className}: {children?: React.ReactNode, className?: string}){
    return <div className="min-w-0 max-w-full w-full h-full flex justify-center overflow-x-hidden overflow-y-auto">
        <div className={cn("min-w-0 max-w-[1200px] w-full h-full flex overflow-x-hidden overflow-y-auto flex-col p-4 pt-6 md:px-6 md:pt-8 md:pb-6", className)}>
            {children}
        </div>
    </div>
}
