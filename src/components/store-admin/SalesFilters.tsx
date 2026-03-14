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
    <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Sale ID, Customer name..."
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all font-bold text-slate-700 placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <select 
            value={status} 
            onChange={(e) => onStatusChange(e.target.value)}
            className="pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all cursor-pointer appearance-none min-w-[160px]"
          >
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Refunded</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
             <Filter size={14} />
          </div>
        </div>
        <div className="relative">
          <select 
            value={payment}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:bg-white focus:border-[#2563EB]/30 focus:ring-4 focus:ring-[#2563EB]/5 transition-all cursor-pointer appearance-none min-w-[160px]"
          >
            <option>All Payments</option>
            <option>Visa</option>
            <option>Cash</option>
            <option>Apple Pay</option>
            <option>Mastercard</option>
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
