import { Edit2, Trash2, Mail } from 'lucide-react';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';
import { StaffStatusBadge, RoleBadge } from './StaffStatusBadge';

interface StaffRowProps {
    member: StaffMember;
    onEdit: () => void;
    onDelete: () => void;
}

export default function StaffRow({ member, onEdit, onDelete }: StaffRowProps) {
    return (
        <tr className="hover:bg-blue-50/50 transition-colors group">
            <td className="px-6 py-4">
                <span className="text-sm font-black text-slate-300 group-hover:text-blue-200 transition-colors">
                    #{member.id}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                        {member.name.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-slate-900">{member.name}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                    <Mail className="w-4 h-4 text-slate-300" />
                    {member.email}
                </div>
            </td>
            <td className="px-6 py-4">
                <RoleBadge role={member.role} />
            </td>
            <td className="px-6 py-4">
                <StaffStatusBadge status={member.status} />
            </td>
            <td className="px-6 py-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {member.lastLogin}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={onEdit}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all active:scale-90"
                        title="Edit Member"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                        title="Delete Member"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
