import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface RevenueChartProps {
    data: { week: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm h-full flex flex-col group transition-all duration-500 hover:shadow-xl dark:hover:shadow-none">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Weekly Revenue Trend</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Channel performance summary</p>
                </div>
                <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shadow-sm shadow-blue-50/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">+12% vs LY</span>
                </div>
            </div>
            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" dark-stroke="#334155" opacity={0.5} />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} tickFormatter={(v) => `₹${v}`} />
                        <Tooltip contentStyle={{ borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', padding: '16px', background: 'var(--tooltip-bg, rgba(255, 255, 255, 0.98))', backdropFilter: 'blur(8px)' }} itemStyle={{ fontWeight: 900, fontSize: '14px', color: 'var(--tooltip-item-color, #0F172A)' }} labelStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', marginBottom: '8px' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={2000} />
                        <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={4} dot={{ r: 6, fill: '#fff', stroke: '#1E1B4B', strokeWidth: 3 }} activeDot={{ r: 8, fill: '#2563EB', stroke: '#fff', strokeWidth: 4 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
