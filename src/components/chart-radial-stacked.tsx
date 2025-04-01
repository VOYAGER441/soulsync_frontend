"use client"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SentimentChartProps {
  sentiment: string;
  sentimentScore: number;
}

export function SentimentChart({ sentiment, sentimentScore }: SentimentChartProps) {
  // Normalize the sentiment scores
  const positiveScore = sentiment === "POSITIVE" ? sentimentScore : 1 - sentimentScore;
  const negativeScore = sentiment === "NEGATIVE" ? sentimentScore : 1 - sentimentScore;

  const chartData = [
    {
      sentiment: "Sentiment Analysis",
      positive: positiveScore,
      negative: negativeScore,
    },
  ];

  const chartConfig = {
    positive: {
      label: "Positive",
      color: "hsl(142, 76%, 36%)", // Green color for positive sentiment
    },
    negative: {
      label: "Negative",
      color: "hsl(0, 84%, 60%)", // Red color for negative sentiment
    },
  } satisfies ChartConfig;

  const positivePercentage = (positiveScore * 100).toFixed(2);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Positive vs Negative Sentiment</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[200px]">
          <RadialBarChart data={chartData} endAngle={180} innerRadius={70} outerRadius={110}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 14} className="fill-foreground text-xl font-bold">
                          {positivePercentage}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground text-sm">
                          Positive
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="positive"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-positive)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="negative"
              fill="var(--color-negative)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {sentiment === "POSITIVE" ? "Overwhelmingly positive sentiment detected" : "Negative sentiment detected"}
        </div>
        <div className="leading-none text-muted-foreground">
          Positive: {(positiveScore * 100).toFixed(2)}% | Negative: {(negativeScore * 100).toFixed(2)}%
        </div>
      </CardFooter>
    </Card>
  );
}

