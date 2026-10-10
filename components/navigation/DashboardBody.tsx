import { cn } from "cn"

export default function DashboardBody({children, className}: {children?: React.ReactNode, className?: string}){
    return <div className="w-full h-full flex justify-center overflow-auto"> 
        <div className={cn("w-full max-w-[1200px] h-full flex overflow-auto flex-col p-4 pt-6 md:px-6 md:pt-8 md:pb-6", className)}>
            {children}
        </div>
    </div>
}
