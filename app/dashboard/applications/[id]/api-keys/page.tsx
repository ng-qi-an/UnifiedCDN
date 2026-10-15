import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item"
import { auth } from "@/lib/auth"
import { Key } from "lucide-react"
import { headers } from "next/headers"

const instant = false;

export default async function APIKeysApplication(){
    const {apiKeys} = await auth.api.listApiKeys({
        headers: await headers()
    })
    return <div className="pt-4 overflow-auto">
        {apiKeys.length > 0 ? apiKeys.map((key)=>{
            return <Item>
                <ItemHeader>

                <ItemMedia variant="icon">
                    <Key/>
                </ItemMedia>
                    <ItemTitle>{key.name}</ItemTitle>

                </ItemHeader>
            </Item>
        }) : <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <Key/>
                </EmptyMedia>    
                <EmptyTitle>No API Keys</EmptyTitle>
                <EmptyDescription>
                    You have not created any API keys for this application yet.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button>Create API Key</Button>
            </EmptyContent>
        </Empty>}
    </div>
}