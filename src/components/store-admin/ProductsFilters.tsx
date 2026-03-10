import { Search, Filter, ChevronDown } from "lucide-react"

export default function ProductsFilters() {

    return (

        <div className="bg-white/70 backdrop-blur-md rounded-[32px] border border-slate-100 p-3 flex gap-3 flex-wrap items-center shadow-sm">

            <div className="flex-1 min-w-[300px] relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                    placeholder="Search by name, SKU, barcode..."
                    className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-3 pl-12 pr-4 outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-600 placeholder:text-slate-300"
                />
            </div>

            <div className="h-10 w-[1px] bg-slate-100 mx-1 hidden md:block"></div>

            <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-50 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-blue-500/30 transition-all font-black uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[140px]">
                    <option>Category: All</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

            <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-50 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-blue-500/30 transition-all font-black uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[140px]">
                    <option>Status: All</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

            <button className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all active:scale-95">
                <Filter size={20} />
            </button>

        </div>

    )

}
