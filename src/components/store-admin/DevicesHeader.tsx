import { Plus, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DevicesHeader() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Devices Management</h1>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Monitor and manage all point-of-sale hardware terminals.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-black hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    <Download size={18} />
                </button>
                <button
                    onClick={() => navigate("/store-admin/devices/register")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform active:scale-95"
                >
                    <Plus size={18} />
                    <span>Register Device</span>
                </button>
            </div>
        </div>
    )
}
