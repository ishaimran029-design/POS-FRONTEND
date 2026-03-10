import { Download, Plus } from 'lucide-react';

interface StaffHeaderProps {
    onAddStaff: () => void;
    onExport: () => void;
}

export default function StaffHeader({ onAddStaff, onExport }: StaffHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-fade-in">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Staff Members</h1>
                <p className="text-slate-500 font-medium max-w-2xl">
                    Centralize your workforce management. Create accounts, assign roles, and monitor access levels for all your store employees.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
                <button
                    onClick={onAddStaff}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 border border-blue-500 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add New Staff
                </button>
            </div>
        </div>
    );
}
