import React from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell,
    Legend
} from 'recharts';

const dailyData = [
    { name: 'Mon', revenue: 15400 },
    { name: 'Tue', revenue: 18200 },
    { name: 'Wed', revenue: 12100 },
    { name: 'Thu', revenue: 22400 },
    { name: 'Fri', revenue: 28600 },
    { name: 'Sat', revenue: 32100 },
    { name: 'Sun', revenue: 26400 },
];

const paymentData = [
    { name: 'Credit Card', value: 58000, color: '#3B82F6' },
    { name: 'Digital Wallet', value: 32000, color: '#8B5CF6' },
    { name: 'Cash', value: 24000, color: '#10B981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                <p className="text-sm font-black text-slate-900 tabular-nums">
                    ₹ {payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const ReportsCharts: React.FC = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Daily Revenue Trend */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-[480px] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Daily Revenue Trend</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Past 7 Days performance</p>
                    </div>
                </div>
                
                <div className="flex-1 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity={1}/>
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0.6}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                tickFormatter={(value) => `₹${value/1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC', opacity: 0.8 }} />
                            <Bar 
                                dataKey="revenue" 
                                fill="url(#barGradient)" 
                                radius={[10, 10, 0, 0]} 
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-[480px] hover:shadow-lg transition-all duration-300">
                <div className="mb-8">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Payment Breakdown</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Method distribution Share</p>
                </div>

                <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={paymentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {paymentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                                verticalAlign="bottom" 
                                align="center"
                                iconType="circle"
                                formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center Info */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-[-20px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Total Share</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">100%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsCharts;
