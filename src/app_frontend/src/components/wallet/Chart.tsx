"use client";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 106, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Chart() {
  return (
    <Card className="mt-6 border-none">
      <CardHeader>
        <CardTitle className="font-heading">
          Income - Expenditure Chart
        </CardTitle>
        <CardDescription className="font-body">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className=" h-80 w-full">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart width={48} height={48} data={chartData}>
            <Bar dataKey="desktop" fill="#28a745" radius={4} />
            <Bar dataKey="mobile" fill="#FFD700" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none font-body">
          Expenses are up 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground font-body">
          <span className="font-medium text-gray-400">
            Consider cutting costs to avoid expenses outside your budget.
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
