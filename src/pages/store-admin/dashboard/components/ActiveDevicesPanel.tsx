import { useState } from 'react';
import { Monitor, Info, Wifi, WifiOff, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Device } from '../types';

interface ActiveDevicesPanelProps {
    devices: Device[];
}

export default function ActiveDevicesPanel({ devices }: ActiveDevicesPanelProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(devices.length / itemsPerPage);

    const paginatedDevices = devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full hover:shadow-lg dark:shadow-none transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Active Devices</h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time status monitor</p>
                </div>
                <div className="bg-[#2563EB]/5 dark:bg-[#2563EB]/10 px-3 py-1.5 rounded-full border border-[#2563EB]/10 dark:border-[#2563EB]/20">
                    <span className="text-[10px] font-black text-[#2563EB] dark:text-[#60A5FA] uppercase tracking-widest">{devices.length} Live</span>
                </div>
            </div>
            <div className="space-y-4 flex-1">
                {paginatedDevices.map((device) => (
                    <div key={device.id} className="group flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-[#2563EB]/20 rounded-2xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${device.status === 'online' ? 'bg-[#262255] text-white border-[#262255]/20' : 'bg-rose-50 text-rose-600 border border-rose-100'} transition-all`}>
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
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#262255] dark:bg-[#312e81] rounded-md border border-[#262255]/20 dark:border-[#312e81]/30 shadow-sm">
                                        <Wifi size={10} strokeWidth={3} className="text-white" />
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Online</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 dark:bg-rose-900/20 rounded-md border border-rose-100 dark:border-rose-900/30 shadow-sm">
                                        <WifiOff size={10} strokeWidth={3} className="text-rose-600 dark:text-rose-400" />
                                        <span className="text-[8px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Offline</span>
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
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-700">
                            <Monitor size={24} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">No devices detected</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mb-2 mt-4 px-1">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-all shadow-sm"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Page <span className="text-slate-900 dark:text-white">{currentPage}</span> of {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-all shadow-sm"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            )}

        </div>
    );
}

