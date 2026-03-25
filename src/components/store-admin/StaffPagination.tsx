import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StaffPaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function StaffPagination({
    currentPage,
    totalPages,
    totalCount,
    itemsPerPage,
    onPageChange,
}: StaffPaginationProps) {
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, totalCount);

    if (totalCount === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in px-4 py-6 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Showing{' '}
                <span className="text-[#2563EB] px-2 bg-[#2563EB]/5 rounded-lg border border-[#2563EB]/10 mx-1">
                    {startIdx}–{endIdx}
                </span>{' '}
                of{' '}
                <span className="text-slate-900 border-b-2 border-slate-200 mx-1">{totalCount}</span>{' '}
                active members
            </p>

            {totalPages > 1 && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-[#2563EB] hover:bg-white hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                    </button>

                    <span className="min-w-[40px] h-10 flex items-center justify-center bg-[#1E1B4B] text-white text-[10px] font-black rounded-2xl shadow-md shadow-[#1E1B4B]/20 border border-[#1E1B4B]/20 px-3">
                        {currentPage}
                    </span>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-[#2563EB] hover:bg-white hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>
            )}
        </div>
    );
}
