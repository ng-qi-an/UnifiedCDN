'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Bell, Check, ChevronsUpDown, LaptopMinimal, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function UserDropdown(){
    const router = useRouter();
    const { data } = authClient.useSession();
    const { theme, setTheme } = useTheme();
    if (!data || !data.user) return null;
    const user = data.user;
    return <DropdownMenu>
            <DropdownMenuTrigger nativeButton={false} render={<span></span>}>
            <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={ "right"}
        align="start"
        sideOffset={4}
        >
        <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem><Settings />Settings</DropdownMenuItem>
            <DropdownMenuItem><Bell />Notifications</DropdownMenuItem>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>{theme == "light" ? <Check/> : <Sun/>} Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>{theme == "dark" ? <Check/> : <Moon/>} Dark</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>{theme == "system" ? <Check/> : <LaptopMinimal/>} System</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={async()=> await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                    router.replace("/auth/sign-in");
                },
                onError: (error) => {
                    toast.add({
                        title: "Error signing out",
                        description: error.error.message || "An unknown error occurred.",
                        type: "error",
                    })
                },
            },
        })}>
            <LogOut />
            Log out
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
