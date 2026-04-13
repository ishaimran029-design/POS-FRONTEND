

const InventoryHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-brand leading-none">Stock Movements</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2.5 font-num">Real-time inventory logs and tracking</p>
            </div>
            
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border border-slate-200 bg-white px-5 py-3 rounded-2xl hover:bg-slate-50 hover:border-indigo-600/30 hover:text-indigo-600 text-slate-500 font-extrabold uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm font-num">
                    Export Logs
                </button>
                <button className="flex-1 sm:flex-none bg-indigo-600 text-white px-6 py-4 rounded-2xl hover:bg-indigo-700 font-extrabold uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 border border-indigo-600/20 font-num">
                    Log Adjustment
                </button>
            </div>
        </div>
    )
}

export default InventoryHeader
