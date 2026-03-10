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

const ROLE_LABELS: Record<string, string> = {
    STORE_ADMIN: "Store Admin",
    CASHIER: "Cashier",
    ACCOUNTANT: "Accountant",
};

const ROLE_STYLES: Record<string, string> = {
    STORE_ADMIN: "bg-purple-100 text-purple-700",
    CASHIER: "bg-blue-100 text-blue-700",
    ACCOUNTANT: "bg-orange-100 text-orange-700",
};

export function RoleBadge({ role }: { role: StaffRole }) {
    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
            ROLE_STYLES[role] || "bg-gray-100 text-gray-700"
        )}>
            {ROLE_LABELS[role] || role}
        </span>
    );
}
