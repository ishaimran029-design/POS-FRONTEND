import { useState, useEffect } from 'react';
import {
    CalendarDays,
    Download,
    Store,
    CreditCard,
    Monitor,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Search,
    Filter
} from "lucide-react";
import { reportsApi } from '../api/api';
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
    Cell
} from 'recharts';

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await reportsApi.getSuperAdminOverview();
                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching stats', err);
            } finally {
                // Done
            }
        };
        fetchStats();
    }, []);

    const metricCards = [
        {
            title: "Total Stores",
            value: stats?.totalStores?.toLocaleString() || "0",
            growth: "+12.5%",
            isPositive: true,
            icon: Store,
            color: "bg-indigo-50 text-indigo-600"
        },
        {
            title: "Total Revenue",
            value: `Rs ${stats?.totalRevenue?.toLocaleString() || "0"}`,
            growth: "+8.2%",
            isPositive: true,
            icon: CreditCard,
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            title: "Active Devices",
            value: stats?.activeDevices?.toLocaleString() || "0",
            growth: "+4.1%",
            isPositive: true,
            icon: Monitor,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Active Trials",
            value: stats?.activeTrials?.toLocaleString() || "0",
            growth: "-2.4%",
            isPositive: false,
            icon: Activity,
            color: "bg-rose-50 text-rose-600"
        }
    ];

    // Map existing revenue data to recharts format
    const revenueData = stats?.revenueByStore?.map((s: any) => ({
        name: s.city || s.storeName,
        revenue: s.revenue
    })) || [];

    const densityData = [
        { name: 'North America', value: 42, color: '#4f46e5' },
        { name: 'Europe', value: 28, color: '#818cf8' },
        { name: 'Asia Pacific', value: 30, color: '#c7d2fe' },
    ];

    return (
        <div className="p-8 space-y-8 min-h-screen bg-slate-50/50">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Super Admin Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time performance metrics across 12 countries</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <CalendarDays size={18} className="text-slate-400" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a192b] text-white rounded-xl text-sm font-bold hover:bg-[#2a2940] transition-all shadow-lg">
                        <Download size={18} className="text-indigo-300" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                            <div className="flex items-start justify-between relative z-10">
                                <div className={`p-3 rounded-2xl ${card.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className={`text-xs font-black ${card.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {card.growth}
                                    </span>
                                    {card.isPositive ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
                                </div>
                            </div>
                            <div className="mt-6 relative z-10">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{card.title}</p>
                                <h3 className="text-3xl font-black text-slate-900 mt-1">{card.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Second Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900">Revenue by Top Stores</h3>
                            <p className="text-sm text-slate-500 font-medium">Top performing branches globally</p>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontWeight: 800, color: '#1a192b' }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#4f46e5"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Store Density */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900">Store Density</h3>
                            <p className="text-sm text-slate-500 font-medium">Geographical distribution</p>
                        </div>
                    </div>
                    <div className="h-[240px] w-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={densityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {densityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 mt-8">
                        {densityData.map((region, idx) => (
                            <div key={idx} className="space-y-1.5 text-sm">
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-600 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }}></span>
                                        {region.name}
                                    </span>
                                    <span className="text-slate-900">{region.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${region.value}%`, backgroundColor: region.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Third Row: Recent Device Provisioning table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
                <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-900">Recent Device Provisioning</h3>
                        <p className="text-sm text-slate-500 font-medium">Hardware rollouts in progress</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search stores..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 w-full sm:w-64"
                            />
                        </div>
                        <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Store ID</th>
                                <th className="px-8 py-4">Device Type</th>
                                <th className="px-8 py-4">Region</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats?.recentDevices?.map((device: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <span className="font-mono font-bold text-slate-900 text-sm">STR-{device.storeId?.substring(device.storeId.length - 4).toUpperCase()}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <Monitor size={16} className="text-slate-400" />
                                            <span className="font-bold text-slate-700 text-sm">{device.deviceName || device.deviceType || 'Terminal v4'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 font-medium text-slate-500 text-sm">
                                        {device.store?.city || 'Unknown'}, {device.store?.state || 'Global'}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${device.isActive
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                                            }`}>
                                            {device.isActive ? 'Active' : 'Offline'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-slate-400 text-sm italic">
                                        {new Date(device.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {!stats?.recentDevices?.length && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic font-medium">
                                        No recent device updates found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
