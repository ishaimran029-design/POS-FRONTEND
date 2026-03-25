
interface Props {
  value: string
  onChange: (v: string) => void
}

import { Search, X } from 'lucide-react'

const CategoriesSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative group">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2563EB] transition-colors pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search categories by name..."
        className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-10 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-medium text-slate-700 placeholder:text-slate-300 shadow-sm text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#2563EB] transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default CategoriesSearch
