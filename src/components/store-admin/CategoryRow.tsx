import type { Category } from "@/types/category"
import { getSubcategories } from "@/api/category.api"

interface Props {
  category: Category
  index: number
}

// import { Settings2 } from "lucide-react"

const CategoryRow = ({ category, index }: Props) => {
  const subcategories = getSubcategories(category.id);
  
  return (
    <tr className="group hover:bg-[#2563EB]/5 transition-all duration-300 ease-out cursor-pointer">
      <td className="px-6 py-4">
        <span className="text-[10px] font-mono text-[#2563EB] font-bold bg-[#2563EB]/5 px-2 py-1 rounded-md border border-[#2563EB]/10">
            {index.toString().padStart(2, '0')}
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors tracking-tight">{category.name}</p>
      </td>
      <td className="px-6 py-4">
        {subcategories.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {subcategories.slice(0, 3).map((sub, i) => (
              <span key={i} className="text-[10px] font-bold text-[#2563EB]/60 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                {sub}
              </span>
            ))}
            {subcategories.length > 3 && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+{subcategories.length - 3}</span>
            )}
          </div>
        ) : (
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Sub Categories</span>
        )}
      </td>
      <td className="px-6 py-4">
        <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest">
           {category._count?.products ?? 0} Products
        </span>
      </td>
    </tr>
  )
}

export default CategoryRow
