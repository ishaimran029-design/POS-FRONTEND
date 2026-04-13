import ProductStockBadge from "./ProductStockBadge"
import { Trash, Plus, Box } from "lucide-react"
import { formatCurrency } from "@/utils/format"

export default function ProductRow({ product, index }: any) {

    return (
        <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-all duration-300 group cursor-pointer">
            <td className="px-6 py-6 text-slate-400 font-num font-bold text-[10px]">{index.toString().padStart(2, '0')}</td>

            <td className="px-6 py-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-indigo-600/20 transition-all shrink-0">
                    {(product.imageUrl || product.image) ? (
                        <img 
                            src={product.imageUrl || (product.image?.startsWith('http') ? product.image : `http://localhost:3005${product.image}`)} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                            <Box size={20} strokeWidth={1.5} />
                        </div>
                    )}
                </div>
            </td>

            <td className="px-6 py-6">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight truncate">
                            {product.name}
                        </p>
                        <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider border ${
                            product.isActive 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1 truncate leading-none font-num">ID: {product.id.slice(0, 8)}</p>
                </div>
            </td>

            <td className="px-6 py-6 text-slate-600 text-[11px] font-bold uppercase tracking-widest font-num">
                {product.sku || 'N/A'}
            </td>

            <td className="px-6 py-6 text-slate-500 font-num text-[11px] font-medium">
                {product.barcode || '---'}
            </td>

            <td className="px-6 py-6">
                <span className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-bold uppercase tracking-[0.15em]">
                    {product.category?.name || 'General'}
                </span>
            </td>

            <td className="px-6 py-6 text-slate-900 text-[12px] font-bold tracking-tight font-num">
                {formatCurrency(Number(product.purchasePrice))}
            </td>

            <td className="px-6 py-6 text-indigo-600 text-[12px] font-extrabold tracking-tight font-num">
                {formatCurrency(Number(product.sellingPrice))}
            </td>

            <td className="px-6 py-6 text-center">
                <ProductStockBadge stock={product.stock ?? 0} reorderLevel={product.reorderLevel} />
            </td>

            <td className="px-6 py-6">
                <div className="flex gap-2 justify-end">
                    <button 
                        onClick={(e) => { e.stopPropagation(); product.onAddStock?.(product); }}
                        className="p-2.5 text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl transition-all active:scale-95 flex items-center gap-2 hover:bg-indigo-600 hover:text-white group/btn shadow-sm"
                        title="Add Stock"
                    >
                        <Plus size={16} />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">Stock</span>
                    </button>
                    <button className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95">
                        <Trash size={16} />
                    </button>
                </div>
            </td>
        </tr>
    )
}
