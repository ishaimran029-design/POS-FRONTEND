import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
}

export default function ProductPagination({ page, setPage, total }: ProductPaginationProps) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage + 1;
    const endIdx = Math.min(page * itemsPerPage, total);

    if (total === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Showing{' '}
                <span className="text-slate-900 font-extrabold">{startIdx}–{endIdx}</span>{' '}
                of{' '}
                <span className="text-slate-900 font-extrabold">{total}</span>{' '}
                assets
            </p>

            {totalPages > 1 && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="p-2.5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>

                    <span className="min-w-[40px] h-10 flex items-center justify-center bg-[#1E1B4B] text-white text-[10px] font-black rounded-2xl shadow-md shadow-[#1E1B4B]/20 border border-[#1E1B4B]/20 px-3">
                        {page}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages || totalPages === 0}
                        className="p-2.5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                        aria-label="Next page"
                    >
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
            )}
        </div>
    );
}
