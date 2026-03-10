import type { StaffStatus, StaffRole } from '../../pages/store-admin/staff-management/types/staff.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function StaffStatusBadge({ status }: { status: StaffStatus }) {
    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
            status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        )}>
            {status}
        </span>
    );
}

export function RoleBadge({ role }: { role: StaffRole }) {
    const styles = {
        Manager: "bg-purple-100 text-purple-700",
        Cashier: "bg-blue-100 text-blue-700",
        Accountant: "bg-orange-100 text-orange-700",
        Admin: "bg-slate-100 text-slate-700",
    };

    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
            styles[role as keyof typeof styles] || "bg-gray-100 text-gray-700"
        )}>
            {role}
        </span>
    );
}
