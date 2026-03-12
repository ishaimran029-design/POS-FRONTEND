import CategoryRow from "./CategoryRow"
import type { Category } from "@/types/category"

interface Props {
  categories: Category[]
  loading: boolean
}

const CategoriesTable = ({ categories, loading }: Props) => {
  if (loading) {
    return (
      <div className="bg-white p-12 text-center rounded shadow">
        Loading categories...
      </div>
    )
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-4 text-left font-medium text-gray-600">Image</th>
            <th className="p-4 text-left font-medium text-gray-600">Product Category</th>
            <th className="p-4 text-left font-medium text-gray-600">No. Products</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <CategoryRow
                key={cat.id}
                category={cat}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesTable
