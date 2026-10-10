'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutGrid, List } from "lucide-react";

export default function DashboardViewLayoutSwitch(){
    const searchParams = useSearchParams();
    const layout = searchParams.get("layout") || "grid";
    const router = useRouter();
    return <Tabs value={layout} onValueChange={(x)=>{
        const page = window.location.protocol + "//" + window.location.host + window.location.pathname;
        router.push(page + "?layout=" + x);
    }} className="w-max">
        <TabsList>
            <TabsTrigger value="grid">
                <LayoutGrid/>
            </TabsTrigger>
            <TabsTrigger value="list">
                <List/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
}