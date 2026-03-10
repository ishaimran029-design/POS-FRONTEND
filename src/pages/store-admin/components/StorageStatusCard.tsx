import { Cloud, AlertTriangle } from 'lucide-react';

export default function StorageStatusCard() {
    const usage = 78;

    return (
        <div className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
            {/* Decorative Blur */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                    <Cloud size={24} className="text-indigo-400" />
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                    Upgrade
                </button>
            </div>

            <div className="space-y-6 relative z-10">
                <div>
                    <h3 className="text-xl font-black tracking-tight">Cloud Storage</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Local & Sync database</p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-2xl font-black">{usage}%</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase">1.2 GB / 2.0 GB used</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${usage > 90 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                            style={{ width: `${usage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <AlertTriangle className="text-amber-400" size={16} />
                    <p className="text-[10px] font-bold text-slate-300 leading-relaxed uppercase tracking-widest">
                        Database sync optimization required.
                        <span className="block text-slate-500 font-medium normal-case mt-0.5 tracking-normal">Backup performed 2h ago.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
