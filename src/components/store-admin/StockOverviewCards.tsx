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
                <div key={idx} className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <TrendingUp size={12} />
                            {card.trend}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-sm font-bold tracking-tight mb-1">{card.label}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-900 tabular-nums">{card.value}</span>
                            <span className="text-gray-400 text-xs font-medium">units</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StockOverviewCards;
