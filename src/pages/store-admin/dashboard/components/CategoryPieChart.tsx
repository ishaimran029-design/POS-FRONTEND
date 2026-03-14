import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryPieChartProps {
    data: { name: string; value: number; color: string }[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
    const total = data.reduce((a, b) => a + b.value, 0);
    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Category Distribution</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sales by product group</p>
                </div>
            </div>
            <div className="h-[280px] w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={10} dataKey="value" animationBegin={500} animationDuration={1500}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', padding: '16px', background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)' }} 
                            itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#0F172A' }} 
                            labelStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', marginBottom: '8px' }} 
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                {data.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{cat.name}</p>
                            <p className="text-sm font-black text-slate-900 tabular-nums">{total > 0 ? ((cat.value / total) * 100).toFixed(0) : 0}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
