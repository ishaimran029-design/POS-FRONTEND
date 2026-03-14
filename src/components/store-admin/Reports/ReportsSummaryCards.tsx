import React from 'react';
import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Percent, Receipt, CreditCard } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    trend: number;
    icon: React.ElementType;
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon: Icon, color }) => {
    const isPositive = trend >= 0;
    
    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all duration-700 group-hover:scale-150`}></div>
            
            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center text-${color}-600 border border-${color}-100/50 shadow-sm`}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    {trend !== 0 && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${
                            isPositive 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                            {isPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                        {value}
                    </h2>
                </div>
            </div>
        </div>
    );
};

const ReportsSummaryCards: React.FC = () => {
    // Mock data for initial UI implementation
    const metrics = [
        { title: 'Total Revenue', value: '₹ 1,28,450', trend: 12.5, icon: DollarSign, color: 'blue' },
        { title: 'Transactions', value: '1,420', trend: 8.2, icon: ShoppingBag, color: 'purple' },
        { title: 'Avg. Order Value', value: '₹ 904.58', trend: -2.4, icon: CreditCard, color: 'amber' },
        { title: 'Total Tax', value: '₹ 15,414', trend: 11.8, icon: Receipt, color: 'emerald' },
        { title: 'Discounts', value: '₹ 4,285', trend: 5.1, icon: Percent, color: 'rose' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-in">
            {metrics.map((metric, idx) => (
                <MetricCard key={idx} {...metric} />
            ))}
        </div>
    );
};

export default ReportsSummaryCards;
