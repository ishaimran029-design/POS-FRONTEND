import React from "react"
import InventoryRow from "./InventoryRow"
import { InventoryMovement } from "@/pages/InventoryManagement"

interface Props {
  movements: InventoryMovement[]
  loading: boolean
}

const InventoryTable: React.FC<Props> = ({ movements, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm p-12 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading inventory movements...</p>
      </div>
    )
  }

  if (movements.length === 0) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm p-12 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No movements found</h3>
        <p className="text-gray-500 text-sm">There are no inventory logs matching your current filters.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Product Name</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Quantity Change</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Change Type</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Reference ID</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">User</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap">Timestamp</th>
              <th className="p-4 text-left font-black uppercase tracking-widest text-xs text-gray-500 whitespace-nowrap w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <InventoryRow key={movement.id} movement={movement} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-900 font-bold">1</span> to <span className="text-gray-900 font-bold">{Math.min(5, movements.length)}</span> of <span className="text-gray-900 font-bold">{movements.length}</span> results
        </div>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent disabled:opacity-50">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all bg-transparent">
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryTable
