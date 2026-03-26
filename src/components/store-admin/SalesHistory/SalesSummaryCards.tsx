import React from 'react';
import { TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

interface SalesSummaryCardsProps {
    data: {
        totalAmount: number;
        completedCount: number;
        failedCount: number;
        refundedCount?: number;
        avgTicket?: number;
    };
    loading: boolean;
}

const SalesSummaryCards: React.FC<SalesSummaryCardsProps> = ({ data, loading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-fade-in">
            {/* Period Total Sales */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <TrendingUp size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest border border-blue-100">Revenue</span>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Gross Sales</p>
                        {loading ? (
                            <div className="h-8 w-24 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
                        ) : (
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                ₹ {data.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Average Ticket */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <TrendingUp size={20} strokeWidth={2.5} className="rotate-45" />
                        </div>
                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-widest border border-indigo-100">Average</span>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Avg Ticket Size</p>
                        {loading ? (
                            <div className="h-8 w-20 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
                        ) : (
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                ₹ {(data.avgTicket || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Completed Transactions */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Success</span>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Transactions</p>
                        {loading ? (
                            <div className="h-8 w-16 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
                        ) : (
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                {data.completedCount}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Refunded / Alert */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-rose-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                            <XCircle size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase tracking-widest border border-rose-100">Refunds</span>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Refunds</p>
                        {loading ? (
                            <div className="h-8 w-16 bg-slate-50 animate-pulse rounded-lg mt-1 font-bold"></div>
                        ) : (
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 tabular-nums text-rose-600">
                                {data.refundedCount || 0}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesSummaryCards;
