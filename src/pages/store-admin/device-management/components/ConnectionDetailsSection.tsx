import React from 'react';
import { Network } from 'lucide-react';

interface Props {
    data: {
        ipAddress: string;
        scannerConnection: string;
        printerType: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ConnectionDetailsSection: React.FC<Props> = ({ data, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Network className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">Connection Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">IP Address</label>
                    <input
                        type="text"
                        name="ipAddress"
                        value={data.ipAddress}
                        onChange={onChange}
                        placeholder="192.168.1.10"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    />
                    <p className="text-[11px] text-gray-400">Format: xxx.xxx.xxx.xxx</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Scanner Connection</label>
                    <select
                        name="scannerConnection"
                        value={data.scannerConnection}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="USB">USB</option>
                        <option value="Bluetooth">Bluetooth</option>
                        <option value="Network">Network</option>
                        <option value="None">None</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Primary Printer</label>
                    <select
                        name="printerType"
                        value={data.printerType}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="Thermal 80mm">Thermal 80mm</option>
                        <option value="Thermal 58mm">Thermal 58mm</option>
                        <option value="Network Printer">Network Printer</option>
                        <option value="None">None</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
