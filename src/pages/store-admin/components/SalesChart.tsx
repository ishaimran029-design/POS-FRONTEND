import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface SalesChartProps {
    data: { date: string; sales: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Daily Sales Revenue</h3>
                    <p className="text-sm text-slate-500 font-medium">Performance over the last 7 days</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Revenue</span>
                </div>
            </div>

            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
                                <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
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
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                padding: '12px'
                            }}
                            itemStyle={{ fontWeight: 800, color: '#1a192b' }}
                            labelStyle={{ fontWeight: 500, color: '#64748b', marginBottom: '4px' }}
                        />
                        <Bar
                            dataKey="sales"
                            fill="url(#barGradient)"
                            radius={[10, 10, 0, 0]}
                            barSize={45}
                            animationDuration={1500}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} className="hover:opacity-80 transition-opacity cursor-pointer" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
