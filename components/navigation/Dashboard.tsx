import { cn } from "cn"

export default function Dashboard({children, className}: {children?: React.ReactNode, className?: string}){
    return <div className={cn("w-full h-full flex flex-col", className)}> 
        {children}
    </div>
}