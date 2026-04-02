import { MoreHorizontal, Eye, Power } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;
    index: number;
    onEdit: (member: StaffMember) => void;
    onToggleStatus: (id: string, active: boolean) => void;
    onViewDetails: (member: StaffMember) => void;
}

export default function StaffRow({ member, index, onEdit, onToggleStatus, onViewDetails }: StaffRowProps) {

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
                        onClick={() => onViewDetails(member)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-blue-100 dark:hover:border-blue-800 shadow-sm hover:shadow-md dark:shadow-none"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(member)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800 shadow-sm hover:shadow-md dark:shadow-none"
                        title="Edit Details"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onToggleStatus(member.id, member.status !== 'active')}
                        className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all active:scale-90 border shadow-sm hover:shadow-md dark:shadow-none ${member.status === 'active'
                            ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50 border-transparent hover:border-rose-100'
                            : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 border-transparent hover:border-emerald-100'
                            }`}
                        title={member.status === 'active' ? "Deactivate" : "Activate"}
                    >
                        <Power className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
