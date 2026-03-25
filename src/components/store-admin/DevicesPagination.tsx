import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DevicesPaginationProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
}

export default function DevicesPagination({ page, setPage, total }: DevicesPaginationProps) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage);
    const startIdx = total > 0 ? (page - 1) * itemsPerPage + 1 : 0;
    const endIdx = Math.min(page * itemsPerPage, total);

    if (total === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-100 rounded-[32px] px-8 py-6 shadow-sm hover:shadow-md transition-all duration-300 gap-6 animate-fade-in">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Monitoring{' '}
                <span className="text-[#2563EB] px-2 bg-[#2563EB]/5 rounded-lg border border-[#2563EB]/10 mx-1">
                    {startIdx} - {endIdx}
                </span>{' '}
                of{' '}
                <span className="text-slate-900 border-b-2 border-slate-200 mx-1">{total}</span>{' '}
                hardware units
            </span>

            {totalPages > 1 && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
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
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
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
