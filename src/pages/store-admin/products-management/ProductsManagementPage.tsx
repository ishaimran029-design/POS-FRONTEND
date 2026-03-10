import { useEffect, useState } from "react"
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

import ProductsHeader from "@/components/store-admin/ProductsHeader"
import ProductsFilters from "@/components/store-admin/ProductsFilters"
import ProductsTable from "@/components/store-admin/ProductsTable"
import ProductPagination from "@/components/store-admin/ProductPagination"
import AddProductModal from "@/components/store-admin/AddProductModal"

import { fetchProducts } from "@/api/products.api"
import type { Product } from "./types/product.types"

export default function ProductsManagementPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const limit = 10

    useEffect(() => {
        void loadProducts()
    }, [])

    const loadProducts = async () => {
        setLoading(true)
        try {
            const res = await fetchProducts()
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                setProducts(res.data)
            } else {
                setProducts([])
            }
        } catch (error) {
            console.error("Failed to fetch products:", error)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    const paginated = products.slice((page - 1) * limit, page * limit)
    const total = products.length

    return (

        <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
                <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full animate-fade-in">
                    <ProductsHeader openModal={() => setOpenModal(true)} />

                    <div className="mt-8">
                        <ProductsFilters />
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <div className="bg-white rounded-[40px] p-20 flex flex-col items-center justify-center border border-slate-50 shadow-xl shadow-slate-200/50">
                                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse mt-4">Syncing Inventory...</p>
                            </div>
                        ) : (
                            <ProductsTable data={paginated} />
                        )}
                    </div>

                    <div className="mt-8">
                        <ProductPagination page={page} setPage={setPage} total={total} />
                    </div>
                </main>
            </div>

            <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />

        </div>

    )

}
