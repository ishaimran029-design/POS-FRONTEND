
import { Download, Printer } from "lucide-react"

const InventoryFilters = () => {
    return (
        <div className="bg-white rounded-[24px] border border-slate-100 p-2 flex gap-3 flex-wrap items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex gap-3 flex-wrap">
                <div className="relative group">
                    <select className="appearance-none bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-4 pr-10 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-extrabold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Month</option>
                        <option>All Time</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                <div className="relative group">
                    <select className="appearance-none bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-4 pr-10 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-extrabold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]">
                        <option>All Movements</option>
                        <option>Sale</option>
                        <option>Restock</option>
                        <option>Adjustment</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
                <button className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-[#2563EB]/30 hover:text-[#2563EB] text-slate-400 transition-all active:scale-95 shadow-sm group">
                    <Download className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB]" /> Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-[#2563EB]/30 hover:text-[#2563EB] text-slate-400 transition-all active:scale-95 shadow-sm group">
                    <Printer className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB]" /> Print
                </button>
            </div>
        </div>
    )
}

export default InventoryFilters
