import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

interface RevenueChartProps {
    data: { week: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-full flex flex-col group transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Weekly Revenue Trend</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Channel performance summary</p>
                </div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <span className="text-[10px] font-black uppercase tracking-widest">+12% vs LY</span>
                </div>
            </div>

            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '24px',
                                border: 'none',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                                padding: '16px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(8px)'
                            }}
                            itemStyle={{ fontWeight: 900, color: '#1a192b' }}
                            labelStyle={{ fontWeight: 600, color: '#64748b', marginBottom: '8px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F46E5"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            animationDuration={2000}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F46E5"
                            strokeWidth={4}
                            dot={{ r: 6, fill: '#fff', stroke: '#4F46E5', strokeWidth: 3 }}
                            activeDot={{ r: 8, fill: '#4F46E5', stroke: '#fff', strokeWidth: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
