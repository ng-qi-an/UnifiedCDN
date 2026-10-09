'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const chartData = [
  { date: "2024-04-01", project1: 30, project2: 20 },
  { date: "2024-04-02", project1: 97, project2: 180 },
  { date: "2024-04-03", project1: 167, project2: 120 },
  { date: "2024-04-04", project1: 242, project2: 260 },
  { date: "2024-04-05", project1: 373, project2: 290 },
  { date: "2024-04-06", project1: 301, project2: 340 },
  { date: "2024-04-07", project1: 245, project2: 180 },
  { date: "2024-04-08", project1: 409, project2: 320 },
  { date: "2024-04-09", project1: 59, project2: 110 },
  { date: "2024-04-10", project1: 261, project2: 190 },
  { date: "2024-04-11", project1: 327, project2: 350 },
  { date: "2024-04-12", project1: 292, project2: 210 },
  { date: "2024-04-13", project1: 342, project2: 380 },
  { date: "2024-04-14", project1: 137, project2: 220 },
  { date: "2024-04-15", project1: 120, project2: 170 },
  { date: "2024-04-16", project1: 138, project2: 190 },
  { date: "2024-04-17", project1: 446, project2: 360 },
  { date: "2024-04-18", project1: 364, project2: 410 },
  { date: "2024-04-19", project1: 243, project2: 180 },
  { date: "2024-04-20", project1: 89, project2: 150 },
  { date: "2024-04-21", project1: 137, project2: 200 },
  { date: "2024-04-22", project1: 224, project2: 170 },
  { date: "2024-04-23", project1: 138, project2: 230 },
  { date: "2024-04-24", project1: 387, project2: 290 },
  { date: "2024-04-25", project1: 215, project2: 250 },
  { date: "2024-04-26", project1: 75, project2: 130 },
  { date: "2024-04-27", project1: 383, project2: 420 },
  { date: "2024-04-28", project1: 122, project2: 180 },
  { date: "2024-04-29", project1: 315, project2: 240 },
  { date: "2024-04-30", project1: 454, project2: 380 },
]

const chartConfig = {
  project1: {
    label: "project1",
    color: "var(--chart-1)",
  },
  project2: {
    label: "project2",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function DashboardChart(){
    return <ChartContainer config={chartConfig} className="h-full max-h-[300px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
            <defs>
              <linearGradient id="fillproject1" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-project1)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-project1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillproject2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-project2)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-project2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="project2"
              type="natural"
              fill="url(#fillproject2)"
              stroke="var(--color-project2)"
              stackId="a"
            />
            <Area
              dataKey="project1"
              type="natural"
              fill="url(#fillproject1)"
              stroke="var(--color-project1)"
              stackId="a"
            />
        </AreaChart>
    </ChartContainer>
}