"use client"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

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
  };

  const positivePercentage = (positiveScore * 100).toFixed(2);

  return (
    <div className="inline-flex items-center bg-gray-800  mt-1 rounded-xl ">
      <ChartContainer config={chartConfig} className="w-20 h-20">
        <RadialBarChart data={chartData} endAngle={180} innerRadius={30} outerRadius={42} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xs font-bold text-white">
                        {positivePercentage}%
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar dataKey="positive" stackId="a" cornerRadius={2} fill="var(--color-positive)" className="stroke-transparent" />
          <RadialBar dataKey="negative" fill="var(--color-negative)" stackId="a" cornerRadius={2} className="stroke-transparent" />
        </RadialBarChart>
      </ChartContainer>
      <div className="text-xs ml-1 text-white">
        <div className="font-medium">Sentiment</div>
        <div className="text-muted-foreground">
          {sentiment === "POSITIVE" ? "Very Positive" : sentiment === "NEGATIVE" ? "Negative" : "Neutral"}
        </div>
      </div>
    </div>
  );
}
