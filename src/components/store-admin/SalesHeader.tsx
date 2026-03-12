import React from "react"
import { Bell, Download, Plus } from "lucide-react"

interface Props {
  onDateRangeChange: (start: string, end: string) => void
}

const SalesHeader: React.FC<Props> = ({ onDateRangeChange }) => {
  const handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (val === "Oct 1 - Oct 31, 2023") {
      onDateRangeChange("2023-10-01", "2023-10-31")
    } else if (val === "Last 7 Days") {
      const start = new Date()
      start.setDate(start.getDate() - 7)
      onDateRangeChange(start.toISOString().split('T')[0], new Date().toISOString().split('T')[0])
    } else if (val === "This Month") {
      const start = new Date()
      start.setDate(1)
      onDateRangeChange(start.toISOString().split('T')[0], new Date().toISOString().split('T')[0])
    } else {
      onDateRangeChange("", "")
    }
  }

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">Sales Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and monitor your recent store sales and order history accurately.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
        <select 
          onChange={handleDateSelect}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="">All Time</option>
          <option value="Oct 1 - Oct 31, 2023">Oct 1 - Oct 31, 2023</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="This Month">This Month</option>
        </select>
        <div className="w-px h-8 bg-gray-200 mx-2"></div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" /> New Transaction
        </button>
      </div>
    </div>
  )
}

export default SalesHeader
