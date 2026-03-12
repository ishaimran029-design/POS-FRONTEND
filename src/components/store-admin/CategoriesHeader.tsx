

interface Props {
  onAddCategory: () => void
}

const CategoriesHeader = ({ onAddCategory }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">
          Product Categories
        </h1>
      </div>
      <button 
        onClick={onAddCategory}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        New Product Category
      </button>
    </div>
  )
}

export default CategoriesHeader
