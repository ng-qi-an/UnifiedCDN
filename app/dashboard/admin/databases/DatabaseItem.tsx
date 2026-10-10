'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Database } from "@/lib/schema/schemaTypes";
import { availableServices } from "@/lib/services";
import { ChevronRight, Ellipsis, Logs, Settings, Trash, User, UserSearch } from "lucide-react";
import Link from "next/link";

export default function DatabaseItem({db, index, layout}: {db: Partial<Database>, index: number, layout: string}){
    const provider = availableServices.find((service) => service.id == db.provider);
    if (!provider) {
        return <div className="border p-4">
            <p>Unknown provider: {db.provider}</p>
        </div>
    }
    return <div className={`border flex ${layout == 'list' ? `${index != 0 && "border-t-0"} items-center` : "flex-col"} p-4 w-full cursor-default`}>
        <div className="flex flex-1 items-center order-1">
            <div className={`${layout == "list" ? "size-10" : "size-14"} shrink-0 flex items-center justify-center bg-secondary rounded-full`}>
                <provider.icon className={layout == 'list' ? "size-4" : "size-6"}/>
            </div>
            <Link href={`/dashboard/admin/databases/${db.id}`} className="group w-full">
                <div className={`${layout == 'list' ? 'ml-4' : 'ml-2'} w-full`}>
                    <p className={`font-medium ${layout == 'list' ? 'text-sm' : 'text-base'} w-full group-hover:underline`}>{db.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{provider.name}</p>
                </div> 
            </Link>
        </div>
        <div className={`${layout == 'list' ? "order-2 hidden lg:block mx-2 lg:flex-1 lg:max-w-[25%]" : "order-3 w-full mt-4"}`}>
            <p className={`text-sm text-muted-foreground w-full ${layout == 'list' ? 'xl:w-max text-center' : ""}`}>No usage limit</p>
        </div>
        <div className={`${layout == 'list' ? "order-3 mx-2 lg:flex-1 lg:max-w-[25%]" : "hidden"}`}>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><User className="size-4 "/><span className="hidden lg:inline">Owned by </span><Link href={`/dashboard/admin/users/${db.ownerId}`} className="hover:underline hover:text-foreground">John Doe</Link></p>
        </div>
        <div className={`order-4 flex items-center justify-end ${layout == "list" ? "ml-4 " : "mt-4"}`}>
            <Link href={`/dashboard/admin/users/${db.ownerId}`} className={layout == 'list' ? 'hidden' : "w-full hover:underline hover:text-foreground"}>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><User className="size-4"/><span className="line-clamp-1 break-all">John Doe</span></p>
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
                            <DropdownMenuItem render={<Link href={`/dashboard/admin/databases/${db.id}/logs`}/>}><Logs/> View Logs</DropdownMenuItem>
                            <DropdownMenuItem render={<Link href={`/dashboard/admin/users/${db.ownerId}`}/>}><UserSearch/> View Owner</DropdownMenuItem>
                            <DropdownMenuItem render={<Link href={`/dashboard/admin/databases/${db.id}/settings`}/>}><Settings/> Configure</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem render={<Link href={`/dashboard/admin/databases/${db.id}/settings#danger-zone`}/>} variant="destructive"><Trash/> Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Button size="sm" variant="secondary" className={"bg-transparent w-9 sm:w-auto sm:bg-secondary"} nativeButton={false} render={<Link href={`/dashboard/admin/databases/${db.id}`}/>}><span className="hidden sm:block">View</span> <ChevronRight/></Button>
        </div>
    </div>
}