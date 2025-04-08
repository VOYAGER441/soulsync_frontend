"use client"

import React, { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import service from "@/service"
import * as Interface from "@/interface/soul.interface"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    positive: {
        label: "Positive",
        color: "hsl(var(--chart-1))",
    },
    negative: {
        label: "Negative",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Chart({ userId }: { userId: string }) {
    const [timeRange, setTimeRange] = React.useState("90d")
    const [chartData, setChartData] = useState<Interface.ISentiment[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await service.chatService.getSentiment(userId)
            const parsedData = res.data.map((item: string) => JSON.parse(item)) // Parse serialized JSON strings
            const processedData = parsedData.map((item: { timestamp: string; sentiment?: { label: string; score: number }[] }) => ({
                timestamp: item.timestamp, // Keep raw timestamp for filtering
                displayTimestamp: new Date(item.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }), // Format for display
                positive: item.sentiment?.find((s) => s.label === "POSITIVE")?.score || 0,
                negative: item.sentiment?.find((s) => s.label === "NEGATIVE")?.score || 0,
            }))
            console.log("Processed Data:", processedData) // Debugging log
            setChartData(processedData)
        }
        fetchData()
    }, [userId])

    console.log("Chart Data Timestamps:", chartData.map(item => item.timestamp)) // Debugging log for timestamps

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.timestamp) // Use raw timestamp for filtering
        const referenceDate = new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    }).map((item) => ({
        ...item,
        timestamp: item.displayTimestamp, // Use formatted timestamp for display
    }))

    console.log("Filtered Data:", filteredData) // Debugging log

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Sentiment Chart</CardTitle>
                    <CardDescription>
                        Showing sentiment analysis for the selected time range
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-positive)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-positive)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-negative)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-negative)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => value}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="positive"
                            type="natural"
                            fill="url(#fillPositive)"
                            stroke="var(--color-positive)" // Corrected to match positive color
                            stackId="a"
                        />
                        <Area
                            dataKey="negative"
                            type="natural"
                            fill="url(#fillNegative)"
                            stroke="var(--color-negative)" // Corrected to match negative color
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
