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

    if (totalPages <= 1 && totalCount > 0) return (
        <div className="flex items-center justify-between text-slate-400 font-medium text-sm px-2">
            <p>Showing {startIdx}–{endIdx} of {totalCount} members</p>
        </div>
    );

    if (totalCount === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in px-2">
            <p className="text-slate-400 font-medium text-sm">
                Showing <span className="text-slate-900 font-black">{startIdx}–{endIdx}</span> of <span className="text-slate-900 font-black">{totalCount}</span> members
            </p>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-all active:scale-90"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-11 h-11 rounded-2xl text-xs font-black transition-all active:scale-90 ${currentPage === page
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "bg-white border border-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-all active:scale-90"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
