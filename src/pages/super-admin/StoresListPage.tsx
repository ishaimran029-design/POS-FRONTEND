import React, { useEffect, useState, useMemo } from 'react';
import { useStoreStore } from '../../store/useStoreStore';
import { useNavigate } from 'react-router-dom';
import { 
    Plus, 
    Search, 
    Store, 
    Users, 
    Package
} from 'lucide-react';
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
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-5">Store Identity</th>
                                <th className="px-8 py-5">Network Status</th>
                                <th className="px-8 py-5">Resource Count</th>
                                <th className="px-8 py-5">Region</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consulting Node Registry...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredStores.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest opacity-50">No matching nodes found in the network.</p>
                                    </td>
                                </tr>
                            ) : paginatedStores.map((store) => (
                                <tr key={store.id} className="group hover:bg-[#2563EB]/5 transition-all text-sm">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                                                <Store size={22} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 tracking-tight leading-none mb-1.5">{store.name}</h3>
                                                <p className="text-[11px] font-medium text-slate-400 truncate max-w-[200px]">{store.email || 'No Contact Defined'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <button 
                                            onClick={() => handleToggleStatus(store.id, store.isActive)}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border font-bold text-[10px] uppercase tracking-widest transition-all ${
                                            store.isActive 
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20 hover:bg-emerald-100' 
                                                : 'bg-rose-50 text-rose-600 border-rose-500/20 hover:bg-rose-100'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${store.isActive ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                                            {store.isActive ? 'Online' : 'Offline'}
                                        </button>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Users size={14} className="text-slate-300" />
                                                <span className="text-xs font-bold text-slate-600">{store._count?.users || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Package size={14} className="text-slate-300" />
                                                <span className="text-xs font-bold text-slate-600">{store._count?.products || 0}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{store.city || 'Global'}, {store.state || 'WW'}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => navigate(`/super-admin/stores/${store.id}`)}
                                            className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                        >
                                            Manage Node
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Standardized Pagination Implementation */}
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default StoresListPage;
