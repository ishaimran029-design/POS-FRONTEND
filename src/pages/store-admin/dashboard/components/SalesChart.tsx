import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SalesChartProps {
    data: { date: string; sales: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Daily Sales Revenue</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium font-bold uppercase tracking-widest mt-1">Performance over the last 7 days</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-100"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Revenue</span>
                </div>
            </div>
            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1E1B4B" stopOpacity={1} />
                                <stop offset="100%" stopColor="#312E81" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} tickFormatter={(v) => `Rs.${v}`} />
                        <Tooltip 
                            cursor={{ fill: '#F8FAFC' }} 
                            contentStyle={{ borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', padding: '16px' }} 
                            itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#0F172A' }} 
                            labelStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', marginBottom: '8px' }} 
                        />
                        <Bar dataKey="sales" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={40} animationDuration={1500}>
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
