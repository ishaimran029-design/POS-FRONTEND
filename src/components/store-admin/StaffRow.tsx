import { MoreHorizontal } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;
    onToggleStatus: (id: string, active: boolean) => void;
    onEdit: (member: StaffMember) => void;
}

export default function StaffRow({ member, onToggleStatus, onEdit }: StaffRowProps) {
    return (
        <tr className="hover:bg-[#2563EB]/5 transition-all duration-300 group cursor-pointer border-b border-slate-50/50 last:border-0">
            <td className="px-6 py-5 text-center">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#2563EB]/40 transition-colors uppercase tracking-widest">
                    #{member.id.slice(-4)}
                </span>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex flex-col items-center">
                    <p className="text-sm font-black text-slate-900 leading-none">{member.name}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Employee</p>
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="text-slate-500 font-black text-[10px] lowercase tracking-widest">
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
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {member.lastLogin.split(',')[0]}
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        {member.lastLogin.split(',')[1] || ''}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => onEdit(member)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-slate-100 shadow-sm hover:shadow-md"
                        title="Edit Details"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
