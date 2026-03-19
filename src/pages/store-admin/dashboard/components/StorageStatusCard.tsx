import { Cloud, AlertTriangle } from 'lucide-react';

export default function StorageStatusCard() {
    const usage = 78;
    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative group hover:shadow-xl transition-all duration-500">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2563EB]/5 blur-3xl group-hover:bg-[#2563EB]/10 transition-all duration-700"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="p-3 bg-[#2563EB]/5 rounded-2xl border border-[#2563EB]/10">
                    <Cloud size={24} className="text-[#1E1B4B]" />
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2563EB] transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Upgrade</button>
            </div>
            <div className="space-y-6 relative z-10">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Cloud Storage</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[1px] mt-1">Local & Sync database</p>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-2xl font-black text-slate-900 tabular-nums">{usage}%</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">1.2 GB / 2.0 GB USED</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-50">
                        <div className={`h-full rounded-full transition-all duration-1000 ${usage > 90 ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]' : 'bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.4)]'}`} style={{ width: `${usage}%` }}></div>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <AlertTriangle className="text-amber-500 mt-0.5" size={16} />
                    <div>
                        <p className="text-[10px] font-black text-slate-800 leading-relaxed uppercase tracking-widest">
                            Sync optimization required
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Backup performed 2h ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
