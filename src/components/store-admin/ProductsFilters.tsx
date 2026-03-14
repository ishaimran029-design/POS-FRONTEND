import { Search, Filter, ChevronDown } from "lucide-react"

export default function ProductsFilters() {

    return (

        <div className="bg-white rounded-[24px] border border-slate-100 p-2 flex gap-3 flex-wrap items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex-1 min-w-[300px] relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2563EB] transition-colors" />
                <input
                    placeholder="Search by name, SKU, barcode..."
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-medium text-slate-700 placeholder:text-slate-300"
                />
            </div>

            <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden md:block"></div>

            <div className="relative group">
                <select className="appearance-none bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-extrabold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]">
                    <option>Category: All</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] pointer-events-none transition-colors" />
            </div>

            <div className="relative group">
                <select className="appearance-none bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-extrabold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]">
                    <option>Status: All</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] pointer-events-none transition-colors" />
            </div>

            <button className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-[#2563EB] rounded-2xl transition-all active:scale-95 border border-slate-100 hover:border-[#2563EB]/20">
                <Filter size={20} />
            </button>
        </div>

    )

}
