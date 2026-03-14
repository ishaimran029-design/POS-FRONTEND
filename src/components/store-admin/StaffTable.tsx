import { Users } from 'lucide-react';
import StaffRow from './StaffRow';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';

interface StaffTableProps {
    staff: StaffMember[];

    onDelete: (id: string) => void;
}

export default function StaffTable({ staff, onDelete }: Omit<StaffTableProps, 'onEdit'>) {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-10 animate-fade-in hover:shadow-md transition-all duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">#</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Member Identity</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Email Address</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Access Role</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Current Status</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Activity Log</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50">
                        {staff.map((member) => (
                            <StaffRow
                                key={member.id}
                                member={member}
                                onDelete={() => onDelete(member.id)}
                            />
                        ))}
                        {staff.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-slate-200 border border-slate-100">
                                            <Users size={32} />
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-extrabold text-sm tracking-tight leading-none mb-1">No Staff Members Found</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Try adjusting your filters or contact administrator</p>
                                        </div>
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
