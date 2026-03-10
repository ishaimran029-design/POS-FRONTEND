import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const DeviceHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <button
                onClick={() => navigate('/store-admin/devices')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 mb-4 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Devices
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Register New Device</h1>
            <p className="text-gray-500 mt-1">
                Configure and authorize a new hardware terminal for your store.
            </p>
        </div>
    );
};
