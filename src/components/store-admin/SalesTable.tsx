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
  
  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        // Simple logic for small number of pages; in a huge app you'd truncate.
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
            pages.push(i)
        } else if (pages[pages.length - 1] !== '...') {
            pages.push('...')
        }
    }
    return pages
  }

  if (loading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm p-12 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
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
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Sale ID</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Date</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Customer</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Total Amount</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Payment Method</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Status</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <SalesRow 
                key={tx.id || tx.saleId} 
                transaction={tx} 
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
        <div className="flex gap-1">
          <button 
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent disabled:opacity-50"
          >
            &lt;
          </button>
          
          {generatePageNumbers().map((p, idx) => (
            <button 
              key={idx}
              onClick={() => typeof p === 'number' ? onPageChange(p) : null}
              disabled={p === '...'}
              className={`w-min px-2 min-w-[32px] h-8 flex items-center justify-center rounded-lg border font-medium transition-all ${
                page === p 
                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700" 
                : p === '...' 
                  ? "border-transparent bg-transparent text-gray-400 cursor-default" 
                  : "border-gray-200 text-gray-600 bg-transparent hover:bg-white hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
          
          <button 
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default SalesTable
