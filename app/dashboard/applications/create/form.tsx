'use client';
import DotField from "@/components/DotField";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "@/lib/schema/schemaTypes";
import { AppWindowMac, ArrowDown, ArrowRight, Cloud, DatabaseIcon, LaptopMinimal, OctagonAlert } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export function CreateApplicationsForm({dbCreatePerms, fetchedDatabases, createPerms, requestPerms}: {dbCreatePerms?: any, fetchedDatabases: Partial<Database>[], createPerms: any, requestPerms: any}){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [databaseId, setDatabaseId] = useState("");
    const { resolvedTheme } = useTheme();
    return <div className="flex flex-col lg:flex-row flex-1 min-h-0 w-full gap-2 pt-4">
        <form className="w-full h-full flex flex-col min-h-0">
            {fetchedDatabases.length === 0 && <Link href={dbCreatePerms?.isAuthorised ? "/dashboard/admin/databases/create" : ""}>
                    <Alert variant="destructive" className={`mb-4 ${dbCreatePerms?.isAuthorised ? "cursor-pointer" : "cursor-default"}`}>
                        <OctagonAlert/>
                        <AlertTitle>No available databases to connect.</AlertTitle>
                        <AlertDescription>{dbCreatePerms?.isAuthorised ? "Create a new database, then return back to the form." : "Contact your administrator to create a database, or give you access to one. Once complete, return back to this page."}</AlertDescription>
                    {dbCreatePerms?.isAuthorised && <AlertAction> 
                        <Button size="icon-sm" variant="secondary">
                            <ArrowRight/>
                        </Button>
                    </AlertAction>}
                </Alert>
            </Link>}
            <div className="w-full h-full overflow-auto p-0.5 space-y-2">
                <Card >
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Information about your new application</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input required disabled={fetchedDatabases.length == 0} type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                                <FieldDescription>The name of your application. Must be unique.</FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Input disabled={fetchedDatabases.length == 0} type="text" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="No description provided."/>
                                <FieldDescription>Short description of what this application is used for.</FieldDescription>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Database</CardTitle>
                        <CardDescription>Connect your application to a Database</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Database</FieldLabel>
                                <Select required disabled={fetchedDatabases.length == 0} items={fetchedDatabases.map((base) => ({label: base.name, value: base.id}))} value={databaseId} onValueChange={(value) => setDatabaseId(value || "")}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fetchedDatabases.filter((base)=> base.ownerId === createPerms.user.id).length > 0 && <SelectGroup>
                                            <SelectLabel>Your databases</SelectLabel>
                                            {fetchedDatabases.filter((base)=> base.ownerId === createPerms.user.id).map((base)=>{
                                                return <SelectItem key={base.id} value={base.id}>{base.name}</SelectItem>
                                            })}
                                        </SelectGroup>}
                                        {fetchedDatabases.filter((base)=> base.visibility == "public").length > 0 && <SelectGroup>
                                            <SelectLabel>Public databases</SelectLabel>
                                            {fetchedDatabases.filter((base)=> base.visibility == "public").map((base)=>{
                                                return <SelectItem key={base.id} value={base.id}>{base.name}</SelectItem>
                                            })}
                                        </SelectGroup>}
                                        {fetchedDatabases.filter((base)=> base.ownerId !== createPerms.user.id).length > 0 && <SelectGroup>
                                            <SelectLabel>Others' Databases</SelectLabel>
                                            {fetchedDatabases.filter((base)=> base.ownerId !== createPerms.user.id).map((base)=>{
                                                return <SelectItem key={base.id} value={base.id}>{base.name}</SelectItem>
                                            })}
                                        </SelectGroup>}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <Link href="/dashboard/applications">
                    <Button variant="secondary" type="button" className="w-full hidden md:block">
                        Cancel
                    </Button>
                </Link>
                <Button className="w-full" type="submit">
                    {createPerms.isAuthorised ? "Create Application" : "Request Application"}
                </Button>
            </div>
        </form>
        <div className='hidden lg:block h-full lg:min-w-[300px] xl:min-w-[450px]'>
            <div className="relative overflow-hidden border dark:border-none dark:bg-transparent flex flex-col h-full items-center justify-center p-4">
                <div className="absolute -z-1 dark:bg-card top-0 left-0 w-full h-full">
                    <DotField
                        key={resolvedTheme}
                        className="opacity-20 h-full"
                        dotRadius={2.5}
                        dotSpacing={14}
                        cursorRadius={0}
                        cursorForce={0}
                        bulgeOnly
                        bulgeStrength={0}
                        glowRadius={0}
                        sparkle={false}
                        waveAmplitude={0}
                        gradientFrom={resolvedTheme == "light" ? "#000" : "#ffffff"}
                        gradientTo={ resolvedTheme == "light" ? "#000" : "#ffffff"}
                        glowColor={resolvedTheme == "light" ? "#fff" : "#000"}
                    />
                </div>
                <p className="uppercase font-medium text-xs absolute top-3 text-muted-foreground">Visualisation</p>
                <Item className="w-max bg-background dark:bg-secondary" variant="outline">
                    <ItemMedia variant="icon">
                        <LaptopMinimal/>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Client</ItemTitle>
                    </ItemContent>
                </Item>
                <div className="my-4 flex flex-col items-center">
                    <div className="w-0 h-3 border border-muted-foreground border-dashed"/>
                    <ArrowDown className="text-muted-foreground size-4"/>
                </div>
                <Item className="w-max bg-background dark:bg-secondary" variant="outline">
                    <ItemMedia variant="icon">
                        <Cloud/>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Unified CDN</ItemTitle>
                    </ItemContent>
                </Item>
                <div className="my-4 flex flex-col items-center">
                    <div className="w-0 h-3 border border-muted-foreground border-dashed"/>
                    <ArrowDown className="text-muted-foreground size-4"/>
                </div>
                <Item className={`${!name && "border-dashed border-2 text-muted-foreground"} w-max bg-background dark:bg-secondary`} variant="outline">
                    <ItemMedia variant="icon">
                        <AppWindowMac/>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{name || "New application"}</ItemTitle>
                    </ItemContent>
                </Item>
                <div className="my-4 flex flex-col items-center">
                    <div className="w-0 h-3 border border-muted-foreground border-dashed"/>
                    <ArrowDown className="text-muted-foreground size-4"/>
                </div>
                <Item className={`${!databaseId && "border-dashed border-2 text-muted-foreground"} w-max  bg-background dark:bg-secondary`} variant="outline">
                    <ItemMedia variant="icon">
                        <DatabaseIcon/>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{fetchedDatabases.find((x)=> x.id == databaseId)?.name || "Untitled Database"}</ItemTitle>
                    </ItemContent>
                </Item>
            </div>
        </div>
    </div>
}