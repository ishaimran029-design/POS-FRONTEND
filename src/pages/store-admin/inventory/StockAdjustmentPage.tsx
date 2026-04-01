import { useState } from 'react';
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import StockAdjustmentForm from '@/components/store-admin/StockAdjustmentForm';
import StockAdjustmentTable from '@/components/store-admin/StockAdjustmentTable';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/products.api';
import { fetchInventoryLogs } from '@/api/inventory.api';
import { getAuditLogs } from '@/api/reports.api';

const StockAdjustmentPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // React Query Hooks
    const { data: productsRes } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(),
    });
    const { data: logsRes } = useQuery({
        queryKey: ['inventory-logs', { limit: 40 }],
        queryFn: () => fetchInventoryLogs({ limit: 40 }),
    });
    const { data: auditLogsRes } = useQuery({
        queryKey: ['audit-logs', { limit: 100 }],
        queryFn: () => getAuditLogs({ limit: 100 }),
    });

    const products = (productsRes as any)?.data || (Array.isArray(productsRes) ? productsRes : []);
    const logs = (logsRes as any)?.data || (Array.isArray(logsRes) ? logsRes : []);
    const auditLogs = (auditLogsRes as any)?.data?.logs || (Array.isArray(auditLogsRes?.logs) ? auditLogsRes.logs : []);

    // Merge Audit Logs into Inventory Logs to get User Attribution
    const enrichedLogs = logs.map((log: any) => {
        // 1. Try to find the direct AuditLog for this inventory log
        let audit = auditLogs.find((a: any) => a.entity === 'inventory_logs' && a.entityId === log.id);

        // 2. If not found, check if it's a SALE and find the sale's AuditLog
        if (!audit && log.changeType === 'SALE' && log.referenceId) {
            audit = auditLogs.find((a: any) => a.entity === 'sales' && a.entityId === log.referenceId);
        }

        // 3. If still not found, check if it's an OPENING_STOCK and find the product's AuditLog
        if (!audit && log.changeType === 'OPENING_STOCK') {
            audit = auditLogs.find((a: any) => a.entity === 'products' && a.entityId === log.productId && a.action === 'CREATE_PRODUCT');
        }

        return {
            ...log,
            user: audit?.user || { name: 'System', role: 'SYSTEM' }
        };
    });

    const handleSuccess = () => {
        // React Query handles invalidation in the mutation hook onSuccess
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
                        <StockAdjustmentTable adjustments={enrichedLogs} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StockAdjustmentPage;
