import React from 'react';
import { Search, Calendar, Filter, CreditCard } from 'lucide-react';

interface SalesFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    paymentMethod: string;
    onPaymentMethodChange: (value: string) => void;
    dateRange: { start: string; end: string };
    onDateRangeChange: (start: string, end: string) => void;
}

const SalesFilters: React.FC<SalesFiltersProps> = ({
    search,
    onSearchChange,
    status,
    onStatusChange,
    paymentMethod,
    onPaymentMethodChange,
    dateRange,
    onDateRangeChange
}) => {
    return (
        <div className="bg-white p-2 rounded-[32px] shadow-sm border border-slate-100 flex flex-wrap items-center gap-4 animate-fade-in hover:shadow-md transition-all duration-300">
            {/* Date Range */}
            <div className="flex-1 min-w-[280px] p-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3 mb-2 block">Transaction Period</label>
                <div className="relative group flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 focus-within:bg-white focus-within:border-[#1E1B4B]/30 focus-within:ring-4 focus-within:ring-[#1E1B4B]/5 transition-all">
                    <Calendar className="text-slate-400 group-focus-within:text-blue-600 transition-colors mr-3" size={16} />
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <input 
                            type="date" 
                            className="bg-transparent border-none focus:ring-0 p-0 cursor-pointer outline-none"
                            value={dateRange.start}
                            onChange={(e) => onDateRangeChange(e.target.value, dateRange.end)}
                        />
                        <span className="text-slate-200">—</span>
                        <input 
                            type="date" 
                            className="bg-transparent border-none focus:ring-0 p-0 cursor-pointer outline-none"
                            value={dateRange.end}
                            onChange={(e) => onDateRangeChange(dateRange.start, e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-auto min-w-[180px] p-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3 mb-2 block">Payment Status</label>
                <div className="relative group overflow-hidden">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" size={16} />
                    <select 
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 appearance-none outline-none focus:bg-white focus:border-[#1E1B4B]/30 focus:ring-4 focus:ring-[#1E1B4B]/5 transition-all cursor-pointer"
                    >
                        <option value="All Status">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                        <option value="REFUNDED">Refunded</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="w-full md:w-auto min-w-[180px] p-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3 mb-2 block">Method</label>
                <div className="relative group overflow-hidden">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" size={16} />
                    <select 
                        value={paymentMethod}
                        onChange={(e) => onPaymentMethodChange(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 appearance-none outline-none focus:bg-white focus:border-blue-100 transition-all cursor-pointer"
                    >
                        <option value="All Methods">All Methods</option>
                        <option value="CASH">Cash</option>
                        <option value="CARD">Card</option>
                        <option value="DIGITAL_WALLET">Wallet / UPI</option>
                        <option value="CHEQUE">Cheque</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Invoice Search */}
            <div className="flex-1 min-w-[240px] p-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3 mb-2 block">Search Ledger</label>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input 
                        type="text"
                        placeholder="Search invoice number..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 focus:bg-white focus:border-[#1E1B4B]/30 focus:ring-4 focus:ring-[#1E1B4B]/5 outline-none transition-all placeholder:text-slate-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesFilters;
