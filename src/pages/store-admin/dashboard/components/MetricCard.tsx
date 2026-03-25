import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    change: string | number;
    isPositive: boolean;
    icon: LucideIcon;
    color?: string;
}

export default function MetricCard({ title, value, change, isPositive, icon: Icon, color = 'blue' }: MetricCardProps) {
    const colorClasses: Record<string, string> = {
        blue: 'bg-indigo-50 text-[#1E1B4B]',
        indigo: 'bg-blue-50 text-blue-700',
        emerald: 'bg-emerald-50 text-emerald-600',
        rose: 'bg-rose-50 text-rose-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/10 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <div className={`p-3.5 rounded-2xl ${colorClasses[color] || colorClasses.blue}`}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1">
                    <span className={`text-xs font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isPositive ? '+' : ''}{change}%
                    </span>
                    {isPositive ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
                </div>
            </div>
            <div className="mt-6 relative z-10">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-2 tracking-tight group-hover:translate-x-1 transition-transform">{value}</h3>
            </div>
        </div>
    );
}
