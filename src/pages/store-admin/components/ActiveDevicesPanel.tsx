import { Monitor, Info, Wifi, WifiOff } from 'lucide-react';
import type { Device } from '../types/dashboard.types';

interface ActiveDevicesPanelProps {
    devices: Device[];
}

export default function ActiveDevicesPanel({ devices }: ActiveDevicesPanelProps) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Devices</h3>
                    <p className="text-xs text-slate-500 font-medium">Real-time status monitor</p>
                </div>
                <div className="bg-indigo-50 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{devices.length} Live</span>
                </div>
            </div>

            <div className="space-y-4 flex-1">
                {devices.map((device) => (
                    <div key={device.id} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-indigo-100 rounded-2xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${device.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} transition-colors`}>
                                <Monitor size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{device.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{device.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {device.status === 'online' ? (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-100">
                                        <Wifi size={10} className="text-emerald-600" />
                                        <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Online</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 rounded-md border border-rose-100">
                                        <WifiOff size={10} className="text-rose-600" />
                                        <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">Offline</span>
                                    </div>
                                )}
                            </div>
                            <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                <Info size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                {!devices.length && (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                            <Monitor size={24} />
                        </div>
                        <p className="text-sm italic font-medium">No devices detected</p>
                    </div>
                )}
            </div>

            <button className="mt-6 w-full py-3 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all">
                See All Logs
            </button>
        </div>
    );
}
