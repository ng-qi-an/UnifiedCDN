import { cn } from "cn"

export default function DashboardBody({children, className}: {children?: React.ReactNode, className?: string}){
    return <div className="w-full h-full flex justify-center overflow-auto"> 
        <div className={cn("w-full max-w-[1200px] h-full flex flex-col px-6 pt-8 pb-6", className)}>
            {children}
        </div>
    </div>
}