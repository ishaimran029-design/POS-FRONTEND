import React, { useEffect, useState, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useStoreStore } from '../../store/useStoreStore';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search
} from 'lucide-react';
import { DataTable } from '@/components/global-components/data-table';
import { showToast } from '../../utils/admin-toast';

const StoresListPage: React.FC = () => {
    const { stores, isLoading, fetchStores, toggleStoreStatus } = useStoreStore();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const filteredStores = useMemo(() => {
        return stores.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.city?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stores, searchTerm]);

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        const success = await toggleStoreStatus(id, !currentStatus);
        if (success) {
            showToast(`Status updated successfully`);
        } else {
            showToast('Failed to update store status', 'error');
        }
    };

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
            accessorKey: 'isActive',
            header: 'Status',
            cell: ({ getValue, row }) => {
                const active = getValue<boolean>();
                return (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleToggleStatus(row.original.id, active)}
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
    ], [handleToggleStatus]);

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
