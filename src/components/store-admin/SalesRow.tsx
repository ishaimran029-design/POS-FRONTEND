import React, { useState, useRef, useEffect } from "react"
import type { SaleTransaction } from "@/types/sales"

interface Props {
  transaction: SaleTransaction
  index: number
  onCancel: () => void
  onRefund: () => void
}

const SalesRow: React.FC<Props> = ({ transaction, index, onCancel, onRefund }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const statusColor: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    COMPLETED: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-yellow-100 text-yellow-700",
    refunded: "bg-red-100 text-red-700",
    REFUNDED: "bg-red-100 text-red-700"
  }

  // UI mapping exactly as specified
  const statusLabel = () => {
    let raw = transaction.status;
    if (raw === "COMPLETED") return "Completed";
    if (raw === "FAILED") return "Pending";
    if (raw === "REFUNDED") return "Refunded";
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  const paymentBadgeClasses = "px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 font-medium whitespace-nowrap capitalize"

  const safeTotalAmount = typeof transaction.totalAmount === 'number' ? transaction.totalAmount.toFixed(2) : parseFloat(transaction.totalAmount || "0").toFixed(2)

  return (
    <tr className="border-b hover:bg-indigo-600/5 transition-all duration-300 group cursor-pointer">
      <td className="p-4 font-mono text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors">
        {index.toString().padStart(2, '0')}
      </td>
      <td className="p-4 text-gray-600 text-sm">
        {transaction.date}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600/5 text-indigo-600 border border-indigo-600/10 flex items-center justify-center text-xs font-medium uppercase">
                {transaction.customer && transaction.customer !== "Guest" ? transaction.customer.charAt(0) : "G"}
            </div>
            <span className="font-medium text-gray-800 group-hover:text-indigo-900 transition-colors">{transaction.customer || "Guest"}</span>
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest ml-1 opacity-0 group-hover:opacity-100 transition-all">#{transaction.saleId?.slice(0, 6)}</span>
        </div>
      </td>
      <td className="p-4 font-semibold text-slate-900">
        ${safeTotalAmount}
      </td>
      <td className="p-4">
        <span className={paymentBadgeClasses}>
            {transaction.paymentMethod || "N/A"}
        </span>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wide ${statusColor[transaction.status] || "bg-gray-100 text-gray-700"}`}>
          {statusLabel()}
        </span>
      </td>
      <td className="p-4 relative" ref={menuRef}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-600/10 shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1 font-medium text-sm overflow-hidden">
            <button 
              onClick={() => { setMenuOpen(false); onCancel(); }}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors text-slate-700 hover:text-rose-600 text-xs font-medium"
            >
              Cancel Sale
            </button>
            <button 
              onClick={() => { setMenuOpen(false); onRefund(); }}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors text-slate-700 hover:text-amber-600 text-xs font-medium"
            >
              Refund Sale
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default SalesRow
