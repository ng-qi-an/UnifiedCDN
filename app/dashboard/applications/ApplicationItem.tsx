import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Application, Database } from "@/lib/schema/schemaTypes";
import { availableServices } from "@/lib/services";
import { ChevronRight, Ellipsis, Logs, Settings, Trash, User, UserSearch } from "lucide-react";
import Link from "next/link";
import UsageBar from "@/components/UsageBar";

export default function ApplicationItem({app, index, layout, length, showUserAndDB}: {app: Partial<Application> & {files: {size: number}[], owner: {name: string} | null, database: {id: string, name: string, provider: string} | null}, index: number, layout: string, length: number, showUserAndDB: boolean}){
    const provider = availableServices.find((service) => service.id == app.database?.provider);
    
    return <div className={`border dark:border-l-transparent dark:border-r-transparent dark:border-b-transparent dark:bg-card flex ${layout == 'list' ? `${index == length -1 ? `border-b-border dark:border-b-transparent` : `border-b-transparent`} ${index == 0 && 'dark:border-t-transparent'} items-center` : "flex-col dark:border-none"} p-4 w-full cursor-default`}>
        <div className="flex flex-1 items-center order-1">
            <div className={`${layout == "list" ? "size-10" : "size-14"} shrink-0 flex items-center justify-center bg-secondary rounded-full`}>
                {provider ? <provider.icon className={layout == 'list' ? "size-4" : "size-6"}/> : <></>}
            </div>
                    <div className={`${layout == 'list' ? 'ml-4' : 'ml-2'} w-full`}>
                    <Link href={`/dashboard/applications/${app.id}`} className="group w-full">
                        <p className={`font-medium ${layout == 'list' ? 'text-sm' : 'text-base'} w-full group-hover:underline flex items-center gap-2`}>
                            {app.name}
                        </p>
                    </Link>
                    <Link href={showUserAndDB ? `/dashboard/admin/databases/${app.database?.id}` : "#"} className={`group w-full ${showUserAndDB ? 'hover:underline' : 'cursor-default'}`}>
                        <p className="text-sm text-muted-foreground line-clamp-1">{app.database?.name ?? "Unknown database"}</p>
                    </Link>
                </div> 
        </div>
        <div className={`${layout == 'list' ? "order-2 hidden lg:block mx-2 lg:flex-1 lg:max-w-[25%]" : "order-3 w-full mt-4"}`}>
            <div className={`w-full ${layout == 'list' && "max-w-45"}`}><UsageBar files={app.files || []} limit={app.limit || 0} alerts={app.alerts}/></div>
        </div>
        <div className={`${layout == 'list' ? "order-3 mx-2 lg:flex-1 lg:max-w-[25%]" : "hidden"}`}>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><User className="size-4 "/><span className="hidden lg:inline">Owned by </span><Link href={`/dashboard/admin/users/${app.ownerId}`} className="hover:underline hover:text-foreground">{app.owner?.name ?? "Unknown user"}</Link></p>
        </div>
        <div className={`order-4 flex items-center justify-end ${layout == "list" ? "ml-4 " : "mt-4"}`}>
            <Link href={showUserAndDB ? `/dashboard/admin/users/${app.ownerId}` : "#"} className={layout == 'list' ? 'hidden' : `w-full ${showUserAndDB ? 'hover:underline hover:text-foreground' : 'cursor-default'}`}>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><User className="size-4"/><span className="line-clamp-1 break-all">{app.owner?.name ?? "Unknown user"}</span></p>
            </Link>
            <div className="hidden sm:block mr-1">
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button size="icon-sm" variant="ghost">
                            <Ellipsis/>
                        </Button>}
                    />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>More actions</DropdownMenuLabel>
                            <DropdownMenuItem render={<Link href={`/dashboard/applications/${app.id}/logs`}/>}><Logs/> View Logs</DropdownMenuItem>
                            {showUserAndDB && <DropdownMenuItem render={<Link href={`/dashboard/admin/users/${app.ownerId}`}/>}><UserSearch/> View Owner</DropdownMenuItem>}
                            <DropdownMenuItem render={<Link href={`/dashboard/applications/${app.id}/settings`}/>}><Settings/> Configure</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem render={<Link href={`/dashboard/applications/${app.id}/settings#danger-zone`}/>} variant="destructive"><Trash/> Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Button size="sm" variant="secondary" className={"bg-transparent w-9 sm:w-auto sm:bg-secondary"} nativeButton={false} render={<Link href={`/dashboard/admin/databases/${app.id}`}/>}><span className="hidden sm:block">View</span> <ChevronRight/></Button>
        </div>
    </div>
}