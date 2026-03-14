import type { StaffStatus, StaffRole } from '../../pages/store-admin/staff-management/types/staff.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function StaffStatusBadge({ status }: { status: StaffStatus }) {
    return (
        <span className={cn(
            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm inline-flex items-center gap-2",
            status === 'active' 
                ? "bg-green-50 text-green-600 border-green-100" 
                : "bg-rose-50 text-rose-600 border-rose-100"
        )}>
            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'active' ? "bg-green-500" : "bg-rose-500")} />
            {status}
        </span>
    );
}

const ROLE_LABELS: Record<string, string> = {
    STORE_ADMIN: "Administrator",
    CASHIER: "POS Operator",
    ACCOUNTANT: "Audit & Tax",
};

const ROLE_STYLES: Record<string, string> = {
    STORE_ADMIN: "bg-blue-50 text-blue-600 border-blue-100",
    CASHIER: "bg-indigo-50 text-indigo-600 border-indigo-100",
    ACCOUNTANT: "bg-slate-50 text-slate-600 border-slate-100",
};

export function RoleBadge({ role }: { role: StaffRole }) {
    return (
        <span className={cn(
            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm",
            ROLE_STYLES[role] || "bg-slate-50 text-slate-500 border-slate-100"
        )}>
            {ROLE_LABELS[role] || role}
        </span>
    );
}
