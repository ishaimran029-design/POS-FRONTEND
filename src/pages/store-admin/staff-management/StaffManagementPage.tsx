import { useState } from 'react';
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import StaffHeader from '@/components/store-admin/StaffHeader';
import StaffFilters from '@/components/store-admin/StaffFilters';
import StaffTable from '@/components/store-admin/StaffTable';
import StaffPagination from '@/components/store-admin/StaffPagination';
import AddStaffModal from '@/components/store-admin/AddStaffModal';
import type { StaffMember, CreateStaffInput, StaffRole, StaffStatus } from './types/staff.types';
import { useStaff, useCreateStaff, useUpdateStaff } from '@/hooks/useStaff';

function mapApiUser(u: any): StaffMember {
    return {
        id: u.id || u._id,
        name: u.name,
        email: u.email,
        role: u.role as StaffRole,
        status: u.isActive ? 'active' : 'inactive',
        lastLogin: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'
    };
}

export default function StaffManagementPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaffToEdit, setSelectedStaffToEdit] = useState<StaffMember | undefined>(undefined);

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<StaffRole | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<StaffStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // React Query Hooks
    const { data: staffDataRes, isLoading: loading, refetch: refetchStaff } = useStaff();
    const createStaffMutation = useCreateStaff();
    const updateStaffMutation = useUpdateStaff();

    const staffRaw = (staffDataRes as any)?.data || (Array.isArray(staffDataRes) ? staffDataRes : []);
    const staff: StaffMember[] = Array.isArray(staffRaw) ? staffRaw.map(mapApiUser) : [];

    const filteredStaff = staff.filter(member => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            member.name.toLowerCase().includes(q) ||
            member.email.toLowerCase().includes(q) ||
            member.id.includes(searchQuery);
        const matchesRole = roleFilter === 'All' || member.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const totalCount = filteredStaff.length;
    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage) || 1;
    const paginatedStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleAddStaff = async (data: CreateStaffInput): Promise<{ success: boolean; error?: string }> => {
        try {
            await createStaffMutation.mutateAsync(data);
            return { success: true };
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Failed to create staff';
            return { success: false, error: msg };
        }
    };

    const handleToggleStatus = async (id: string, active: boolean) => {
        await updateStaffMutation.mutateAsync({ id, data: { isActive: active } });
    };

    const handleEditStaff = async (id: string, data: any): Promise<{ success: boolean; error?: string }> => {
        try {
            await updateStaffMutation.mutateAsync({ id, data });
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Failed to update user details' };
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] transition-colors duration-500 flex text-slate-900">
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

                <main className="p-4 md:p-8 lg:p-10 w-full animate-fade-in space-y-10">
                    <StaffHeader
                        onAddStaff={() => setIsModalOpen(true)}
                        onExport={() => alert('Export CSV feature coming soon!')}
                        onRefresh={() => refetchStaff()}
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
                        <div className="bg-white rounded-[32px] p-24 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-12 h-12 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] animate-pulse">Syncing Workforce...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fade-in">
                            <StaffTable
                                staff={paginatedStaff}
                                onToggleStatus={handleToggleStatus}
                                onEdit={(member) => {
                                    setSelectedStaffToEdit(member);
                                    setIsModalOpen(true);
                                }}
                            />

                            <StaffPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalCount={totalCount}
                                itemsPerPage={5}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </main>
            </div>

            <AddStaffModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedStaffToEdit(undefined);
                }}
                editMember={selectedStaffToEdit}
                onAdd={handleAddStaff}
                onEdit={handleEditStaff}
            />
        </div>
    );
}
