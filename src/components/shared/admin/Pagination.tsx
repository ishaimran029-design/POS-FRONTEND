import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-end gap-6 py-5 px-8 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest text-slate-400">
                <span>Page</span>
                <span className="text-[#262255] px-2 py-0.5 bg-slate-100 rounded-lg shadow-inner min-w-[24px] text-center">{currentPage}</span>
                <span>of</span>
                <span className="text-slate-900 border-b-2 border-slate-100 px-1">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm hover:shadow-md"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm hover:shadow-md"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
