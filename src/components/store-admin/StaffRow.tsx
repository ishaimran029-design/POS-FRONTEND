import { MoreHorizontal } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;
    index: number;
    onEdit: (member: StaffMember) => void;
}

export default function StaffRow({ member, index, onEdit }: StaffRowProps) {

    return (
        <tr className="hover:bg-[#2563EB]/5 dark:hover:bg-[#2563EB]/10 transition-all duration-300 group cursor-pointer border-b border-slate-50/50 dark:border-slate-800/50 last:border-0">
            <td className="px-6 py-5 text-center">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {index.toString().padStart(2, '0')}
                </span>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex flex-col items-center">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{member.name}</p>
                    <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        UID: {member.id.slice(0, 8)} • {member.role.replace('_', ' ')}
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
