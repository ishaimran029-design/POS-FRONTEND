import { Monitor, Info, Wifi, WifiOff } from 'lucide-react';
import type { Device } from '../types';

interface ActiveDevicesPanelProps {
    devices: Device[];
}

export default function ActiveDevicesPanel({ devices }: ActiveDevicesPanelProps) {
    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Devices</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time status monitor</p>
                </div>
                <div className="bg-[#2563EB]/5 px-3 py-1.5 rounded-full border border-[#2563EB]/10">
                    <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">{devices.length} Live</span>
                </div>
            </div>
            <div className="space-y-4 flex-1">
                {devices.map((device) => (
                    <div key={device.id} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-[#2563EB]/20 rounded-2xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${device.status === 'online' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'} transition-all`}>
                                <Monitor size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{device.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{device.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {device.status === 'online' ? (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-md border border-emerald-100 shadow-sm shadow-emerald-50">
                                        <Wifi size={10} strokeWidth={3} className="text-emerald-600" />
                                        <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Online</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 rounded-md border border-rose-100 shadow-sm shadow-rose-50">
                                        <WifiOff size={10} strokeWidth={3} className="text-rose-600" />
                                        <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">Offline</span>
                                    </div>
                                )}
                            </div>
                            <button className="p-2 text-slate-300 hover:text-[#2563EB] transition-colors opacity-0 group-hover:opacity-100">
                                <Info size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                {!devices.length && (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                            <Monitor size={24} className="text-slate-300" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No devices detected</p>
                    </div>
                )}
            </div>
            <button className="mt-8 w-full py-4 bg-white border border-slate-100 text-[10px] text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 hover:text-slate-900 transition-all shadow-sm">
                View Terminal Logs
            </button>
        </div>
    );
}
