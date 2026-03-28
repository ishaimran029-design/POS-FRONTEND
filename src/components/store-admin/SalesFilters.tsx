import React from "react"
import { Filter, Search } from "lucide-react"

interface Props {
  search: string
  onSearchChange: (v: string) => void
  status: string
  onStatusChange: (v: string) => void
  paymentMethod: string
  onPaymentMethodChange: (v: string) => void
  dateRange: { start: string; end: string }
  onDateRangeChange: (start: string, end: string) => void
}

const SalesFilters: React.FC<Props> = ({ 
    search, 
    onSearchChange, 
    status, 
    onStatusChange, 
    paymentMethod, 
    onPaymentMethodChange,
    dateRange,
    onDateRangeChange
}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Invoice, Customer or Item..."
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Filters */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
           <input 
             type="date"
             value={dateRange.start}
             onChange={(e) => onDateRangeChange(e.target.value, dateRange.end)}
             className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-slate-600 px-2 cursor-pointer"
           />
           <span className="text-slate-300 font-bold">-</span>
           <input 
             type="date"
             value={dateRange.end}
             onChange={(e) => onDateRangeChange(dateRange.start, e.target.value)}
             className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-slate-600 px-2 cursor-pointer"
           />
        </div>

        <div className="relative">
          <select 
            value={status} 
            onChange={(e) => onStatusChange(e.target.value)}
            className="pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-600 outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer appearance-none min-w-[150px]"
          >
            <option value="All Status">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
             <Filter size={14} />
          </div>
        </div>

        <div className="relative">
          <select 
            value={paymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className="pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-600 outline-none focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer appearance-none min-w-[150px]"
          >
            <option value="All Methods">All Methods</option>
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
             <Filter size={14} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesFilters
