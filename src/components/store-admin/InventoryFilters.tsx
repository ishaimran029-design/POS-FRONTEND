import React from "react"
import { Download, Printer } from "lucide-react"

const InventoryFilters = () => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex gap-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>All Time</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>All Movements</option>
                    <option>Sale</option>
                    <option>Restock</option>
                    <option>Adjustment</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors">
                    <Download className="w-4 h-4" /> Export
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors">
                    <Printer className="w-4 h-4" /> Print
                </button>
            </div>
        </div>
    )
}

export default InventoryFilters
