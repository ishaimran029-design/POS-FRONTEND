import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { reportsApi } from '../../service/api';
import { storesApi } from '../../service/api';
import DashboardStats from '@/components/global-components/DashboardStats';
import { DataTable } from '@/components/global-components/data-table';
import { 
    RefreshCcw, 
    Shield, 
    ChevronRight,
    AlertTriangle
} from 'lucide-react';
import { showToast } from '../../utils/admin-toast';
import MonthlyActivityChart from '@/components/global-components/monthly-activity-chart';

const SuperAdminDashboard: React.FC = () => {
    const { data: overviewRes, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['superadmin-overview'],
        queryFn: () => reportsApi.getSuperAdminOverview(),
    });

    const statsRaw = overviewRes?.data?.data || overviewRes?.data || {};
    
    // Fetch stores for dashboard table
    const queryClient = useQueryClient();
    const { data: storesRes } = useQuery({
        queryKey: ['superadmin-stores'],
        queryFn: async () => {
            const res = await storesApi.getAll();
            return res.data?.data ?? res.data;
        },
    });

    const stores = storesRes || [];

    const toggleStore = async (id: string, currentStatus: boolean) => {
        try {
            await storesApi.update(id, { isActive: !currentStatus });
            queryClient.invalidateQueries({ queryKey: ['superadmin-stores'] });
            queryClient.invalidateQueries({ queryKey: ['superadmin-overview'] });
            showToast(`Status updated successfully`);
        } catch (e) {
            console.error('Failed to toggle store status', e);
            showToast('Protocol Update Failed', 'error');
        }
    };

    const tableData = useMemo(() => stores, [stores]);

    const tableColumns = useMemo<ColumnDef<any, any>[]>(
        () => [
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
                id: 'city',
                header: 'Store City',
                cell: ({ row }) => (
                    <span className="font-medium text-slate-600">
                        {row.original.city || row.original.store?.city || 'Global'}
                    </span>
                ),
            },
            {
                id: 'region',
                header: 'Region',
                cell: ({ row }) => (
                    <span className="font-medium text-slate-400 uppercase tracking-widest text-[10px]">
                        {row.original.state || row.original.region || row.original.store?.state || 'National'}
                    </span>
                ),
            },
            {
                id: 'owner',
                header: 'Owner Name',
                cell: ({ row }) => (
                    <span className="font-medium text-slate-600">
                        {row.original.owner?.name || row.original.ownerName || row.original.contactName || 'Main Admin'}
                    </span>
                ),
            },
            {
                id: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const isActive = !!row.original.isActive || row.original.status === 'ACTIVE';
                    const id = row.original.id || row.original._id || row.original.storeId;
                    return (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleStore(id, isActive)}
                                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    isActive ? 'bg-emerald-500' : 'bg-slate-200'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        isActive ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    );
                }
            },
            {
                id: 'category',
                header: 'Store Category',
                cell: ({ row }) => (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-widest">
                        {row.original.category?.name || row.original.category || 'Retail'}
                    </span>
                )
            }
        ],
        [stores]
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 animate-pulse">
                <div className="w-16 h-16 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-slate-400 font-black text-[10px] uppercase tracking-[4px]">Synchronizing Neural Network...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-rose-50 rounded-[3rem] border border-rose-100 text-rose-600 text-center space-y-4">
                <AlertTriangle size={48} />
                <h3 className="text-xl font-black uppercase tracking-tight">Telemetry Retrieval Offline</h3>
                <p className="text-sm font-bold opacity-70">Failed to establish connection with global data centers.</p>
                <button 
                    onClick={() => refetch()}
                    className="px-8 py-3 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-rose-700 transition-all active:scale-95"
                >
                    Retry Protocol
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Infrastructure Overview</h1>
                    <p className="text-slate-500 font-medium uppercase tracking-widest text-[11px] mt-1">Global SaaS Network Status & Performance</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => refetch()}
                        disabled={isRefetching}
                        className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:border-indigo-200 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={`${isRefetching ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform`} />
                        Refetch Data
                    </button>
                </div>
            </div>

            {/* Main Metrics */}
            <div className="w-full">
                <DashboardStats 
                    totalStores={statsRaw.totalStores}
                    totalRevenue={statsRaw.totalRevenue}
                    activeStores={statsRaw.activeStores || statsRaw.activeStoreCount}
                    totalDevices={statsRaw.activeDevices || statsRaw.totalDevices}
                />
            </div>

            {/* Monthly Activity Chart */}
            <MonthlyActivityChart />

            {/* Sample Dashboard Table */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm transition-all dark:bg-slate-950 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Dashboard Preview Table</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Table layout is ready for dynamic dashboard data.</p>
                    </div>
                </div>
                <DataTable data={tableData} columns={tableColumns} showToolbar={false} />
            </div>

            {/* Global Infrastructure Status - Standard SaaS Style Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm flex flex-col gap-6 group hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform Master Control</h2>
                            <p className="text-xs text-slate-400 font-medium font-bold uppercase tracking-widest mt-0.5">V4.0 Core Infrastructure</p>
                        </div>
                    </div>
                    <p className="text-slate-500 font-normal leading-relaxed text-sm">
                        Welcome to the central command unit. Monitor cross-region hardware health, provision new store nodes, and oversee the global staff registry from a single point of failure-protected interface.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-widest">System Stable</span>
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-bold uppercase tracking-widest">99.9% Uptime</span>
                    </div>
                </div>

                <div className="bg-[#1e1b4b] p-8 rounded-[2rem] shadow-xl text-white flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all" />
                    <div>
                        <h3 className="text-lg font-bold text-indigo-200 tracking-tight uppercase tracking-widest text-xs mb-4">Network Growth</h3>
                        <p className="text-3xl font-bold leading-tight">Expansion Protocol Active</p>
                        <p className="text-indigo-300 font-medium text-sm mt-4 opacity-80">
                            Predictive analytics suggest a 14% increase in retail hardware deployments across the EMEA region by Q3. Ensure provisioning pools are adequate.
                        </p>
                    </div>
                    <div className="pt-8 flex items-center gap-2 text-indigo-200 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                        View Deployment Roadmap <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
