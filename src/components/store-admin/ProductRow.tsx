import ProductStockBadge from "./ProductStockBadge"
import { Trash, Plus } from "lucide-react"
import { formatCurrency } from "@/utils/format"

export default function ProductRow({ product, index }: any) {

    return (

        <tr className="hover:bg-[#2563EB]/5 border-b border-slate-50 last:border-0 transition-all duration-300 group cursor-pointer">
            <td className="px-6 py-4 text-slate-400 font-mono text-[10px]">{index}</td>

            <td className="px-6 py-4">
                <p className="text-sm font-extrabold text-slate-900 group-hover:text-[#1E1B4B] transition-colors">
                    {product.name}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 group-hover:text-[#2563EB]/60 transition-colors">ID: {product.id.slice(0, 8)}</p>
            </td>

            <td className="px-6 py-4 text-slate-500 text-xs font-bold">
                {product.sku || 'N/A'}
            </td>

            <td className="px-6 py-4 text-slate-500 text-xs font-mono">
                {product.barcode || '---'}
            </td>

            <td className="px-6 py-4">
                <span className="bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:bg-white group-hover:border-[#2563EB]/20 group-hover:text-[#2563EB] transition-all">
                    {product.category?.name || 'General'}
                </span>
            </td>

            <td className="px-6 py-4 text-slate-500 text-sm font-bold tabular-nums">
                {formatCurrency(Number(product.purchasePrice))}
            </td>

            <td className="px-6 py-4 font-black text-[#2563EB] text-sm tabular-nums">
                {formatCurrency(Number(product.sellingPrice))}
            </td>

            <td className="px-6 py-4 text-center">
                <ProductStockBadge stock={product.stock ?? 0} reorderLevel={product.reorderLevel} />
            </td>

            <td className="px-6 py-4">
                <div className="flex gap-2 justify-end">
                    <button 
                        onClick={(e) => { e.stopPropagation(); product.onAddStock?.(product); }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-90 flex items-center gap-1.5"
                        title="Add Stock"
                    >
                        <Plus size={16} />
                        <span className="text-[10px] font-black uppercase">Stock</span>
                    </button>
                    <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90">
                        <Trash size={16} />
                    </button>
                </div>
            </td>
        </tr>

    )

}
