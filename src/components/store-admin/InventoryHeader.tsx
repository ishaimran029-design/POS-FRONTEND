

const InventoryHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Stock Movements</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time inventory logs and tracking</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border border-slate-200 bg-white px-5 py-3 rounded-2xl hover:bg-slate-50 hover:border-[#2563EB]/30 hover:text-[#2563EB] text-slate-600 font-extrabold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm">
                    Export Logs
                </button>
                <button className="flex-1 sm:flex-none bg-[#1E1B4B] text-white px-6 py-4 rounded-2xl hover:bg-[#2563EB] font-extrabold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-[#1E1B4B]/20 transition-all active:scale-95 border border-[#1E1B4B]/20">
                    Log Adjustment
                </button>
            </div>
        </div>
    )
}

export default InventoryHeader
