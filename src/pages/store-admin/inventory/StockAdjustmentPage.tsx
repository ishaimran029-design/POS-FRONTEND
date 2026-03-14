import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import StockAdjustmentForm from '@/components/store-admin/StockAdjustmentForm';
import StockAdjustmentTable from '@/components/store-admin/StockAdjustmentTable';
import { fetchProducts } from '@/api/products.api';
import { fetchInventoryLogs } from '@/api/inventory.api';

const StockAdjustmentPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const loadData = useCallback(async () => {
        try {
            const [prodRes, logRes] = await Promise.all([
                fetchProducts(),
                fetchInventoryLogs({ limit: 20 })
            ]);
            
            setProducts(prodRes.data?.data || (Array.isArray(prodRes.data) ? prodRes.data : []));
            setLogs(logRes.data?.data || (Array.isArray(logRes.data) ? logRes.data : []));
        } catch (error) {
            console.error('Failed to load stock adjustment data:', error);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData, refreshTrigger]);

    const handleSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

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

                <main className="p-4 md:p-8 lg:p-10 w-full animate-fade-in space-y-10">
                    {/* Header Area */}
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                            <span>Inventory</span>
                            <span>/</span>
                            <span className="text-blue-600">Stock Adjustment</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Stock Adjustment</h1>
                        <p className="text-gray-500 font-bold">Manage inventory adjustments and reasons.</p>
                    </div>

                    <div className="space-y-12">
                        {/* Adjustment Form */}
                        <div className="max-w-5xl">
                            <StockAdjustmentForm products={products} onSuccess={handleSuccess} />
                        </div>

                        {/* Recent Adjustments Table */}
                        <StockAdjustmentTable adjustments={logs} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StockAdjustmentPage;
