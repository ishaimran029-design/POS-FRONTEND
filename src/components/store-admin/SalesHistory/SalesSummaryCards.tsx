import { TrendingUp, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface SalesSummaryCardsProps {
    data: {
        totalAmount: number;
        completedCount: number;
        failedCount: number;
    };
    loading: boolean;
}

const SalesSummaryCards: React.FC<SalesSummaryCardsProps> = ({ data, loading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {/* Period Total Sales */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <TrendingUp size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">Revenue</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Period Total Sales</p>
                        {loading ? (
                            <div className="h-10 w-32 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
                        ) : (
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                {formatCurrency(data.totalAmount)}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Completed Transactions */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Success</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed Transactions</p>
                        {loading ? (
                            <div className="h-10 w-24 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
                        ) : (
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                {data.completedCount}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Failed / Cancelled */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-all duration-700"></div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                            <XCircle size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest border border-rose-100">Alerts</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Failed / Cancelled</p>
                        {loading ? (
                            <div className="h-10 w-20 bg-slate-50 animate-pulse rounded-lg mt-1 font-bold"></div>
                        ) : (
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">
                                {data.failedCount}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesSummaryCards;
