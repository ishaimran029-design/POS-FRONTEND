import { Search, Filter, ChevronDown } from "lucide-react"

interface ProductsFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    categoryId: string;
    setCategoryId: (value: string) => void;
    isActive: string;
    setIsActive: (value: string) => void;
    categories: any[];
    onFilter: () => void;
}

export default function ProductsFilters({
    search,
    setSearch,
    categoryId,
    setCategoryId,
    isActive,
    setIsActive,
    categories,
    onFilter
}: ProductsFiltersProps) {

    return (
        <div className="bg-white rounded-[24px] border border-slate-100 p-2 flex gap-3 flex-wrap items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex-1 min-w-[300px] relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                    placeholder="Search by name, SKU, barcode..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-medium text-slate-700 placeholder:text-slate-300"
                />
            </div>

            <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden md:block"></div>

            <div className="relative group">
                <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="appearance-none bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]"
                >
                    <option value="all">Category: All</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 pointer-events-none transition-colors" />
            </div>

            <div className="relative group">
                <select 
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                    className="appearance-none bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-5 pr-10 outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold uppercase tracking-widest text-[10px] text-slate-500 cursor-pointer min-w-[150px]"
                >
                    <option value="all">Status: All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 pointer-events-none transition-colors" />
            </div>

            <button 
                onClick={onFilter}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all active:scale-95 border border-slate-100 hover:border-indigo-600/20"
            >
                <Filter size={20} />
            </button>
        </div>
    )
}
