import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    loading: boolean;
}

export const DeviceFormActions: React.FC<Props> = ({ loading }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
            <button
                type="button"
                onClick={() => navigate('/store-admin/devices')}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-all active:scale-95 disabled:opacity-50"
                disabled={loading}
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md shadow-blue-200 active:scale-95 flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Registering...
                    </>
                ) : (
                    'Register Device'
                )}
            </button>
        </div>
    );
};
