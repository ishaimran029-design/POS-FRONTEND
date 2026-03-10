import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
}

export default function ProductPagination({
    page,
    setPage,
    total
}: ProductPaginationProps) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage + 1;
    const endIdx = Math.min(page * itemsPerPage, total);

    if (total === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <p className="text-slate-400 font-medium text-sm">
                Showing <span className="text-slate-900 font-black">{startIdx}–{endIdx}</span> of <span className="text-slate-900 font-black">{total}</span> products
            </p>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-all active:scale-90"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-11 h-11 rounded-2xl text-xs font-black transition-all active:scale-90 ${page === p
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                : "bg-white border border-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages || totalPages === 0}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-all active:scale-90"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
