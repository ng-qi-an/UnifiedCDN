'use client';
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "@/lib/schema/schema";
import { AppWindowMac, ArrowDown, ArrowRight, Cloud, DatabaseIcon, LaptopMinimal, OctagonAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CreateApplicationsForm({dbCreatePerms, fetchedDatabases, createPerms, requestPerms}: {dbCreatePerms?: any, fetchedDatabases: Partial<Database>[], createPerms: any, requestPerms: any}){
    'use client';
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [databaseId, setDatabaseId] = useState("");
    return <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0 w-full gap-4 pt-4">
        <form className="w-full h-full flex flex-col min-h-0">
            <Link href={dbCreatePerms?.isAuthorised ? "/dashboard/admin/databases/create" : ""}>
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
            </Link>
            <div className="w-full h-full overflow-auto scroll-fade">
                <Card>
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Information about your new application</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input disabled={fetchedDatabases.length == 0} type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                                <FieldDescription>The name of your application. Must be unique.</FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Input disabled={fetchedDatabases.length == 0} type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/>
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
                                <Select disabled={fetchedDatabases.length == 0} items={fetchedDatabases.map((base) => ({label: base.name, value: base.id}))} value={databaseId} onValueChange={(value) => setDatabaseId(value || "")}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Your databases</SelectLabel>
                                            {fetchedDatabases.filter((base)=> base.ownerId === createPerms.user.id).map((base)=>{
                                                return <SelectItem key={base.id} value={base.id}>{base.name}</SelectItem>
                                            })}
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel>Public databases</SelectLabel>
                                            {fetchedDatabases.filter((base)=> base.ownerId !== createPerms.user.id).map((base)=>{
                                                return <SelectItem key={base.id} value={base.id}>{base.name}</SelectItem>
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>Manage access to your new application</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
            <Button className="w-full mt-4" type="submit">
                {createPerms.isAuthorised ? "Create Application" : "Request Application"}
            </Button>
        </form>
        <div className='hidden lg:block h-full'>
            <div className="relative border dark:border-none dark:bg-card flex flex-col h-full items-center justify-center p-4">
                <p className="uppercase font-medium text-xs absolute top-3 text-muted-foreground">Visualisation</p>
                <Item className="w-max" variant="outline">
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
                <Item className="w-max" variant="outline">
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
                <Item className={`${!name && "border-dashed border-2 text-muted-foreground"} w-max`} variant="outline">
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
                <Item className={`${!name && "border-dashed border-2 text-muted-foreground"} w-max`} variant="outline">
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