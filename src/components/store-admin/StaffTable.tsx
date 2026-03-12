import StaffRow from './StaffRow';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';

interface StaffTableProps {
    staff: StaffMember[];

    onDelete: (id: string) => void;
}

export default function StaffTable({ staff, onDelete }: Omit<StaffTableProps, 'onEdit'>) {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-6 animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">#</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Name</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Email</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Role</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Last Login</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {staff.map((member) => (
                            <StaffRow
                                key={member.id}
                                member={member}

                                onDelete={() => onDelete(member.id)}
                            />
                        ))}
                        {staff.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No staff members found.</p>
                                        <p className="text-slate-400 text-xs">Try adjusting your filters or search query.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
