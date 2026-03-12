import React, { useState, useRef, useEffect } from "react"
import type { SaleTransaction } from "@/types/sales"

interface Props {
  transaction: SaleTransaction
  onCancel: () => void
  onRefund: () => void
}

const SalesRow: React.FC<Props> = ({ transaction, onCancel, onRefund }) => {
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
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-4 font-semibold text-gray-900">
        #{transaction.saleId}
      </td>
      <td className="p-4 text-gray-600 text-sm">
        {transaction.date}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold uppercase transition-transform">
                {transaction.customer && transaction.customer !== "Guest" ? transaction.customer.charAt(0) : "G"}
            </div>
            <span className="font-medium text-gray-800">{transaction.customer || "Guest"}</span>
        </div>
      </td>
      <td className="p-4 font-bold text-gray-900">
        ${safeTotalAmount}
      </td>
      <td className="p-4">
        <span className={paymentBadgeClasses}>
            {transaction.paymentMethod || "N/A"}
        </span>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${statusColor[transaction.status] || "bg-gray-100 text-gray-700"}`}>
          {statusLabel()}
        </span>
      </td>
      <td className="p-4 relative" ref={menuRef}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1 font-medium text-sm overflow-hidden">
            <button 
              onClick={() => { setMenuOpen(false); onCancel(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-600"
            >
              Cancel Sale
            </button>
            <button 
              onClick={() => { setMenuOpen(false); onRefund(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 hover:text-orange-600"
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
