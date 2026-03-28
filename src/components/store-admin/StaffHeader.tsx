import { Download, Plus, RotateCw } from 'lucide-react';

interface StaffHeaderProps {
    onAddStaff: () => void;
    onExport: () => void;
    onRefresh?: () => void;
}

export default function StaffHeader({ onAddStaff, onExport, onRefresh }: StaffHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in px-2">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Staff Members</h1>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                    Centralize your workforce management. Create accounts and monitor access levels.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onRefresh}
                    className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-600/30 hover:text-indigo-600 dark:hover:text-white transition-all active:scale-95 shadow-sm group"
                    title="Refresh Data"
                >
                    <RotateCw className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                    Refresh
                </button>
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-600/30 hover:text-indigo-600 dark:hover:text-white transition-all active:scale-95 shadow-sm group"
                >
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                    Export CSV
                </button>
                <button
                    onClick={onAddStaff}
                    className="flex items-center gap-3 px-8 py-3.5 bg-indigo-900 border border-indigo-900/20 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 shadow-lg shadow-indigo-900/20 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                    Add Staff Member
                </button>
            </div>
        </div>
    );
}
