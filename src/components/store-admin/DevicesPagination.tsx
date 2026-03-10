import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DevicesPaginationProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
}

export default function DevicesPagination({
    page,
    setPage,
    total
}: DevicesPaginationProps) {
    const totalPages = Math.ceil(total / 10);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                Showing {total > 0 ? (page - 1) * 10 + 1 : 0} - {Math.min(page * 10, total)} of {total} devices
            </span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 border border-gray-100 rounded-xl disabled:text-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${page === i + 1
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 border border-gray-100 rounded-xl disabled:text-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
