import { useEffect, useState } from "react"
import Sidebar from "@/components/store-admin/Sidebar"
import TopNavbar from "@/components/store-admin/TopNavbar"

import CategoriesHeader from "@/components/store-admin/CategoriesHeader"
import CategoriesSearch from "@/components/store-admin/CategoriesSearch"
import CategoriesTable from "@/components/store-admin/CategoriesTable"
import AddCategoryModal from "@/components/store-admin/AddCategoryModal"

import { CheckCircle2 } from "lucide-react"

import { useCategories } from "@/hooks/useProducts"

const ProductCategoriesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { data: categoriesRes, isLoading: loading, refetch: fetchCategories } = useCategories();
  const categories = (categoriesRes as any)?.data || (Array.isArray(categoriesRes) ? categoriesRes : []);

  // Auto-dismiss success toast after 3 seconds
  useEffect(() => {
    if (!successMessage) return
    const t = setTimeout(() => setSuccessMessage(""), 3000)
    return () => clearTimeout(t)
  }, [successMessage])

  const handleCategoryAdded = () => {
    fetchCategories()
    setSuccessMessage("Category created successfully!")
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] transition-colors duration-500 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-8 lg:p-10 w-full animate-fade-in space-y-6">
          {/* Success Toast */}
          {successMessage && (
            <div className="flex items-center gap-3 bg-white border border-emerald-100 text-emerald-700 px-5 py-4 rounded-2xl shadow-lg shadow-emerald-50 animate-fade-in">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="text-sm font-bold">{successMessage}</span>
            </div>
          )}

          <CategoriesHeader onAddCategory={() => setIsModalOpen(true)} />

          <CategoriesSearch value={searchQuery} onChange={setSearchQuery} />

          <CategoriesTable
            categories={categories}
            loading={loading}
            searchQuery={searchQuery}
          />

          <AddCategoryModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCategoryAdded={handleCategoryAdded}
          />
        </main>
      </div>
    </div>
  )
}

export default ProductCategoriesPage
