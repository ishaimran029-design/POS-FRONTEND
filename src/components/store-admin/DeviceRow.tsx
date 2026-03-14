import { Usb, Bluetooth, Edit2, Trash2, Cpu, User } from "lucide-react"
import DeviceStatusBadge from "./DeviceStatusBadge"
import type { Device } from "@/pages/store-admin/devices-management/types/device.types"

interface DeviceRowProps {
    device: Device;
    index: number;
    onDelete: (id: string) => Promise<boolean>;
}

export default function DeviceRow({ device, index, onDelete }: DeviceRowProps) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
            await onDelete(device.id);
        }
    };

    return (
        <tr className="group hover:bg-[#2563EB]/5 transition-all duration-300 cursor-pointer border-b border-slate-50/50 last:border-0">
            <td className="py-6 pl-8">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#2563EB]/40 transition-colors">{(index + 1).toString().padStart(2, '0')}</span>
            </td>
            <td className="py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-[#1E1B4B]/20 transition-all shadow-sm">
                        <Cpu size={18} strokeWidth={3} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">{device.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">SaaS Terminal</p>
                    </div>
                </div>
            </td>
            <td className="py-6">
                <span className="text-[10px] font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">{device.serialNumber}</span>
            </td>
            <td className="py-6">
                <DeviceStatusBadge status={device.status} />
            </td>
            <td className="py-6">
                {device.connectedTo ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50/50 border border-green-100 rounded-xl w-fit">
                        <User size={12} className="text-green-600" strokeWidth={3} />
                        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">{device.connectedTo}</span>
                    </div>
                ) : (
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[2px] px-3 py-1.5 bg-slate-50/50 border border-slate-100 rounded-xl">Available</span>
                )}
            </td>
            <td className="py-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{device.lastHeartbeat.split(',')[0]}</span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{device.lastHeartbeat.split(',')[1] || ''}</span>
                </div>
            </td>
            <td className="py-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{device.ipAddress}</span>
            </td>
            <td className="py-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                        {device.scanner === "USB" ? <Usb size={14} /> : <Bluetooth size={14} />}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{device.scanner}</span>
                </div>
            </td>
            <td className="py-6 pr-8 text-right">
                <div className="flex items-center justify-end gap-3 transition-opacity">
                    <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-[#2563EB] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-[#2563EB]/10">
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-rose-100"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
