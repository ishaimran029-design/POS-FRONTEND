import InventoryRow from "./InventoryRow"
import type { InventoryMovement } from "@/pages/store-admin/inventory/InventoryManagementPage"

interface Props {
  movements: InventoryMovement[]
  loading: boolean
}

const InventoryTable = ({ movements, loading }: Props) => {
  if (loading) {
    return (
      <div className="bg-white rounded-[32px] p-24 flex flex-col items-center justify-center border border-slate-100 shadow-sm transition-all duration-300">
        <div className="w-12 h-12 border-[3px] border-slate-100 border-t-[#2563EB] rounded-full animate-spin"></div>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[2px] animate-pulse mt-6">Indexing Logs...</p>
      </div>
    )
  }

  if (movements.length === 0) {
    return (
      <div className="bg-white rounded-[32px] p-24 flex flex-col items-center justify-center border border-slate-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">No logs recorded</h3>
        <p className="text-slate-400 text-xs font-medium max-w-xs uppercase tracking-widest leading-loose">We couldn't find any inventory movements matching your active criteria.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-fade-in hover:shadow-lg transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-12">ID</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Product Details</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Movement</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Status</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Ref #</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Operator</th>
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Timestamp</th>
              <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {movements.map((movement, idx) => (
              <InventoryRow key={movement.id} movement={movement} index={idx + 1} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900 font-bold">1</span> to <span className="text-slate-900">{Math.min(5, movements.length)}</span> of <span className="text-slate-900">{movements.length}</span> entries
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all active:scale-90 disabled:opacity-30">
            &lt;
          </button>
          <button className="w-10 h-10 rounded-xl bg-indigo-900 text-white font-bold text-[10px] shadow-md shadow-indigo-900/20 border border-indigo-900/20">
            1
          </button>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 text-[10px] font-bold hover:bg-slate-50">
            2
          </button>
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all active:scale-90">
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryTable
