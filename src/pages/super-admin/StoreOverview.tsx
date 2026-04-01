import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Store, Laptop2, CreditCard, Activity, Plus, Filter, AlertCircle } from 'lucide-react';
import { storesApi, reportsApi } from '../../service/api';
import { StatsCard } from '../../components/ui/StatsCard';
import { DataTable } from '@/components/global-components/data-table';
import { formatPKR } from '@/utils/format';
import { showToast } from '../../utils/admin-toast';

const StoreOverview: React.FC = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: storesRes, isLoading: storesLoading, error: storesError, refetch: refetchStores } = useQuery({
    queryKey: ['stores', 'all'],
    queryFn: () => storesApi.getAll(),
  });

  const { mutate: toggleStatus, isPending: isToggling } = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => 
      storesApi.update(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores', 'all'] });
      showToast('Status Synchronization Successful');
    },
    onError: () => {
      showToast('Status Protocol Execution Failed', 'error');
    }
  });

  const handleToggle = (id: string, current: boolean) => {
    toggleStatus({ id, isActive: !current });
  };

  const { data: statsRes, isLoading: statsLoading } = useQuery({
    queryKey: ['superadmin', 'overview'],
    queryFn: () => reportsApi.getSuperAdminOverview(),
  });

  const stores = storesRes?.data?.data || [];

  const storeColumns = useMemo<ColumnDef<any, any>[]>(() => [
    {
      id: 'storeId',
      header: 'Store ID',
      cell: ({ row }) => (
        <span className="font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
          {(row.index + 1).toString().padStart(2, '0')}
        </span>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Store Name',
      cell: ({ row }) => {
        // Robust cleaning of numeric prefixes (01-, 01. 01 ) and "Store X" labels
        const cleanName = row.original.name.replace(/^([\d\s\-\.]+|Store\s+\d+\s*[\-\.]?\s*)/i, '').trim();
        return (
          <div className="font-extrabold text-slate-900 tracking-tight">{cleanName || row.original.name}</div>
        );
      },
    },
    {
      accessorKey: 'city',
      header: 'Store City',
      cell: ({ getValue }) => (
        <span className="font-medium text-slate-600">
          {getValue<string>() || 'Global'}
        </span>
      ),
    },
    {
      accessorKey: 'state',
      header: 'Region',
      cell: ({ getValue }) => (
        <span className="font-medium text-slate-400 uppercase tracking-widest text-[10px]">
          {getValue<string>() || 'National'}
        </span>
      ),
    },
    {
      id: 'ownerName',
      header: 'Owner Name',
      cell: ({ row }) => (
        <span className="font-medium text-slate-600">
          {row.original.adminName || 'Super Admin'}
        </span>
      ),
    },
    {
      accessorFn: (row) => row.isActive,
      id: 'status',
      header: 'Status',
      cell: ({ getValue, row }) => {
        const active = getValue<boolean>();
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggle(row.original.id, active)}
              disabled={isToggling}
              className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                active ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  active ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-emerald-600' : 'text-slate-400'}`}>
              {active ? 'Active' : 'Inactive'}
            </span>
          </div>
        );
      },
    },
    {
      id: 'category',
      header: 'Store Category',
      cell: () => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-widest">
          Retail
        </span>
      ),
    },
  ], [handleToggle, isToggling]);

  const stats = statsRes?.data?.data || statsRes?.data || statsRes;
  const loading = storesLoading || statsLoading;
  const error = (storesError as any)?.response?.data?.message || (storesError as any)?.message || (storesRes?.data?.success === false ? storesRes?.data?.message : null);

  return (
    <div className="space-y-6 animate-fade-in relative z-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 pt-2 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Store Management</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Oversee all connected retail locations, subscriptions, and device health across the network.</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/super-admin/stores/create')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#1f1e35] text-white rounded-lg text-sm font-bold hover:bg-[#2a2845] transition-colors shadow-md"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Create Store</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard 
          title="Total Stores"
          value={stats?.totalStores || stores.length || "0"}
          icon={Store}
          iconColorClass="text-blue-600"
          iconBgClass="bg-blue-50"
          description="active"
          trend={{ value: "Live", isPositive: true, label: "Live active" }}
        />
        <StatsCard 
          title="Active Devices"
          value={stats?.activeDevices?.toLocaleString() || '0'}
          icon={Laptop2}
          iconColorClass="text-indigo-600"
          iconBgClass="bg-indigo-50"
          description="provisioned devices"
          trend={{ value: "Live", isPositive: true, label: "Live provisioned devices" }}
        />
        <StatsCard 
          title="Total Revenue"
          value={formatPKR(stats?.totalRevenue || 0)}
          icon={CreditCard}
          iconColorClass="text-emerald-600"
          iconBgClass="bg-emerald-50"
          description="total lifetime revenue"
          trend={{ value: "Total", isPositive: true, label: "Total lifetime revenue" }}
        />
        <StatsCard 
          title="Active Trials"
          value={stats?.activeTrials?.toLocaleString() || '0'}
          icon={Activity}
          iconColorClass="text-amber-600"
          iconBgClass="bg-amber-50"
          description="total trials"
          trend={{ value: "Current", isPositive: false, label: "Current total trials" }}
        />
      </div>

      {/* Tabs and Filters Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          <button className="px-5 py-2 bg-[#1f1e35] text-white text-sm font-bold rounded-lg shadow-sm">All Stores</button>
          <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">Active</button>
          <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors hidden sm:block">Suspended</button>
          <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors hidden sm:block">Trial</button>
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filters</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative z-0">
        {error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Unable to load stores</h3>
            <p className="text-slate-500 mt-2">{error}</p>
            <button onClick={() => refetchStores()} className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">Retry</button>
          </div>
        ) : (
          <DataTable
            data={stores}
            columns={storeColumns}
            isLoading={loading}
            showToolbar={false}
            showExport={false}
            showColumns={false}
          />
        )}
      </div>
      
      {/* Footer copyright */}
      <div className="pt-8 text-center text-xs font-medium text-slate-400">
        © 2026 Hybrid POS Systems Inc. Global Super Admin Terminal v4.0.0
      </div>

    </div>
  );
};

export default StoreOverview;
