import React from 'react';
import { Box, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

interface StockStats {
    totalItems: number;
    lowStockItems: number;
    outOfStockItems: number;
}

interface Props {
    stats: StockStats;
    loading: boolean;
}

const StockOverviewCards: React.FC<Props> = ({ stats, loading }) => {
    const cards = [
        {
            label: 'In Stock',
            value: stats.totalItems,
            icon: Box,
            color: 'text-[#2563EB]',
            bg: 'bg-[#2563EB]/5',
            border: 'border-[#2563EB]/10',
            trend: '+12% from last month'
        },
        {
            label: 'Low Stock',
            value: stats.lowStockItems,
            icon: AlertTriangle,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            trend: 'Check reorder levels'
        },
        {
            label: 'Out of Stock',
            value: stats.outOfStockItems,
            icon: XCircle,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            trend: 'Immediate action required'
        }
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-2xl"></div>
                            <div className="w-20 h-4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="w-24 h-8 bg-gray-100 rounded mb-2"></div>
                        <div className="w-32 h-3 bg-gray-100 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-[32px] p-7 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-600/5 transition-all duration-300 group overflow-hidden relative">
                    {/* Decorative accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform border border-transparent group-hover:border-white/20`}>
                                <card.icon size={24} />
                            </div>
                            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                <TrendingUp size={10} />
                                {card.trend}
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h3 className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">{card.label}</h3>
                            <div className="flex items-baseline gap-2 group-hover:translate-x-1 transition-transform">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">{card.value}</span>
                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">units</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StockOverviewCards;
