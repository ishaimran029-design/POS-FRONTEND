import ProductStockBadge from "./ProductStockBadge"
import { Pencil, Trash } from "lucide-react"

export default function ProductRow({ product, index }: any) {

    return (

        <tr className="hover:bg-blue-50 border-b border-[#E5E7EB] last:border-0 transition-colors">

            <td className="px-4 py-3 text-gray-400 font-mono text-xs">{index}</td>

            <td className="px-4 py-3 font-medium text-gray-800">
                {product.name}
            </td>

            <td className="px-4 py-3 text-gray-500 text-sm">
                {product.sku}
            </td>

            <td className="px-4 py-3 text-gray-500 text-sm font-mono">
                {product.barcode}
            </td>

            <td className="px-4 py-3">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase tracking-wider font-semibold">
                    {product.category}
                </span>
            </td>

            <td className="px-4 py-3 text-gray-600">
                ${product.purchasePrice.toFixed(2)}
            </td>

            <td className="px-4 py-3 font-black text-slate-900">
                ${product.sellingPrice.toFixed(2)}
            </td>

            <td className="px-4 py-3">
                <ProductStockBadge stock={product.stock} />
            </td>

            <td className="px-4 py-3">
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all active:scale-90">
                        <Pencil size={18} />
                    </button>

                    <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all active:scale-90">
                        <Trash size={18} />
                    </button>
                </div>
            </td>

        </tr>

    )

}
