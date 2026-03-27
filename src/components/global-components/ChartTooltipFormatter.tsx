"use client";

import { Bar, BarChart, XAxis, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DataPoint {
  date: string;
  revenue: number;
}

interface ChartTooltipFormatterProps {
  data: DataPoint[];
  config?: ChartConfig;
  height?: string;
}

const defaultChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ChartTooltipFormatter = ({ 
  data, 
  config = defaultChartConfig,
  height = "h-[300px]" 
}: ChartTooltipFormatterProps) => {
  return (
    <div className={`w-full ${height} rounded-md`}>
      <ChartContainer config={config}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", { weekday: "short" })
            }
            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
          />
          <Bar 
            dataKey="revenue" 
            fill="var(--color-revenue)" 
            radius={[4, 4, 0, 0]} 
          />
          <ChartTooltip
            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value: any, name: string) => (
                  <div className="flex min-w-[130px] items-center text-xs text-slate-500 font-bold">
                    {config[name as keyof typeof config]?.label || name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-black text-slate-900 tabular-nums">
                      ₹{Number(value).toLocaleString()}
                    </div>
                  </div>
                )}
              />
            }
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartTooltipFormatter;
