"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const title = "An area chart with axes";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartAreaAxesProps {
  className?: string;
  noWrapper?: boolean;
  data?: any[];
}

const ChartAreaAxes = ({ className = "", noWrapper = false, data = [] }: ChartAreaAxesProps) => {
  const displayData = data.length > 0 ? data : chartData;
  const isRealData = data.length > 0;
  
  const xAxisKey = isRealData ? "date" : "month";
  const dataKey = isRealData ? "sales" : "desktop";

  const dateFormatter = (value: string) => {
    if (!isRealData) return value.slice(0, 3);
    try {
      const d = new Date(value);
      return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    } catch (e) {
      return value;
    }
  };

  const chartContent = (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={displayData}
        margin={{
          left: 12,
          right: 12,
        }}
      >

        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis
          axisLine={false}
          dataKey={xAxisKey}
          tickFormatter={dateFormatter}
          tickLine={false}
          tickMargin={8}
          className="text-xs font-bold text-slate-400"
        />
        <YAxis axisLine={false} tickCount={3} tickLine={false} tickMargin={8} className="text-xs font-bold text-slate-400" />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        {isRealData ? (
          <Area
            dataKey={dataKey}
            fill="#508CBB"
            fillOpacity={0.4}
            stackId="a"
            stroke="#508CBB"
            type="natural"
          />

        ) : (
          <>
            <Area
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stackId="a"
              stroke="var(--color-mobile)"
              type="natural"
            />
            <Area
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stackId="a"
              stroke="var(--color-desktop)"
              type="natural"
            />
          </>
        )}
      </AreaChart>
    </ChartContainer>
  );

  if (noWrapper) {
    return <div className={`w-full ${className}`}>{chartContent}</div>;
  }

  return (
    <div className={`w-full max-w-xl rounded-md border bg-background p-4 ${className}`}>
      {chartContent}
    </div>
  );
};

export default ChartAreaAxes;
