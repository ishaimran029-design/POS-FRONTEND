import { Search } from "lucide-react"

export default function DevicesFilters() {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto">
                <button className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                    All
                </button>
                <button className="flex-1 px-6 py-2 text-gray-500 hover:text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest transition-colors">
                    Online
                </button>
                <button className="flex-1 px-6 py-2 text-gray-500 hover:text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest transition-colors">
                    Offline
                </button>
            </div>

            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search devices by name or SN..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium shadow-sm"
                />
            </div>
        </div>
    )
}
