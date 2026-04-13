import { useState, useEffect, useMemo } from 'react';
import { DataTable } from '@/components/global-components/data-table';
import AddStaffModal from '@/components/store-admin/AddStaffModal';
import StatsCards from '@/components/global-components/StatsCards';
import type { ColumnDef } from '@tanstack/react-table';
import type { 
    UnifiedStaffMember, 
    CreateStaffInput, 
    StaffRole, 
    StaffStatus 
} from './types/staff.types';
import { 
    fetchStaffHR, 
    fetchSystemUsers, 
    createUnifiedStaff, 
    updateUnifiedStaff,
    deleteStaffMember,
    fetchStaffSummary
} from '@/api/staff.api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';

export default function StaffManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaffToEdit, setSelectedStaffToEdit] = useState<UnifiedStaffMember | undefined>(undefined);
    
    const [hrData, setHrData] = useState<any[]>([]);
    const [userData, setUserData] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const [hr, users, sum] = await Promise.all([
                fetchStaffHR(),
                fetchSystemUsers(),
                fetchStaffSummary()
            ]);
            
            // Robustly unwrap data from various response structures
            const hrList = hr?.data?.items || hr?.data || hr || [];
            const userList = users?.data?.items || users?.data || users || [];
            
            setHrData(Array.isArray(hrList) ? hrList : []);
            setUserData(Array.isArray(userList) ? userList : []);
            setSummary(sum?.data || sum);
        } catch (error) {
            console.error("Failed to sync workforce data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ─── Unified Data Merging ──────────────────────────────────────────
    const unifiedStaff: UnifiedStaffMember[] = useMemo(() => {
        const merged: UnifiedStaffMember[] = [];
        const processedUserIds = new Set<string>();

        // 1. Process all HR records and link with Users
        hrData.forEach((hr: any) => {
            const matchedUser = userData.find(u => 
                u.name.toLowerCase() === hr.name.toLowerCase() || 
                (hr.phone && u.phone === hr.phone)
            );

            if (matchedUser) processedUserIds.add(matchedUser.id);

            merged.push({
                id: hr.id,
                name: hr.name,
                phone: hr.phone,
                hrId: hr.id,
                hrRole: hr.role as StaffRole,
                monthlySalary: Number(hr.monthlySalary),
                joiningDate: hr.joiningDate,
                hrStatus: hr.status as StaffStatus,
                userId: matchedUser?.id,
                email: matchedUser?.email,
                systemRole: matchedUser?.role,
                isSystemActive: matchedUser?.isActive,
                lastLogin: matchedUser?.lastLoginAt,
                assignedTerminals: matchedUser?.assignedTerminals || [],
            });
        });

        // 2. Add Users who don't have an HR record (e.g. legacy or temp)
        userData.filter(u => !processedUserIds.has(u.id)).forEach(u => {
            merged.push({
                id: u.id,
                name: u.name,
                phone: u.phone,
                userId: u.id,
                email: u.email,
                systemRole: u.role,
                isSystemActive: u.isActive,
                lastLogin: u.lastLoginAt,
                assignedTerminals: u.assignedTerminals || [],
                // Default fallback HR data
                hrRole: (u.role === 'STORE_ADMIN' ? 'MANAGER' : 'CASHIER') as StaffRole,
                monthlySalary: 0,
                joiningDate: u.createdAt || new Date().toISOString(),
                hrStatus: u.isActive ? 'ACTIVE' : 'INACTIVE',
            });
        });

        return merged;
    }, [hrData, userData]);

    // ─── Table Columns Definitions ─────────────────────────────────────
    const columns: ColumnDef<UnifiedStaffMember>[] = [
        {
            accessorKey: "name",
            header: "Identity",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <UserIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                        <div className="font-black text-slate-900 dark:text-white">{row.original.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{row.original.phone || 'No Phone'}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "email",
            header: "System Access",
            cell: ({ row }) => row.original.email ? (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-300">{row.original.email}</span>
                    </div>
                    <Badge variant={row.original.isSystemActive ? "success" : "secondary"} className="text-[9px] uppercase font-black px-2 py-0.5">
                        {row.original.isSystemActive ? 'Active' : 'Disabled'}
                    </Badge>
                </div>
            ) : (
                <span className="text-[11px] font-bold text-slate-400 italic">No Dashboard Access</span>
            )
        },
        {
            accessorKey: "hrRole",
            header: "Role & Governance",
            cell: ({ row }) => (
                <div className="space-y-1">
                    <Badge className="bg-slate-900 border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                        {row.original.hrRole}
                    </Badge>
                    {row.original.assignedTerminals && row.original.assignedTerminals.length > 0 && (
                        <div className="text-[10px] font-bold text-blue-500 uppercase">
                            Term: {row.original.assignedTerminals[0].deviceName}
                        </div>
                    )}
                </div>
            )
        },
        {
            accessorKey: "monthlySalary",
            header: "Financial",
            cell: ({ row }) => (
                <div className="font-mono font-black text-slate-900 dark:text-emerald-400">
                    ₨ {Number(row.original.monthlySalary).toLocaleString()}
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">/mo</span>
                </div>
            )
        },
        {
            id: "actions",
            header: "Control",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setSelectedStaffToEdit(row.original);
                            setIsModalOpen(true);
                        }}
                    >
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={async () => {
                            if (window.confirm('Terminate this employment record?')) {
                                await deleteStaffMember(row.original.id);
                                loadData();
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    const handleAddStaff = async (data: CreateStaffInput): Promise<{ success: boolean; error?: string }> => {
        try {
            await createUnifiedStaff(data);
            await loadData();
            return { success: true };
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Failed to sync employee data';
            return { success: false, error: msg };
        }
    };

    const handleEditStaff = async (id: string, data: CreateStaffInput): Promise<{ success: boolean; error?: string }> => {
        try {
            const userId = (selectedStaffToEdit as any)?.userId;
            await updateUnifiedStaff(id, data, userId);
            await loadData();
            return { success: true };
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Failed to update employee data';
            return { success: false, error: msg };
        }
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-10">
            <div className="mt-8">
                <StatsCards data={[
                    { name: "Total Personnel", stat: String(unifiedStaff.length), change: String(summary?.totalStaff || 0), changeType: "positive" },
                    { name: "Active Logins", stat: String(userData.filter(u => u.isActive).length), change: "100%", changeType: "positive" },
                    { name: "Monthly Payroll", stat: `₨ ${Number(summary?.totalMonthlySalary || 0).toLocaleString()}`, change: "Payroll", changeType: "positive" },
                    { name: "Departments", stat: String(new Set(hrData.map(h => h.role)).size), change: "Active", changeType: "positive" },
                ]} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
                <DataTable 
                    columns={columns} 
                    data={unifiedStaff} 
                    isLoading={loading}
                    searchKey="name"
                    placeholder="Search employees by name, phone or role..."
                    headerActions={
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-slate-950 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[11px] h-11 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            + Onboard New Staff
                        </Button>
                    }
                    showExport
                    exportFilename="POS-Staff-Register"
                />
            </div>

            <AddStaffModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedStaffToEdit(undefined);
                }}
                editMember={selectedStaffToEdit as any}
                onAdd={handleAddStaff}
                onEdit={handleEditStaff}
            />
        </div>
    );
}

