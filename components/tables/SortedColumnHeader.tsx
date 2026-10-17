import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

export default function SortedColumnHeader({column, children}:{column: any, children: React.ReactNode}) {
    const sorted = column.getIsSorted();
    const SortedIcon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown
    return <span onClick={()=>column.toggleSorting()} className={`cursor-pointer items-center flex ${sorted ? "text-foreground" : "hover:text-foreground/80"}`}>
        {children}
        <SortedIcon className="inline-block size-4 ml-1"/>
    </span>

}