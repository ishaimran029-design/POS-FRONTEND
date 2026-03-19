
const StoreIdentityCard = () => {
    return (
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8 animate-fade-in hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Store Identity</h3>
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Official Store Name</label>
                        <input 
                            type="text" 
                            defaultValue="Hybrid POS Flagship"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 focus:bg-white focus:border-[#1E1B4B]/30 focus:ring-4 focus:ring-[#1E1B4B]/5 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Physical Headquarters</label>
                    <textarea 
                        rows={3}
                        defaultValue="Plot 42-C, 4th Lane, DHA Phase 6, Karachi, Pakistan"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 focus:bg-white focus:border-blue-100 outline-none transition-all resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Base Currency</label>
                        <div className="relative group">
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 focus:bg-white focus:border-blue-100 outline-none transition-all appearance-none cursor-pointer">
                                <option>INR – Indian Rupee</option>
                                <option>USD – US Dollar</option>
                                <option>EUR – Euro</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Regional Timezone</label>
                        <div className="relative group">
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 focus:bg-white focus:border-blue-100 outline-none transition-all appearance-none cursor-pointer">
                                <option>Asia/Kolkata (IST)</option>
                                <option>UTC (GMT+0)</option>
                                <option>America/New_York (GMT-5)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreIdentityCard;
