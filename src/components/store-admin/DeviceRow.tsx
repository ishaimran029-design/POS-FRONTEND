import { Usb, Bluetooth, MoreVertical, Edit2, Trash2, Cpu } from "lucide-react"
import DeviceStatusBadge from "./DeviceStatusBadge"
import type { Device } from "@/pages/store-admin/devices-management/types/device.types"

export default function DeviceRow({ device, index, onDelete }: { device: Device; index: number; onDelete: (id: string) => Promise<boolean> }) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
            await onDelete(device.id);
        }
    };

    return (
        <tr className="group hover:bg-blue-50/50 transition-all border-b border-gray-100 last:border-0">
            <td className="py-4 pl-8">
                <span className="text-xs font-black text-gray-300">{(index + 1).toString().padStart(2, '0')}</span>
            </td>
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Cpu size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 leading-tight">{device.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">{device.type}</p>
                    </div>
                </div>
            </td>
            <td className="py-4">
                <span className="text-xs font-bold text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">{device.serialNumber}</span>
            </td>
            <td className="py-4">
                <DeviceStatusBadge status={device.status} />
            </td>
            <td className="py-4">
                <p className="text-xs font-bold text-gray-600">{device.lastHeartbeat}</p>
            </td>
            <td className="py-4">
                <span className="text-xs font-bold text-gray-400">{device.ipAddress}</span>
            </td>
            <td className="py-4">
                <div className="flex items-center gap-2">
                    {device.scanner === "USB" && <Usb size={14} className="text-gray-400" />}
                    {device.scanner === "Bluetooth" && <Bluetooth size={14} className="text-gray-400" />}
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{device.scanner}</span>
                </div>
            </td>
            <td className="py-4 pr-8 text-right">
                <div className="flex items-center justify-end gap-2 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm">
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all shadow-sm"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                <button className="p-2 text-gray-400 group-hover:hidden transition-all">
                    <MoreVertical size={16} />
                </button>
            </td>
        </tr>
    );
}
