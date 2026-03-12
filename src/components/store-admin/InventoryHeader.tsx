import React from "react"
import { Bell } from "lucide-react"

const InventoryHeader = () => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by product, ID, or user"
                        className="pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                    Log Movement
                </button>
            </div>
        </div>
    )
}

export default InventoryHeader
