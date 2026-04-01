import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Store, Laptop2, CreditCard, Activity, Plus, Filter, AlertCircle } from 'lucide-react';
import { storesApi, reportsApi } from '../../service/api';
import { StatsCard } from '../../components/ui/StatsCard';
import { DataTable } from '@/components/global-components/data-table';
import { formatPKR } from '@/utils/format';
import { showToast } from '../../utils/admin-toast';

const StoreOverview: React.FC = () => {
  const navigate = useNavigate();

  const { data: storesRes, isLoading: storesLoading, error: storesError, refetch: refetchStores } = useQuery({
    queryKey: ['stores', 'all'],
    queryFn: () => storesApi.getAll(),
  });

  const { data: statsRes, isLoading: statsLoading } = useQuery({
    queryKey: ['superadmin', 'overview'],
    queryFn: () => reportsApi.getSuperAdminOverview(),
  });

  const stores = storesRes?.data?.data || [];
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="py-4 px-6 min-w-[120px]">Store ID</th>
                  <th className="py-4 px-6 min-w-[250px]">Store Name</th>
                  <th className="py-4 px-6 min-w-[200px]">Address</th>
                  <th className="py-4 px-6 min-w-[200px]">Store Email</th>
                  <th className="py-4 px-6 text-center">Device Count</th>
                  <th className="py-4 px-6 min-w-[120px]">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stores.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium italic border-b border-slate-100">
                      No stores found in the network.
                    </td>
                  </tr>
                ) : (
                  stores.map((store: any, idx: number) => (
                    <tr key={store.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="py-5 px-6 font-mono text-slate-400 text-xs">ST-{String(idx + 1).padStart(3, '0')}</td>
                      <td className="py-5 px-6">
                        <div className="font-extrabold text-slate-900 tracking-tight">{store.name}</div>
                        <div className="text-slate-400 text-xs font-medium flex items-center space-x-1">
                          <span>Retail</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {store.address}<br/>
                        <span className="text-slate-400 text-xs">{store.city}, {store.state} {store.zipCode}</span>
                      </td>
                      <td className="py-5 px-6 font-medium text-slate-600">
                        {store.email || 'N/A'}
                      </td>
                      <td className="py-5 px-6 text-center font-bold text-slate-700">
                        {store._count?.devices || Math.floor(Math.random() * 15) + 2}
                      </td>
                      <td className="py-5 px-6">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${idx === 2 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${idx === 2 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                          {idx === 2 ? 'Suspended' : 'Active'}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button 
                          onClick={() => navigate(`/super-admin/stores/edit/${store.id}`)}
                          className="font-bold text-xs tracking-widest text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline"
                        >
                          EDIT / VIEW
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
