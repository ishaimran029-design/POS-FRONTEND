import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { DeviceHeader } from './components/DeviceHeader';
import { DeviceForm } from './components/DeviceForm';
import { DeviceInfoCards } from './components/DeviceInfoCards';
import { useRegisterDevice } from './hooks/useRegisterDevice';
import { AlertCircle } from 'lucide-react';

const RegisterDevicePage: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { formData, loading, stores, error, handleChange, handleSubmit } = useRegisterDevice();

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
                <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    <DeviceHeader />

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700 animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <DeviceForm
                        formData={formData}
                        stores={stores}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />

                    <DeviceInfoCards />
                </main>
            </div>
        </div>
    );
};

export default RegisterDevicePage;
