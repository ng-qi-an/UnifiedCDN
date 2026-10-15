import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";
import revalidateData from "@/lib/revalidateData";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import KeyDialogContent from "./KeyDialogContent";
import { formatLocalDateTime } from "@/lib/time";



export default function CreateKeyDialog({appId, isOpen, onOpenChange}: {appId: string,isOpen: boolean, onOpenChange: (open: boolean) => void}){
    const [name, setName] = useState("");
    const [hasExpiry, setHasExpiry] = useState(false);
    const [expiryDate, setExpiryDate] = useState(formatLocalDateTime(new Date()));
    const [showKeyDialog, setShowKeyDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [key, setKey] = useState("");
    const pathname = usePathname();
    return <>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent>
                    <form className="contents" onSubmit={async(e)=>{
                        e.preventDefault();
                        if (!name || hasExpiry && !expiryDate) {
                            return toast.add({
                                title: "Error creating API key",
                                description: "Please fill in all required fields.",
                                type: "error",
                            })
                        }
                        if (hasExpiry && new Date(expiryDate).getTime() <= Date.now()) {
                            return toast.add({
                                title: "Error creating API key",
                                description: "Expiry date must be in the future.",
                                type: "error",
                            })
                        }
                        try {
                            const response = await fetch('/api/dashboard/applications/api-keys/create', {
                                method: 'POST',
                                body: JSON.stringify({
                                    name,
                                    hasExpiry,
                                    expiryDate: hasExpiry ? new Date(expiryDate).toISOString() : null,
                                    appId
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                            })
                            const data = await response.json();
                            if (!response.ok) {
                                return toast.add({
                                    title: "Error creating API key",
                                    description: data?.message || "An unknown error occurred.",
                                    type: "error",
                                })
                            }
                            setKey(data.key)
                            onOpenChange(false);
                            setName("");
                            setHasExpiry(false);
                            setExpiryDate(formatLocalDateTime(new Date()));
                            setShowKeyDialog(true);
                        } catch (error) {
                            console.error(error)
                            toast.add({
                                title: "Error creating API key",
                                description: error instanceof Error ? error.message : "An unknown error occurred.",
                                type: "error",
                            })
                        }
                    }}>
                        <DialogHeader>
                            <DialogTitle>Create API Key</DialogTitle>
                        </DialogHeader>
                        <KeyDialogContent name={name} setName={setName} hasExpiry={hasExpiry} setHasExpiry={setHasExpiry} expiryDate={expiryDate} setExpiryDate={setExpiryDate}/>
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={()=> onOpenChange(false)}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
        <Dialog open={showKeyDialog} onOpenChange={async (x)=>{
            setCopied(false)
            setKey("")
            setShowKeyDialog(x)
            await revalidateData(pathname)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>API Key Created</DialogTitle>
                </DialogHeader>
                <Field>
                    <FieldLabel>Key</FieldLabel>
                    <InputGroup>
                        <InputGroupInput  value={key} readOnly/>
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton disabled={copied} onClick={()=>{
                                navigator.clipboard.writeText(key)
                                setCopied(true)
                                setTimeout(()=> setCopied(false), 1000)
                            }}>
                                <Copy/>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>This is the <b>only time</b> you will be able to see this key. Make sure to copy it now.</FieldDescription>
                </Field>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={async()=> {
                        setCopied(false)
                        setKey("")
                        setShowKeyDialog(false)
                        await revalidateData(pathname)
                    }}>Close</Button>
                    <Button disabled={copied} type="button" onClick={()=>{
                        navigator.clipboard.writeText(key)
                        setCopied(true)
                        setTimeout(()=> setCopied(false), 1000)
                    }}>{copied ? "Copied!" : "Copy"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}