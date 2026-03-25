import type { Category } from "@/types/category"

interface Props {
  category: Category
}

import { Settings2 } from "lucide-react"

const CategoryRow = ({ category }: Props) => {
  return (
    <tr className="group hover:bg-[#2563EB]/5 transition-all duration-300 ease-out cursor-pointer">
      <td className="px-6 py-4">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 font-black text-sm group-hover:bg-white group-hover:border-[#2563EB]/20 group-hover:text-[#2563EB] transition-all">
           {category.name.charAt(0).toUpperCase()}
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors tracking-tight">{category.name}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">UID: {category.id.slice(0, 8)}</p>
      </td>
      <td className="px-6 py-4">
        <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest">
           {category._count?.products ?? 0} Products
        </span>
      </td>
      <td className="px-6 py-4 text-right pr-8">
        <button className="p-2.5 text-slate-300 hover:text-[#2563EB] hover:bg-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-[#2563EB]/10">
          <Settings2 size={18} />
        </button>
      </td>
    </tr>
  )
}

export default CategoryRow
