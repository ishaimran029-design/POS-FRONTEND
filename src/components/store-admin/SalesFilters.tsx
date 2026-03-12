import React from "react"
import { Filter, Search } from "lucide-react"

interface Props {
  search: string
  onSearchChange: (v: string) => void
  status: string
  onStatusChange: (v: string) => void
  payment: string
  onPaymentChange: (v: string) => void
}

const SalesFilters: React.FC<Props> = ({ search, onSearchChange, status, onStatusChange, payment, onPaymentChange }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-96">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Sale ID, Customer name, or Payment..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <select 
          value={status} 
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>
        <select 
          value={payment}
          onChange={(e) => onPaymentChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option>All Payments</option>
          <option>Visa</option>
          <option>Cash</option>
          <option>Apple Pay</option>
          <option>Mastercard</option>
        </select>
        <button className="p-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SalesFilters
