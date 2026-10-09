import DashboardChart from "@/components/charts/DashboardChart";
import Dashboard from "@/components/navigation/Dashboard";
import DashboardBody from "@/components/navigation/DashboardBody";
import DashboardHeader from "@/components/navigation/DashboardHeader";
import DashboardSectionHeader from "@/components/navigation/DashboardSectionHeader";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Database, FolderClosed, Upload } from "lucide-react";

export default function DashboardHome(){
    return <Dashboard>
        <DashboardHeader breadcrumbs={[{name: "Dashboard", href: "/"}]}/>
        <DashboardBody>
            <DashboardSectionHeader title="Welcome back, John Doe." description="Here's what's happening today..."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-6 w-full">
                <Card size="sm" className="gap-4">
                    <CardHeader>
                        <CardDescription>Total files</CardDescription>
                        <CardTitle className="text-2xl font-semibold">140</CardTitle>
                        <CardAction>
                            <FolderClosed className="size-4"/>
                        </CardAction>
                    </CardHeader>
                    <CardFooter>
                        <p className="font-medium text-muted-foreground">Across 5 applications</p>
                    </CardFooter>
                </Card>
                <Card size="sm" className="gap-4">
                    <CardHeader>
                        <CardDescription>Uploaded today</CardDescription>
                        <CardTitle className="text-2xl font-semibold">7</CardTitle>
                        <CardAction>
                            <Upload className="size-4"/>
                        </CardAction>
                    </CardHeader>
                    <CardFooter>
                        <p className="font-medium text-muted-foreground">First file at 6.00am</p>
                    </CardFooter>
                </Card>
                <Card size="sm" className="gap-4">
                    <CardHeader>
                        <CardDescription>This week</CardDescription>
                        <CardTitle className="text-2xl font-semibold ">21</CardTitle>
                        <CardAction>
                            <CalendarDays className="size-4"/>
                        </CardAction>
                    </CardHeader>
                    <CardFooter>
                        <p className="font-medium text-muted-foreground">Counted from Monday</p>
                    </CardFooter>
                </Card>
                <Card size="sm" className="gap-4">
                    <CardHeader>
                        <CardDescription>Storage</CardDescription>
                        <CardTitle className="text-2xl font-semibold ">1.00GB</CardTitle>
                        <CardAction>
                            <Database className="size-4"/>
                        </CardAction>
                    </CardHeader>
                    <CardFooter>
                        <p className="font-medium text-muted-foreground">Across 3 databases</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="flex mt-6 gap-4 flex-col xl:flex-row w-full">
                <Card size="sm" className="w-full">
                    <CardHeader>
                        <CardTitle className="normal-case tracking-normal">Storage</CardTitle>
                        <CardDescription>Measured from last 30 days</CardDescription>
                    </CardHeader>
                    <div className="px-4">
                        <DashboardChart/>
                    </div>
                </Card>
                <Tabs defaultValue="storage">
                    <Card size="sm" className="w-full xl:w-100 gap-1 h-full">
                        <CardHeader>
                            <CardTitle className="normal-case tracking-normal">Usage</CardTitle>
                        </CardHeader>
                        <TabsList variant="line" className="px-3">
                            <TabsTrigger value="storage">Storage</TabsTrigger>
                            <TabsTrigger value="requests">Requests</TabsTrigger>
                            <TabsTrigger value="files">Files</TabsTrigger>
                        </TabsList>
                        <TabsContent value="storage">
                            <div className="h-40 w-full bg-muted rounded-md"/>
                        </TabsContent>
                        <TabsContent value="requests">
                            <div className="h-40 w-full bg-muted rounded-md"/>
                        </TabsContent>
                    </Card>
                </Tabs>
            </div>
            <Card size="sm" className="w-full mt-6">
                <CardHeader>
                    <CardTitle className="normal-case tracking-normal">Recent activity</CardTitle>
                    <CardDescription>Measured from last 30 days</CardDescription>
                </CardHeader>
            </Card>
        </DashboardBody>
    </Dashboard>
}