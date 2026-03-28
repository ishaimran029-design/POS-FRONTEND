import { Cpu } from "lucide-react"
import DeviceRow from "./DeviceRow"
import type { Device } from "@/pages/store-admin/devices-management/types/device.types"

export default function DevicesTable({ data, onDelete }: { data: Device[]; onDelete: (id: string) => Promise<boolean> }) {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-10 animate-fade-in hover:shadow-md transition-all duration-300">
            <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 uppercase tracking-[2px] text-[10px] font-black text-slate-400">
                            <th className="py-6 pl-8 font-black">ID</th>
                            <th className="py-6 font-black">Terminal Hub</th>
                            <th className="py-6 font-black">Hardware ID</th>
                            <th className="py-6 font-black">State</th>
                            <th className="py-6 font-black">Assigned User</th>
                            <th className="py-6 font-black">Last Sync</th>
                            <th className="py-6 font-black">Network IP</th>
                            <th className="py-6 font-black">Peripherals</th>
                            <th className="py-6 pr-8 text-right font-black">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50">
                        {data.map((device, idx) => (
                            <DeviceRow key={device.id} device={device} index={idx + 1} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
            {data.length === 0 && (
                <div className="py-24 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-slate-200 border border-slate-100 shadow-inner">
                        <Cpu size={32} />
                    </div>
                    <div className="mt-6">
                        <p className="text-sm font-black text-slate-900 mb-1 leading-none">Scanning... No Terminals Found</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Register hardware to manage your POS network</p>
                    </div>
                </div>
            )}
        </div>
    )
}
