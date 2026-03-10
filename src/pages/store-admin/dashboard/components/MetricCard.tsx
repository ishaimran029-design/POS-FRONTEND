import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    change: string | number;
    isPositive: boolean;
    icon: LucideIcon;
    color?: string;
}

export default function MetricCard({ title, value, change, isPositive, icon: Icon, color = 'indigo' }: MetricCardProps) {
    const colorClasses: Record<string, string> = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        rose: 'bg-rose-50 text-rose-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <div className={`p-3 rounded-2xl ${colorClasses[color] || colorClasses.indigo}`}>
                    <Icon size={24} />
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
