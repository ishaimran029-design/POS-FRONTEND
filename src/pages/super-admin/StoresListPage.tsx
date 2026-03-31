import React, { useEffect, useState, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useStoreStore } from '../../store/useStoreStore';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Store,
    Users,
    Package
} from 'lucide-react';
import { DataTable } from '@/components/global-components/data-table';
import { showToast } from '../../utils/admin-toast';
import Pagination from '../../components/shared/admin/Pagination';

const StoresListPage: React.FC = () => {
    const { stores, isLoading, fetchStores, toggleStoreStatus } = useStoreStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const itemsPerPage = 5;

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    // Handle Search and Filter Reset
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredStores = useMemo(() => {
        return stores.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.city?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stores, searchTerm]);

    const storeColumns = useMemo<ColumnDef<any, any>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Store Identity',
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center group-hover:text-indigo-600 transition-all">
                        <Store size={22} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 tracking-tight leading-none mb-1.5">{row.original.name}</h3>
                        <p className="text-[11px] font-medium text-slate-400 truncate max-w-[200px]">{row.original.email || 'No Contact Defined'}</p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'isActive',
            header: 'Network Status',
            cell: ({ getValue }) => {
                const active = getValue<boolean>();
                return (
                    <button className={`flex items-center gap-2 px-4 py-1.5 rounded-full border font-bold text-[10px] uppercase tracking-widest transition-all ${
                        active ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-500/20 hover:bg-rose-100'
                    }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                        {active ? 'Online' : 'Offline'}
                    </button>
                );
            },
        },
        {
            id: 'resourceCount',
            header: 'Resource Count',
            cell: ({ row }) => (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-600">{row.original._count?.users || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Package size={14} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-600">{row.original._count?.products || 0}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorFn: (row) => `${row.city || 'Global'}, ${row.state || 'WW'}`,
            id: 'region',
            header: 'Region',
            cell: ({ getValue }) => <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{getValue<string>()}</span>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <button 
                    onClick={() => navigate(`/super-admin/stores/${row.original.id}`)}
                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                    Manage Node
                </button>
            ),
        },
    ], [navigate]);

    const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
    const paginatedStores = filteredStores.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        const success = await toggleStoreStatus(id, !currentStatus);
        if (success) {
            showToast(`Store ${!currentStatus ? 'Activated' : 'Deactivated'} Successfully`);
        } else {
            showToast('Failed to update store status', 'error');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stores Directory</h1>
                    <p className="text-slate-500 font-medium uppercase tracking-widest text-[11px] mt-1">Manage system branches and provisioned network nodes</p>
                </div>
                <button 
                    onClick={() => navigate('/super-admin/stores/create')}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#262255] text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20 hover:bg-[#312E81] transition-all active:scale-95"
                >
                    <Plus size={18} />
                    Provision New Store
                </button>
            </div>

            {/* Content Card with Filters and Table */}
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Filter by name, email or city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#2563EB]/40 focus:ring-4 focus:ring-[#2563EB]/5 transition-all outline-none font-medium text-slate-900"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Nodes</span>
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm">{filteredStores.length}</div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[450px]">
                    <DataTable
                        data={filteredStores}
                        columns={storeColumns}
                        isLoading={isLoading}
                        showToolbar={false}
                        showExport={false}
                        showColumns={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoresListPage;
