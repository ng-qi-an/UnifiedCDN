import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import KeysList from "./KeysList";

export const instant = false;

export default async function APIKeysApplication({params}: {params: Promise<{id: string}>}){
    const {id: appId} = await params;
    const {apiKeys} = await auth.api.listApiKeys({
        headers: await headers()
    })
    const filteredKeys = apiKeys.filter((key)=> key.metadata?.appId === appId);
    return <KeysList appId={appId} apiKeys={filteredKeys}/>
}