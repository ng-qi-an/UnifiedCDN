'use client';
import { Button } from "@/components/ui/button";
import { approveDenyApp } from "./approveDenyApp"
import { toast } from "@/components/ui/toast";
import revalidateData from "@/lib/revalidateData";

export default function ApproveDenyButtons({appId}: {appId: string}){
return <div className="flex gap-2">
        <Button size="sm" variant="outline" className="text-foreground" onClick={async()=>{
            try {
                await approveDenyApp(appId, "deny")
                await revalidateData(window.location.pathname)
            } catch (error) {
                toast.add({
                    title: "Failed to deny application",
                    description: "An error occurred while denying the application. Please try again.",
                    type: "error"
                })   
            }
        }}>Deny</Button>
        <Button size="sm" onClick={async()=>{
            try {
                await approveDenyApp(appId, "approve")
                await revalidateData(window.location.pathname)
            } catch (error) {
                toast.add({
                    title: "Failed to approve application",
                    description: "An error occurred while approving the application. Please try again.",
                    type: "error"
                })   
            }
        }}>Approve</Button>
    </div>
}