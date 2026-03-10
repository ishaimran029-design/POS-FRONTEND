import { Search, Filter } from 'lucide-react';
import type { StaffRole, StaffStatus } from '../../pages/store-admin/staff-management/types/staff.types';

interface StaffFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    roleFilter: StaffRole | 'All';
    onRoleChange: (role: StaffRole | 'All') => void;
    statusFilter: StaffStatus | 'All';
    onStatusChange: (status: StaffStatus | 'All') => void;
}

export default function StaffFilters({
    searchQuery,
    onSearchChange,
    roleFilter,
    onRoleChange,
    statusFilter,
    onStatusChange,
}: StaffFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 animate-fade-in">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by name, email or ID..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Filters</span>
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => onRoleChange(e.target.value as StaffRole | 'All')}
                    className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-black uppercase tracking-widest text-xs outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                >
                    <option value="All">All Roles</option>
                    <option value="STORE_ADMIN">Store Admin</option>
                    <option value="CASHIER">Cashier</option>
                    <option value="ACCOUNTANT">Accountant</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value as StaffStatus | 'All')}
                    className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-black uppercase tracking-widest text-xs outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                >
                    <option value="All">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>
        </div>
    );
}
