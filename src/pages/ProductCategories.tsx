import { useEffect, useState } from "react"
import Sidebar from "@/pages/store-admin/components/Sidebar"
import TopNavbar from "@/pages/store-admin/components/TopNavbar"

import CategoriesHeader from "@/components/store-admin/CategoriesHeader"
import CategoriesSearch from "@/components/store-admin/CategoriesSearch"
import CategoriesTable from "@/components/store-admin/CategoriesTable"
import AddCategoryModal from "@/components/store-admin/AddCategoryModal"

import { getCategories } from "@/api/category.api"
import type { Category } from "@/types/category"

const ProductCategories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await getCategories()
      setCategories(res.data.data)
    } catch (error) {
      console.error("Failed to fetch categories", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full animate-fade-in space-y-6">
          <CategoriesHeader onAddCategory={() => setIsModalOpen(true)} />
          <CategoriesSearch />
          <CategoriesTable categories={categories} loading={loading} />
          <AddCategoryModal 
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCategoryAdded={fetchCategories}
          />
        </main>
      </div>
    </div>
  )
}

export default ProductCategories
