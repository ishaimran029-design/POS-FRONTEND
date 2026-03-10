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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">View:</span>
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button
                            onClick={() => onViewFilterChange("all")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                                viewFilter === "all"
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-500 hover:text-indigo-600"
                            }`}
                        >
                            <LayoutGrid size={14} />
                            All Terminals
                        </button>
                        <button
                            onClick={() => onViewFilterChange("this_device")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                                viewFilter === "this_device"
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-500 hover:text-indigo-600"
                            }`}
                        >
                            <Monitor size={14} />
                            This Device
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status:</span>
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                    onClick={() => onStatusFilterChange("all")}
                    className={`flex-1 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                        statusFilter === "all"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "text-gray-500 hover:text-indigo-600"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => onStatusFilterChange("online")}
                    className={`flex-1 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                        statusFilter === "online"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "text-gray-500 hover:text-indigo-600"
                    }`}
                >
                    Online
                </button>
                <button
                    onClick={() => onStatusFilterChange("offline")}
                    className={`flex-1 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                        statusFilter === "offline"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "text-gray-500 hover:text-indigo-600"
                    }`}
                >
                    Offline
                </button>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    placeholder="Search terminals by name or serial..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 font-medium shadow-sm"
                />
            </div>
        </div>
    )
}
