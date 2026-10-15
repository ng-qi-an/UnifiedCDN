'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, Key, LayoutGrid, Logs, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ApplicationTabs({appId}: {appId: string}){
    const pathname = usePathname();
    const router = useRouter();
    const normalisedPathname = pathname.split("/")[pathname.split("/").length - 1]
    
    console.log("Normalised pathname:", normalisedPathname);
    return <div className="border-b">
            <Tabs value={normalisedPathname} defaultValue={appId} onValueChange={(value) => {
            router.push(`/dashboard/applications/${appId}/${value == appId ? "" : value}`);
        }}> 
            <TabsList variant="line" className="mt-4 w-full">
                <TabsTrigger value={appId}><LayoutGrid/> Overview</TabsTrigger>
                <TabsTrigger value="files"><FolderOpen/>Files</TabsTrigger>
                <TabsTrigger value="api-keys"><Key />API Keys</TabsTrigger>
                <TabsTrigger value="logs"><Logs/>Logs</TabsTrigger>
                <TabsTrigger value="settings"><Settings/>Settings</TabsTrigger>
            </TabsList>
        </Tabs>
    </div>
}