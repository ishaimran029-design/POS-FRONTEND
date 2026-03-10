import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StaffHeader from '@/components/store-admin/StaffHeader';
import StaffFilters from '@/components/store-admin/StaffFilters';
import StaffTable from '@/components/store-admin/StaffTable';
import StaffPagination from '@/components/store-admin/StaffPagination';
import AddStaffModal from '@/components/store-admin/AddStaffModal';
import { useStaffData } from './hooks/useStaffData';

export default function StaffManagementPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        staff,
        totalCount,
        loading,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        handleAddStaff,
        handleDeleteStaff,
    } = useStaffData();

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

                <main className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
                    <StaffHeader
                        onAddStaff={() => setIsModalOpen(true)}
                        onExport={() => alert('Export CSV feature coming soon!')}
                    />

                    <StaffFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        roleFilter={roleFilter}
                        onRoleChange={setRoleFilter}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                    />

                    {loading ? (
                        <div className="flex items-center justify-center p-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Workforce...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <StaffTable
                                staff={staff}
                                onEdit={(id: string) => alert(`Edit feature for ${id} coming soon!`)}
                                onDelete={handleDeleteStaff}
                            />

                            <StaffPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalCount={totalCount}
                                itemsPerPage={5}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </main>
            </div>

            <AddStaffModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddStaff}
            />
        </div>
    );
}
