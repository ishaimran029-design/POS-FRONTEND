import DeviceRow from "./DeviceRow"
import type { Device } from "@/pages/store-admin/devices-management/types/device.types"

export default function DevicesTable({ data, onDelete }: { data: Device[]; onDelete: (id: string) => Promise<boolean> }) {
    return (
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                            <th className="py-5 pl-8 font-black">#</th>
                            <th className="py-5 font-black">Device Name</th>
                            <th className="py-5 font-black">Serial Number</th>
                            <th className="py-5 font-black">Status</th>
                            <th className="py-5 font-black">Last Heartbeat</th>
                            <th className="py-5 font-black">IP Address</th>
                            <th className="py-5 font-black">Scanner</th>
                            <th className="py-5 pr-8 text-right font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((device, idx) => (
                            <DeviceRow key={device.id} device={device} index={idx} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
            {data.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200 mb-4 border border-gray-100 border-dashed">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <p className="text-sm font-black text-gray-900 mb-1">No devices registered</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Connect hardware to see them here.</p>
                </div>
            )}
        </div>
    )
}
