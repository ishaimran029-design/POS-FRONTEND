import { Download, Monitor } from "lucide-react"

interface DevicesHeaderProps {
  onAddTerminal?: () => void;
  terminalCount?: number;
}

export default function DevicesHeader({ onAddTerminal, terminalCount = 0 }: DevicesHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Terminals Management</h1>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">
                    {terminalCount} {terminalCount === 1 ? 'terminal' : 'terminals'} registered · Monitor and manage all POS terminals
                </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-black hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    <Download size={18} />
                </button>
                {onAddTerminal && (
                    <button
                        onClick={onAddTerminal}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                    >
                        <Monitor size={18} />
                        <span>Add New Terminal</span>
                    </button>
                )}
            </div>
        </div>
    )
}
