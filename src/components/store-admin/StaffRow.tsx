import { Trash2, Mail } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;

    onDelete: () => void;
}

export default function StaffRow({ member, onDelete }: Omit<StaffRowProps, 'onEdit'>) {
    return (
        <tr className="hover:bg-[#2563EB]/5 transition-all duration-300 group cursor-pointer border-b border-slate-50/50 last:border-0">
            <td className="px-6 py-5">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#2563EB]/40 transition-colors uppercase tracking-widest">
                    #{member.id.slice(-4)}
                </span>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-[#1E1B4B]/20 transition-all shadow-sm">
                        {member.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 leading-none">{member.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Employee</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                        <Mail className="w-3.5 h-3.5" />
                    </div>
                    {member.email}
                </div>
            </td>
            <td className="px-6 py-5">
                <RoleBadge role={member.role} />
            </td>
            <td className="px-6 py-5">
                <StaffStatusBadge status={member.status} />
            </td>
            <td className="px-6 py-5">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {member.lastLogin.split(',')[0]}
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        {member.lastLogin.split(',')[1] || ''}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={onDelete}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-rose-100 shadow-sm hover:shadow-md"
                        title="Remove Member"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
