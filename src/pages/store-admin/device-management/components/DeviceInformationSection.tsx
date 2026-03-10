import React from 'react';
import { Cpu } from 'lucide-react';

interface Props {
    data: {
        deviceName: string;
        serialNumber: string;
        deviceType: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DeviceInformationSection: React.FC<Props> = ({ data, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">Device Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Device Name</label>
                    <input
                        type="text"
                        name="deviceName"
                        value={data.deviceName}
                        onChange={onChange}
                        placeholder="e.g., Counter-3"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Serial Number</label>
                    <input
                        type="text"
                        name="serialNumber"
                        value={data.serialNumber}
                        onChange={onChange}
                        placeholder="SN-XXXX"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Device Type</label>
                    <select
                        name="deviceType"
                        value={data.deviceType}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="POS Terminal">POS Terminal</option>
                        <option value="Self Checkout">Self Checkout</option>
                        <option value="Mobile POS">Mobile POS</option>
                        <option value="Kiosk">Kiosk</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
