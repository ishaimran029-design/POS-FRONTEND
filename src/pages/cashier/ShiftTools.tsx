import React from 'react';
import { History, RotateCcw, Package, User } from 'lucide-react';

const ShiftTools: React.FC = () => {
  return (
    <div className="mt-8 flex items-center space-x-8 bg-white border border-slate-200 p-4 rounded-2xl">
      <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Quick Actions</h3>
      <div className="flex space-x-6">
        <ToolBtn icon={<RotateCcw size={16} />} label="Returns" />
        <ToolBtn icon={<History size={16} />} label="History" />
        <ToolBtn icon={<Package size={16} />} label="Stock" />
        <ToolBtn icon={<User size={16} />} label="Cust. Search" />
      </div>
    </div>
  );
};

const ToolBtn = ({ icon, label }: { icon: any, label: string }) => (
  <button className="flex items-center space-x-2 text-slate-500 hover:text-emerald-400 transition-colors group">
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default ShiftTools;
