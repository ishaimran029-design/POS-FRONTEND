import React, { useState } from "react"
import { createCategory } from "@/api/category.api"

interface Props {
  open: boolean
  onClose: () => void
  onCategoryAdded: () => void
}

const AddCategoryModal = ({ open, onClose, onCategoryAdded }: Props) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Category name is required")
      return
    }

    try {
      setLoading(true)
      setError("")
      await createCategory({ name })
      onCategoryAdded()
      setName("")
      onClose()
    } catch (err: any) {
      console.error("Failed to add category", err)
      setError(err.response?.data?.message || "Failed to add category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Add New Category</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="e.g. Electronics, Clothing..."
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Add Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryModal
