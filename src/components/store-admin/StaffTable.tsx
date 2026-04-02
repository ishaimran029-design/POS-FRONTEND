import { Users } from 'lucide-react';
import StaffRow from './StaffRow';
import type { StaffMember } from '../../pages/store-admin/staff-management/types/staff.types';

interface StaffTableProps {
    staff: StaffMember[];
    onEdit: (member: StaffMember) => void;
    onToggleStatus: (id: string, active: boolean) => void;
    onViewDetails: (member: StaffMember) => void;
}

export default function StaffTable({ staff, onEdit, onToggleStatus, onViewDetails }: StaffTableProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-10 animate-fade-in hover:shadow-md dark:shadow-none transition-all duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">ID</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Name</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Email Address</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Role</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Status</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Login / Logout</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50 dark:divide-slate-800/50">
                        {staff.map((member, idx) => (
                            <StaffRow
                                key={member.id}
                                member={member}
                                index={idx + 1}
                                onEdit={onEdit}
                                onToggleStatus={onToggleStatus}
                                onViewDetails={onViewDetails}
                            />
                        ))}
                        {staff.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[20px] flex items-center justify-center text-slate-200 dark:text-slate-700 border border-slate-100 dark:border-slate-700">
                                            <Users size={32} />
                                        </div>
                                        <div>
                                            <p className="text-slate-900 dark:text-white font-bold text-sm tracking-tight leading-none mb-1">No Staff Members Found</p>
                                            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Try adjusting your filters or contact administrator</p>
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
