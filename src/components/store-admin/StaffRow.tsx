import { MoreHorizontal, UserCircle2 } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;
    onToggleStatus: (id: string, active: boolean) => void;
    onEdit: (member: StaffMember) => void;
    onViewDetails: (member: StaffMember) => void;
}

export default function StaffRow({ member, onToggleStatus, onEdit, onViewDetails }: StaffRowProps) {
    const nextStateLabel = member.status === 'active' ? 'Set Inactive' : 'Set Active';

    return (
        <tr className="hover:bg-[#2563EB]/5 dark:hover:bg-[#2563EB]/10 transition-all duration-300 group cursor-pointer border-b border-slate-50/50 dark:border-slate-800/50 last:border-0">
            <td className="px-6 py-5 text-center">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#2563EB]/40 transition-colors uppercase tracking-widest">
                    {member.id.toUpperCase().slice(-4)}
                </span>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex flex-col items-center">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{member.name}</p>
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        {member.role.replace('_', ' ')}
                    </p>
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="text-slate-500 dark:text-slate-400 font-black text-[10px] lowercase tracking-widest">
                    {member.email.toLowerCase()}
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center">
                    <RoleBadge role={member.role} />
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center">
                    <StaffStatusBadge 
                        status={member.status} 
                        onClick={() => onToggleStatus(member.id, member.status !== 'active')} 
                    />
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Login: {member.lastLogin}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Logout: {member.lastLogout}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => onViewDetails(member)}
                        className="w-10 h-10 flex items-center justify-center text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-indigo-100 shadow-sm hover:shadow-md"
                        title="View Staff Activity"
                    >
                        <UserCircle2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onToggleStatus(member.id, member.status !== 'active')}
                        className="px-3 h-10 inline-flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all active:scale-90 border border-slate-100"
                        title={nextStateLabel}
                    >
                        {nextStateLabel}
                    </button>
                    <button
                        onClick={() => onEdit(member)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 shadow-sm hover:shadow-md dark:shadow-none"
                        title="Edit Details"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
