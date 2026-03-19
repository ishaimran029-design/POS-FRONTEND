export default function ProductStockBadge({ stock, reorderLevel = 10 }: { stock: number, reorderLevel?: number }) {

    if (stock === 0)
        return (
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-black text-slate-900 tabular-nums">{stock}</span>
                <span className="bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    Out of Stock
                </span>
            </div>
        )

    if (stock <= reorderLevel)
        return (
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-black text-slate-900 tabular-nums">{stock}</span>
                <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    Low Stock
                </span>
            </div>
        )

    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-black text-slate-900 tabular-nums">{stock}</span>
            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                Available
            </span>
        </div>
    )
}
