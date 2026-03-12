import type { Category } from "@/types/category"

interface Props {
  category: Category
}

const CategoryRow = ({ category }: Props) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
      </td>
      <td className="p-4">
        {category.name}
      </td>
      <td className="p-4">
        {category._count?.products ?? 0}
      </td>
      <td className="p-4 text-right">
        <button className="text-gray-500 hover:text-gray-700">
          ⚙
        </button>
      </td>
    </tr>
  )
}

export default CategoryRow
