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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm mb-10 flex flex-col md:flex-row gap-6 animate-fade-in hover:shadow-md dark:shadow-none transition-all duration-300">
            <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search by name, email or ID..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-medium text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-medium uppercase tracking-[2px] text-slate-400 dark:text-slate-500 leading-none">Filters</span>
                </div>

                <div className="relative group">
                    <select
                        value={roleFilter}
                        onChange={(e) => onRoleChange(e.target.value as StaffRole | 'All')}
                        className="pl-5 pr-10 py-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-[10px] outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer appearance-none min-w-[160px]"
                    >
                        <option value="All">All Roles</option>
                        <option value="STORE_ADMIN">Store Admin</option>
                        <option value="CASHIER">Cashier</option>
                        <option value="ACCOUNTANT">Accountant</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                <div className="relative group">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value as StaffStatus | 'All')}
                        className="pl-5 pr-10 py-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-[10px] outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer appearance-none min-w-[160px]"
                    >
                        <option value="All">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
