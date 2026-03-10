
import React, { useEffect, useState } from 'react';
import { Laptop2, Loader2, AlertCircle, Plus, Activity, Search } from 'lucide-react';
import { devicesApi } from '../../service/api';

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await devicesApi.getAll();
        if (response.data.success) {
          setDevices(response.data.data);
        } else {
          setError('Failed to load devices');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error communicating with server');
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 pt-2 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <Laptop2 className="w-8 h-8 mr-3 text-indigo-500" />
            Device Fleet
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Monitor and manage all provisioned POS terminals and kiosks.</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#1f1e35] text-white rounded-lg text-sm font-bold hover:bg-[#2a2845] transition-colors shadow-md">
            <Plus className="w-4 h-4 text-white" />
            <span>Register Device</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
        {/* Table Search / Filter Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by serial number..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-500">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Activity className="w-4 h-4" />
              <span>{devices.filter(d => d.isActive).length} Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg">
               <span>{devices.filter(d => !d.isActive).length} Offline</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-white">
                  <th className="py-4 px-6 min-w-[200px]">Device Name</th>
                  <th className="py-4 px-6 min-w-[150px]">Store Reference</th>
                  <th className="py-4 px-6 min-w-[180px]">Serial Number</th>
                  <th className="py-4 px-6">Scanner</th>
                  <th className="py-4 px-6 min-w-[120px]">Status</th>
                  <th className="py-4 px-6 min-w-[180px]">Last Hearbeat</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b border-slate-50 animate-pulse">
                    <td className="py-5 px-6">
                      <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </td>
                    <td className="py-5 px-6"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                    <td className="py-5 px-6"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                    <td className="py-5 px-6"><div className="h-6 bg-slate-200 rounded w-16"></div></td>
                    <td className="py-5 px-6"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                    <td className="py-5 px-6"><div className="h-4 bg-slate-200 rounded w-28"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Fleet offline</h3>
            <p className="text-slate-500 mt-2">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-white">
                  <th className="py-4 px-6 min-w-[200px]">Device Name</th>
                  <th className="py-4 px-6 min-w-[150px]">Store Reference</th>
                  <th className="py-4 px-6 min-w-[180px]">Serial Number</th>
                  <th className="py-4 px-6">Scanner</th>
                  <th className="py-4 px-6 min-w-[120px]">Status</th>
                  <th className="py-4 px-6 min-w-[180px]">Last Hearbeat</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {devices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 font-medium italic border-b border-slate-100 bg-slate-50/50">
                      No devices have been registered in the network.
                    </td>
                  </tr>
                ) : (
                  devices.map((device: any, idx) => (
                    <tr key={device.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                      <td className="py-5 px-6">
                        <div className="font-extrabold text-slate-900 tracking-tight">{device.deviceName}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{device.deviceType}</div>
                      </td>
                      <td className="py-5 px-6 font-mono text-slate-500 text-xs">
                        {device.storeId.substring(0,8)}...
                      </td>
                      <td className="py-5 px-6 font-mono text-slate-900 font-bold text-xs uppercase">
                        {device.serialNumber}
                      </td>
                      <td className="py-5 px-6">
                         {device.barcodeScanner ? (
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold font-mono tracking-wider">{device.scannerType || 'USB'}</span>
                         ) : (
                           <span className="text-slate-300 font-bold text-xs">NONE</span>
                         )}
                      </td>
                      <td className="py-5 px-6">
                         <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${device.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${device.isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          {device.isActive ? 'Online' : 'Offline'}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-500 font-medium text-xs">
                        {device.lastActiveAt ? new Date(device.lastActiveAt).toLocaleString() : 'Never'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceManagement;
