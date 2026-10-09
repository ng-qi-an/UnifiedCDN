'use client';
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Database } from "@/lib/schema/schema";
import { AppWindowMac, ArrowDown, ArrowRight, Cloud, DatabaseIcon, LaptopMinimal, OctagonAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProviderSelector from "./ProviderSelector";
import { availableServices } from "@/lib/services";

export function CreateDatabasesForm({fetchedDatabases, createPerms}: {fetchedDatabases: Partial<Database>[], createPerms: any}){
    'use client';
    const [name, setName] = useState("");
    const [limit, setLimit] = useState("20");
    const [limitUnit, setLimitUnit] = useState("gb");
    const [limitAlert, setLimitAlert] = useState("80");
    const [visibility, setVisibility] = useState("private");
    const [provider, setProvider] = useState("cloudflare-r2");
    const [key, setKey] = useState("");
    return <div className="grid grid-cols-1 flex-1 min-h-0 w-full gap-4">
        <form className="w-full h-full flex flex-col min-h-0 pt-4">
            <div className="w-full h-full overflow-auto flex flex-col xl:grid xl:grid-cols-2 gap-1 p-1">
                <Card className="w-full h-max xl:h-full">
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Information about your new database</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                                <FieldDescription>The name of your database. Must be unique.</FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Visibility</FieldLabel>
                                <Select items={[{label: "Public", value: "public"}, {label: "Private", value: "private"}]} onValueChange={(value)=> setVisibility(value!)} value={visibility}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldDescription>{visibility == "public" ? "All users can view and use this database. Only you can edit it." : "Only you and admins can use and edit this database."} </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Global limits</FieldLabel>
                                <div className="flex items-center">
                                    <Slider max={100} step={0.5} value={Number(limit)} onValueChange={(value)=> setLimit(value.toString())} />
                                    <Input value={limit} onChange={(e)=> setLimit(Number(e.target.value) >= 0 ? e.target.value.replace(/^0+(?=\d)/, "") : 0 || "0")} className="w-14 text-center mx-2"/>
                                    <Select items={[{label: "GB", value: "gb"}, {label: "MB", value: "mb"}, {label: "KB", value: "kb"}]} onValueChange={(value)=> setLimitUnit(value!)} value={limitUnit}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gb">GB</SelectItem>
                                            <SelectItem value="mb">MB</SelectItem>
                                            <SelectItem value="kb">KB</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FieldDescription>{Number(limit) == 0 ? "The database will not have a size limit." : `The database will stop accepting files when it exceeds ${limit} ${limitUnit.toUpperCase()}.`}</FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Limit alert</FieldLabel>
                                <div className="flex items-center">
                                    <Slider max={100} step={1} value={Number(limitAlert)} onValueChange={(value)=> setLimitAlert(value.toString())} />
                                    <Input value={limitAlert} onChange={(e)=> setLimitAlert(Math.max(0, Math.min(Number(e.target.value) || 0, 100)).toString() || "0")} className="w-14 text-center mx-2"/>
                                    %
                                </div>
                                <FieldDescription>{Number(limit) == 0 ? "You will not receive any alerts." : `You will recieve alerts when the database exceeds ${Math.round((Number(limitAlert) / 100) * Number(limit))} ${limitUnit.toUpperCase()}.`}</FieldDescription>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
                <div className="w-full h-max xl:h-full flex flex-col">
                    <Card className="w-full h-max xl:h-full">
                        <CardHeader>
                            <CardTitle>Service</CardTitle>
                            <CardDescription>Connect your database to a Content Delivery Network (CDN)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Provider</FieldLabel>
                                    <FieldDescription>Choose wisely. This cannot be changed later.</FieldDescription>
                                    <ProviderSelector value={provider} onChange={(value) => setProvider(value)} />
                                </Field>
                                <Field>
                                    <FieldLabel>Key</FieldLabel>
                                    <Input type="text" value={key} onChange={(e)=> setKey(e.target.value)}/>
                                    <FieldDescription>Input your API key obtained from <a href={availableServices.find(s => s.id === provider)?.href} target="_blank" rel="noopener noreferrer">{availableServices.find(s => s.id === provider)?.name}</a>.</FieldDescription>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
                <Button className="w-full" type="submit" variant="secondary">
                    Cancel
                </Button>
                <Button className="w-full" type="submit">
                    Create database
                </Button>
            </div>
        </form>
    </div>
}