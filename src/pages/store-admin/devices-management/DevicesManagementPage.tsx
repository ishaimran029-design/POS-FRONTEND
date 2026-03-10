import { useState } from "react"
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

import DevicesHeader from "@/components/store-admin/DevicesHeader"
import DevicesFilters from "@/components/store-admin/DevicesFilters"
import DevicesTable from "@/components/store-admin/DevicesTable"
import DevicesPagination from "@/components/store-admin/DevicesPagination"

import { useDevicesData } from "./hooks/useDevicesData"

export default function DevicesManagementPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { paginated, page, setPage, total, loading, handleDelete } = useDevicesData()

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex transition-colors duration-500">
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
                    <DevicesHeader />

                    <div className="mt-8">
                        <DevicesFilters />
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <div className="bg-white rounded-[32px] p-24 flex flex-col items-center justify-center border border-gray-100 shadow-sm shadow-indigo-100/10">
                                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black text-gray-400 mt-6 uppercase tracking-widest animate-pulse leading-none">Scanning Hardware...</p>
                            </div>
                        ) : (
                            <DevicesTable data={paginated} onDelete={handleDelete} />
                        )}
                    </div>

                    <div className="mt-8">
                        <DevicesPagination page={page} setPage={setPage} total={total} />
                    </div>
                </main>
            </div>
        </div>
    )
}
