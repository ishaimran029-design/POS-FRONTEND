import React from 'react';
import { Users, UserCheck, Activity } from 'lucide-react';

const StaffManagement: React.FC = () => {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Users size={24} className="mr-3 text-purple-400" />
          Staff Operations
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-xs font-bold text-slate-500">
            <span className="text-emerald-400">4 Active</span> / 6 Total
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { name: 'John Doe', role: 'Cashier', status: 'On Shift' },
          { name: 'Sarah Smith', role: 'Accountant', status: 'Off Duty' },
          { name: 'Mike Ross', role: 'Cashier', status: 'On Shift' },
        ].map((staff, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-100/30 rounded-2xl border border-slate-700/50 hover:bg-slate-100/50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                <UserCheck size={18} />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">{staff.name}</div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{staff.role}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity size={14} className={staff.status === 'On Shift' ? 'text-emerald-400 animate-pulse' : 'text-slate-600'} />
              <span className={`text-[10px] font-black uppercase ${staff.status === 'On Shift' ? 'text-emerald-400' : 'text-slate-500'}`}>
                {staff.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagement;
