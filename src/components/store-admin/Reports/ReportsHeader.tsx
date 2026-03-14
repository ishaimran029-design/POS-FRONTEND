import React from 'react';
import { FileText, Download, Calendar, ChevronDown } from 'lucide-react';

interface ReportsHeaderProps {
    activeTab: 'sales' | 'inventory';
    onTabChange: (tab: 'sales' | 'inventory') => void;
    dateRange: string;
    onDateRangeChange: (range: string) => void;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
    activeTab,
    onTabChange,
    dateRange,
    onDateRangeChange
}) => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Title and Top Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reports Center</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mt-1">
                        Real-time performance metrics and inventory insights
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-[#1E1B4B]/20 rounded-2xl text-xs font-black uppercase tracking-widest text-[#1E1B4B] hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                        <FileText size={16} className="text-[#1E1B4B]" />
                        PDF Export
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-[#1E1B4B]/20 rounded-2xl text-xs font-black uppercase tracking-widest text-[#1E1B4B] hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                        <Download size={16} className="text-[#1E1B4B]" />
                        CSV Export
                    </button>
                </div>
            </div>

            {/* Tabs and Date Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-8 border-b border-slate-100 px-2 min-w-[300px]">
                    <button 
                        onClick={() => onTabChange('sales')}
                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${
                            activeTab === 'sales' 
                            ? 'text-[#2563EB]' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Sales Report
                        {activeTab === 'sales' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB] rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.3)] animate-scale-up" />
                        )}
                    </button>
                    <button 
                        onClick={() => onTabChange('inventory')}
                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${
                            activeTab === 'inventory' 
                            ? 'text-[#2563EB]' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Inventory Report
                        {activeTab === 'inventory' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB] rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.3)] animate-scale-up" />
                        )}
                    </button>
                </div>

                {/* Date Controls */}
                <div className="flex flex-wrap items-center gap-2">
                    {['Today', 'This Week', 'Month'].map((range) => (
                        <button
                            key={range}
                            onClick={() => onDateRangeChange(range)}
                            className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                dateRange === range 
                                ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20' 
                                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-[#2563EB] hover:border-[#2563EB]/20'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                    
                    <button className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:border-[#2563EB]/20 hover:text-[#2563EB] transition-all shadow-sm group">
                        <Calendar size={14} className="text-[#2563EB]" />
                        Custom Date Range
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-[#2563EB]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsHeader;
