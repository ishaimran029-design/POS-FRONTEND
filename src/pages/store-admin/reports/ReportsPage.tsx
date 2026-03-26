import { useState, useEffect } from "react";
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import ReportsHeader from "@/components/store-admin/Reports/ReportsHeader";
import StatsCards from "@/components/global-components/StatsCards";
import ReportsCharts from "@/components/store-admin/Reports/ReportsCharts";
import TopPerformingProducts from "@/components/store-admin/Reports/TopPerformingProducts";
import { getStoreDashboardData, getInventoryReport } from "@/api/reports.api";
import { AlertCircle, FileText } from "lucide-react";
import { formatCurrency } from "@/utils/format";

const ReportsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'sales' | 'inventory'>('sales');
    const [dateRange, setDateRange] = useState('Month');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const calculateDateRange = (range: string) => {
        const end = new Date();
        const start = new Date();
        if (range === 'Today') {
            start.setHours(0, 0, 0, 0);
        } else if (range === 'This Week') {
            const day = start.getDay();
            const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
            start.setDate(diff);
            start.setHours(0, 0, 0, 0);
        } else if (range === 'Month') {
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
        }
        return {
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0]
        };
    };

    useEffect(() => {
        const loadReport = async () => {
            setLoading(true);
            setError(null);
            try {
                if (activeTab === 'sales') {
                    const { startDate, endDate } = calculateDateRange(dateRange);
                    const res = await getStoreDashboardData({ startDate, endDate });
                    if (res.data.success) {
                        setData(res.data.data);
                    } else {
                        throw new Error(res.data.message || 'Failed to load report');
                    }
                } else {
                    const res = await getInventoryReport();
                    if (res.data.success) {
                        setData(res.data.data);
                    } else {
                        throw new Error(res.data.message || 'Failed to load report');
                    }
                }
            } catch (err: any) {
                console.error('Failed to load report data', err);
                setError(err.message || 'Failed to load report');
            } finally {
                setLoading(false);
            }
        };
        void loadReport();
    }, [activeTab, dateRange]);

    return (
        <div className="min-h-screen bg-[#F7F9FC] transition-colors duration-500 flex text-slate-900">
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
                    <ReportsHeader 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                    />

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm text-center">
                            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Failed to load data</h3>
                            <p className="text-slate-500 text-sm">{error}</p>
                        </div>
                    ) : activeTab === 'sales' && data ? (
                        <>
                            {(() => {
                                const reportsStatsData = [
                                    { name: 'Total Revenue', stat: formatCurrency(data.summary?.totalRevenue || 0) },
                                    { name: 'Transactions', stat: (data.summary?.totalTransactions || 0).toLocaleString() },
                                    { name: 'Avg. Order Value', stat: formatCurrency(data.summary?.averageTicketSize || 0) },
                                    { name: 'Total Tax', stat: formatCurrency(data.summary?.totalTax || 0) },
                                    { name: 'Discounts', stat: formatCurrency(data.summary?.totalDiscount || 0) },
                                ];
                                return <StatsCards data={reportsStatsData} />;
                            })()}
                            <ReportsCharts charts={data.charts || {}} />
                            <TopPerformingProducts products={data.topProducts || []} />
                        </>
                    ) : activeTab === 'inventory' && data ? (
                        <div className="bg-white p-20 rounded-[32px] border border-slate-100 shadow-sm text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4 border border-slate-100">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Inventory Report Loaded</h3>
                            <p className="text-[10px] text-slate-400 font-bold max-w-xs mx-auto mt-2 uppercase tracking-widest leading-loose">
                                Low Stock: {data.summary?.lowStockCount}, Out of Stock: {data.summary?.outOfStockCount}
                            </p>
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    );
};

export default ReportsPage;
