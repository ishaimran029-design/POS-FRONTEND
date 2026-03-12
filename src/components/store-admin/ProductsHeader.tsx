import { Plus, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ProductsHeaderProps {
  openModal?: () => void;
}
export default function ProductsHeader({ openModal }: ProductsHeaderProps) {
    const navigate = useNavigate();

    return (

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

            <div>

                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Products
                </h1>

                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">
                    Manage your store inventory and pricing.
                </p>

            </div>

            <div className="flex gap-3 w-full sm:w-auto">

                <button className="flex-1 sm:flex-none border border-slate-200 bg-white px-5 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm">
                    <Download size={14} className="text-blue-600" />
                    Export CSV
                </button>

                <button
                    onClick={() => openModal ? openModal() : navigate('/store-admin/inventory/products/add')}
                    className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-4 rounded-2xl hover:bg-blue-700 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                >
                    <Plus size={16} />
                    Add New Product
                </button>

            </div>

        </div>

    )

}
