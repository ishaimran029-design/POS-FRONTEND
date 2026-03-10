import React from 'react';
import { MapPin } from 'lucide-react';
import type { Store } from '../types/device.types';

interface Props {
    data: {
        assignedStore: string;
        assignedStation: string;
    };
    stores: Store[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const LocationAssignmentSection: React.FC<Props> = ({ data, stores, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">Location & Assignment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Assigned Store</label>
                    <select
                        name="assignedStore"
                        value={data.assignedStore}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="">Select a Store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>
                                {store.storeName} {store.branchCode ? `(${store.branchCode})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Assigned Station / Area</label>
                    <input
                        type="text"
                        name="assignedStation"
                        value={data.assignedStation}
                        onChange={onChange}
                        placeholder="e.g., Front Desk, Warehouse"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>
        </div>
    );
};
