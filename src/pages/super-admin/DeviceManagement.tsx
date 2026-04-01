import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { Laptop2, AlertCircle, Plus, Activity, Search } from 'lucide-react';
import { devicesApi } from '../../service/api';
import { DataTable } from '@/components/global-components/data-table';

const DeviceManagement: React.FC = () => {

  const { data: devicesRes, isLoading, error: devicesError } = useQuery({
    queryKey: ['devices', 'all'],
    queryFn: () => devicesApi.getAll(),
  });

  const devices = devicesRes?.data?.data || [];
  const error = (devicesError as any)?.response?.data?.message || (devicesError as any)?.message;

  const deviceColumns = useMemo<ColumnDef<any, any>[]>(() => [
    {
      accessorKey: 'deviceName',
      header: 'Device Name',
      cell: ({ row }) => (
        <div>
          <div className="font-extrabold text-slate-900 tracking-tight">{row.original.deviceName}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{row.original.deviceType}</div>
        </div>
      ),
    },
    {
      accessorFn: (row) => row.storeId ? `${row.storeId.substring(0, 8)}...` : 'N/A',
      id: 'storeReference',
      header: 'Store Reference',
      cell: ({ getValue }) => <span className="font-mono text-slate-500 text-xs">{getValue<string>()}</span>,
    },
    {
      accessorKey: 'serialNumber',
      header: 'Serial Number',
      cell: ({ getValue }) => <span className="font-mono text-slate-900 font-bold text-xs uppercase">{getValue<string>()}</span>,
    },
    {
      id: 'scanner',
      header: 'Scanner',
      accessorFn: (row) => row.barcodeScanner ? (row.scannerType || 'USB') : 'NONE',
      cell: ({ getValue }) => (
        getValue<string>() !== 'NONE' ? (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold font-mono tracking-wider">{getValue<string>()}</span>
        ) : (
          <span className="text-slate-300 font-bold text-xs">NONE</span>
        )
      ),
    },
    {
      accessorFn: (row) => row.isActive,
      id: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${active ? 'bg-emerald-500' : 'bg-red-500'}`} />
            {active ? 'Online' : 'Offline'}
          </div>
        );
      },
    },
    {
      id: 'lastHeartbeat',
      header: 'Last Heartbeat',
      accessorFn: (row) => row.lastActiveAt ? new Date(row.lastActiveAt).toLocaleString() : 'Never',
      cell: ({ getValue }) => <span className="text-slate-500 font-medium text-xs">{getValue<string>()}</span>,
    },
  ], []);

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
              <span>{devices.filter((d: any) => d.isActive).length} Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg">
               <span>{devices.filter((d: any) => !d.isActive).length} Offline</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataTable
            data={devices}
            columns={deviceColumns}
            isLoading={isLoading}
            showToolbar={false}
            searchKey={"serialNumber"}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
