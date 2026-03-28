import React from "react"
import SalesRow from "./SalesRow"
import type { SaleTransaction } from "@/types/sales"

interface Props {
  transactions: SaleTransaction[]
  loading: boolean
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  onCancel: (id: string) => void
  onRefund: (id: string) => void
}

const SalesTable: React.FC<Props> = ({ transactions, loading, page, total, limit, onPageChange, onCancel, onRefund }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  
  if (loading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm p-12 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2563EB] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading sales transactions...</p>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm p-12 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No transactions found</h3>
        <p className="text-gray-500 text-sm">There are no sales matching your current filters.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">ID</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">Date</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">Customer</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">Total Amount</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">Payment Method</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap">Status</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-slate-500 whitespace-nowrap w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <SalesRow 
                key={tx.id || tx.saleId} 
                transaction={tx} 
                index={(page - 1) * limit + idx + 1}
                onCancel={() => onCancel(tx.id)}
                onRefund={() => onRefund(tx.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            Showing <span className="text-gray-900 font-bold">{(page - 1) * limit + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(page * limit, total)}</span> of <span className="text-gray-900 font-bold">{total}</span> transactions
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                aria-label="Previous page"
              >
                &lt;
              </button>
              <span className="min-w-[36px] h-9 flex items-center justify-center bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-900/20 border border-indigo-900/20 px-3">
                {page}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 hover:border-[#2563EB]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
    </div>
  )
}

export default SalesTable
