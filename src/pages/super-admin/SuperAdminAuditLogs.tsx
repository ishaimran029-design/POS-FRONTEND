import React, { useState, useEffect, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../../service/api';
import { useStoreStore } from '../../store/useStoreStore';
import { 
    User,
    Database,
    Zap,
    AlertCircle,
    Target,
    Clock,
    RefreshCcw,
    X
} from 'lucide-react';
import { format } from 'date-fns';
import Pagination from '../../components/shared/admin/Pagination';
import { DataTable } from '@/components/global-components/data-table';

const ENTITIES = ['USER', 'STORE', 'PRODUCT', 'DEVICE', 'SALE', 'CATEGORY', 'STOCK'];
const ACTIONS = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'STOCK_ADJUSTMENT'];

const SuperAdminAuditLogs: React.FC = () => {
    // 1. Filter & Pagination State
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [entity, setEntity] = useState('');
    const [action, setAction] = useState('');
    const [storeId, setStoreId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { stores, fetchStores } = useStoreStore();

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    // 2. Data Fetching
    const { data: logsRes, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['superadmin-audit-logs', page, entity, action, storeId, startDate, endDate],
        queryFn: () => reportsApi.getAuditLogs({ 
            page, 
            limit, 
            entity: entity || undefined, 
            action: action || undefined, 
            storeId: storeId || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined
        }),
    });

    const logs = logsRes?.data?.data?.logs || logsRes?.data?.logs || [];
    const pagination = logsRes?.data?.data?.pagination || logsRes?.data?.pagination || { totalPages: 1 };

    // 3. Helpers
    const resetFilters = () => {
        setEntity('');
        setAction('');
        setStoreId('');
        setStartDate('');
        setEndDate('');
        setPage(1);
    };

    const getActionColor = (action: string) => {
        if (action.includes('CREATE')) return 'bg-emerald-50 text-emerald-600 border-emerald-500/20';
        if (action.includes('DELETE')) return 'bg-rose-50 text-rose-600 border-rose-500/20';
        if (action.includes('UPDATE')) return 'bg-amber-50 text-amber-600 border-amber-500/20';
        if (action.includes('LOGIN')) return 'bg-indigo-50 text-indigo-600 border-indigo-500/20';
        return 'bg-slate-50 text-slate-600 border-slate-500/10';
    };

    const getEntityIcon = (entity: string) => {
        switch(entity) {
            case 'USER': return <User size={14} />;
            case 'PRODUCT': return <Zap size={14} />;
            case 'STORE': return <Database size={14} />;
            default: return <Target size={14} />;
        }
    };

    const auditColumns = useMemo<ColumnDef<any, any>[]>(() => [
        {
            accessorFn: (row) => row.createdAt,
            id: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
                return (
                    <div className="flex items-center gap-3">
                        <Clock size={14} className="text-slate-300" />
                        <div>
                            <p className="font-bold text-slate-900 tracking-tight leading-none">{date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</p>
                            <p className="text-[10px] font-medium text-slate-400 mt-1">{date.toLocaleTimeString('en-US')}</p>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorFn: (row) => row.user?.name || 'System',
            id: 'initiator',
            header: 'Initiator',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-[10px]">
                        {(row.original.user?.name || 'S')[0]}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 leading-none mb-1">{row.original.user?.name || 'System'}</p>
                        <p className="text-[10px] font-medium text-indigo-500 uppercase tracking-wide">{row.original.userRole || 'Service'}</p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'action',
            header: 'Operation',
            cell: ({ getValue }) => {
                const action = getValue<string>();
                const isCreate = action.includes('CREATE');
                const isDelete = action.includes('DELETE');
                const isUpdate = action.includes('UPDATE');
                const isLogin = action.includes('LOGIN');
                return (
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${
                        isCreate ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20' :
                        isDelete ? 'bg-rose-50 text-rose-600 border-rose-500/20' :
                        isUpdate ? 'bg-amber-50 text-amber-600 border-amber-500/20' :
                        'bg-indigo-50 text-indigo-600 border-indigo-500/20'
                    }`}>
                        {action.replace(/_/g, ' ')}
                    </div>
                );
            },
        },
        {
            id: 'entity',
            header: 'Target Entity',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-300">
                        {getEntityIcon(row.original.entity)}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-tight leading-none mb-1">{row.original.entity}</p>
                        <p className="text-[9px] font-medium text-slate-400 font-mono italic truncate max-w-[100px]">{row.original.entityId}</p>
                    </div>
                </div>
            ),
        },
        {
            accessorFn: (row) => row.ipAddress || 'Internal',
            id: 'identifier',
            header: 'Identifier',
            cell: ({ getValue }) => <span className="text-right font-mono text-[10px] text-slate-400">{getValue<string>()}</span>,
        },
    ], [getEntityIcon]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Audit Logs</h1>
                    <p className="text-slate-500 font-medium uppercase tracking-widest text-[11px] mt-1">Cross-network event tracking and security registry</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => refetch()}
                        disabled={isRefetching}
                        className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:border-indigo-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={`${isRefetching ? 'animate-spin' : ''} transition-transform`} />
                        Refresh Logs
                    </button>
                    {(entity || action || storeId || startDate || endDate) && (
                        <button 
                            onClick={resetFilters}
                            className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-[11px] font-bold uppercase tracking-widest border border-rose-100 hover:bg-rose-100 transition-all active:scale-95"
                        >
                            <X size={14} />
                            Reset Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Advanced Filters Card */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex flex-wrap items-end gap-6">
                <div className="flex-1 min-w-[180px] space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Domain</label>
                    <select 
                        value={entity} 
                        onChange={(e) => {setEntity(e.target.value); setPage(1);}}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500/40 outline-none transition-all cursor-pointer"
                    >
                        <option value="">All Domains</option>
                        {ENTITIES.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                <div className="flex-1 min-w-[180px] space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Action</label>
                    <select 
                        value={action} 
                        onChange={(e) => {setAction(e.target.value); setPage(1);}}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500/40 outline-none transition-all cursor-pointer"
                    >
                        <option value="">All Actions</option>
                        {ACTIONS.map(a => <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>)}
                    </select>
                </div>

                <div className="flex-1 min-w-[180px] space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Store Node</label>
                    <select 
                        value={storeId} 
                        onChange={(e) => {setStoreId(e.target.value); setPage(1);}}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500/40 outline-none transition-all cursor-pointer"
                    >
                        <option value="">Global Network</option>
                        {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>

                <div className="flex-[1.5] min-w-[280px] space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date Range</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => {setStartDate(e.target.value); setPage(1);}}
                            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500/40 outline-none transition-all"
                        />
                        <span className="text-slate-300">—</span>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => {setEndDate(e.target.value); setPage(1);}}
                            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500/40 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[400px] relative">
                <DataTable
                    data={logs}
                    columns={auditColumns}
                    isLoading={isLoading}
                    manualPagination={true}
                    pageCount={pagination.totalPages}
                    pageIndex={page}
                    onPageChange={setPage}
                    totalItems={pagination.totalItems}
                    showToolbar={false}
                    showExport={false}
                    showColumns={false}
                />
                {isRefetching && <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] pointer-events-none" />}
            </div>
        </div>
    );
};

export default SuperAdminAuditLogs;
