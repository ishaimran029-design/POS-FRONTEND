import { Search, Monitor, LayoutGrid } from "lucide-react"

export type StatusFilter = "all" | "online" | "offline";
export type ViewFilter = "all" | "this_device";

interface DevicesFiltersProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (v: StatusFilter) => void;
  viewFilter: ViewFilter;
  onViewFilterChange: (v: ViewFilter) => void;
  searchQuery: string;
  onSearchQueryChange: (v: string) => void;
}

export default function DevicesFilters({
  statusFilter,
  onStatusFilterChange,
  viewFilter,
  onViewFilterChange,
  searchQuery,
  onSearchQueryChange,
}: DevicesFiltersProps) {
    return (
        <div className="flex flex-col gap-8 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Terminal View:</span>
                    <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
                        <button
                            onClick={() => onViewFilterChange("all")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                viewFilter === "all"
                                    ? "bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20"
                                    : "text-slate-400 hover:text-[#2563EB] hover:bg-white"
                            }`}
                        >
                            <LayoutGrid size={13} strokeWidth={3} />
                            All Terminals
                        </button>
                        <button
                            onClick={() => onViewFilterChange("this_device")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                viewFilter === "this_device"
                                    ? "bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20"
                                    : "text-slate-400 hover:text-[#2563EB] hover:bg-white"
                            }`}
                        >
                            <Monitor size={13} strokeWidth={3} />
                            This Hub
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Connectivity:</span>
                    <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
                        <button
                            onClick={() => onStatusFilterChange("all")}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                statusFilter === "all"
                                    ? "bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20"
                                    : "text-slate-400 hover:text-[#2563EB] hover:bg-white"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => onStatusFilterChange("online")}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                statusFilter === "online"
                                    ? "bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20"
                                    : "text-slate-400 hover:text-[#2563EB] hover:bg-white"
                            }`}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => onStatusFilterChange("offline")}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                statusFilter === "offline"
                                    ? "bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20"
                                    : "text-slate-400 hover:text-[#2563EB] hover:bg-white"
                            }`}
                        >
                            Offline
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" size={16} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    placeholder="Search terminals by hardware ID or nickname..."
                    className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 outline-none transition-all placeholder:text-slate-300 font-black text-[10px] uppercase tracking-widest text-slate-600 shadow-sm"
                />
            </div>
        </div>
    )
}
