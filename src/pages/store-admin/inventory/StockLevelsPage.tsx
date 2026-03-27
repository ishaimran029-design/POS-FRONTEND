import { useState } from 'react';
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import StockOverviewCards from '@/components/store-admin/StockOverviewCards';
import StockTable from '@/components/store-admin/StockTable';
import { useProducts } from '@/hooks/useProducts';
import { useInventory } from '@/hooks/useInventory';
import { Search, Download, Plus } from 'lucide-react';

const StockLevelsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    // React Query Hooks
    const { data: productsDataRes, isLoading: productsLoading } = useProducts();
    const { data: inventoryDataRes, isLoading: inventoryLoading } = useInventory();

    const loading = productsLoading || inventoryLoading;

    // Process data
    const productsData = (productsDataRes as any)?.data || (Array.isArray(productsDataRes) ? productsDataRes : []);
    const inventoryData = (inventoryDataRes as any)?.data || (Array.isArray(inventoryDataRes) ? inventoryDataRes : []);

    // Map inventory by productId
    const inventoryMap = inventoryData.reduce((acc: any, inv: any) => {
        acc[inv.productId] = inv.totalQuantity || inv.stock || 0;
        return acc;
    }, {});
    
    const inventory = productsData.map((item: any) => {
        const stock = inventoryMap[item.id] || 0;
        return {
            id: item.id || item._id,
            productName: item.name || item.productName || 'Unnamed Product',
            sku: item.sku || 'N/A',
            currentStock: stock,
            reorderLevel: item.reorderLevel || 10,
            category: typeof item.category === 'object' ? item.category?.name : item.category || 'General',
            image: item.image || item.imageUrl
        };
    });

    const stats = {
        totalItems: inventory.length,
        lowStockItems: inventory.filter((i: any) => i.currentStock > 0 && i.currentStock <= i.reorderLevel).length,
        outOfStockItems: inventory.filter((i: any) => i.currentStock === 0).length
    };

    const filteredInventory = (() => {
        let result = [...inventory];

        // Apply Search
        if (searchQuery) {
            result = result.filter(item => 
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply Status Filter
        if (activeFilter === 'Low') {
            result = result.filter(item => item.currentStock > 0 && item.currentStock <= item.reorderLevel);
        } else if (activeFilter === 'Out') {
            result = result.filter(item => item.currentStock === 0);
        } else if (activeFilter === 'OK') {
            result = result.filter(item => item.currentStock > item.reorderLevel);
        }

        return result;
    })();

    return (
        <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
                <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 md:p-8 lg:p-10 w-full animate-fade-in space-y-8">
                    {/* Header Area */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                <span>Inventory</span>
                                <span>/</span>
                                <span className="text-[#2563EB]">Stock Levels</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Stock Levels</h1>
                        </div>
                        <div className="flex items-center gap-3">
                             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 hover:border-[#2563EB]/30 hover:text-[#2563EB] transition-all">
                                <Download size={18} />
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1B4B] rounded-xl text-white font-bold text-sm shadow-lg shadow-[#1E1B4B]/20 hover:bg-[#2563EB] transition-all border border-[#1E1B4B]/20">
                                <Plus size={18} />
                                Adjust Stock
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <StockOverviewCards stats={stats} loading={loading} />

                    {/* Filters & Table Section */}
                    <div className="space-y-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-[20px] shadow-sm border border-gray-100">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by product name or SKU..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 focus:border-[#2563EB]/30 outline-none transition-all font-medium text-slate-700"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Status Filter Chips */}
                            <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
                                {['All', 'OK', 'Low', 'Out'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                            activeFilter === filter
                                                ? 'bg-white text-[#2563EB] shadow-sm border border-[#2563EB]/10'
                                                : 'text-slate-400 hover:text-[#2563EB]'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <StockTable items={filteredInventory} loading={loading} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StockLevelsPage;
