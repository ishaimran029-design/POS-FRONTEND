"use client";

import React from 'react';
import { Bar, BarChart, XAxis, ResponsiveContainer } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Jan', activity: 400 },
  { month: 'Feb', activity: 300 },
  { month: 'Mar', activity: 500 },
  { month: 'Apr', activity: 200 },
  { month: 'May', activity: 600 },
  { month: 'Jun', activity: 450 },
  { month: 'Jul', activity: 380 },
  { month: 'Aug', activity: 520 },
  { month: 'Sep', activity: 410 },
  { month: 'Oct', activity: 470 },
  { month: 'Nov', activity: 530 },
  { month: 'Dec', activity: 610 },
];

const chartConfig = {
  activity: {
    label: 'Activity',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const MonthlyActivityChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm dark:bg-slate-950 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Monthly Activity</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last 12 months</p>
        </div>
      </div>

      <div className="h-44">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
              <Bar dataKey="activity" fill="var(--chart-1)" radius={4} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                          {value}
                          <span className="font-normal text-muted-foreground ml-1">activity</span>
                        </div>
                      </div>
                    )}
                    hideLabel
                  />
                }
                cursor={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MonthlyActivityChart;