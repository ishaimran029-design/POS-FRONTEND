import { useState } from "react";
import { Download, Plus } from "lucide-react";
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import SalesFilters from "@/components/store-admin/SalesFilters";
import SalesTable from "@/components/store-admin/SalesTable";
import SalesSummaryCards from "@/components/store-admin/SalesHistory/SalesSummaryCards";
import ChartAreaAxes from "@/components/global-components/chart-line-dots";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardSummary } from "@/api/dashboard.api";
import { getSalesTransactions, cancelSale, refundSale } from "@/api/sales.api";

const SalesHistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Filters state
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All Status");
    const [paymentMethod, setPaymentMethod] = useState("All Methods");
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const params: any = {
        page,
        limit,
        startDate: dateRange.start,
        endDate: dateRange.end
    };

    if (search) params.search = search;
    if (status !== 'All Status') params.paymentStatus = status;
    if (paymentMethod !== 'All Methods') params.paymentMethod = paymentMethod;

    const queryClient = useQueryClient();

    // React Query Hooks
    const { data: salesDataRes, isLoading: salesLoading } = useQuery({
        queryKey: ['sales', params],
        queryFn: () => getSalesTransactions(params),
    });
    const { data: dashboardDataRes, isLoading: summaryLoading } = useQuery({
        queryKey: ['dashboard', 'summary', { startDate: dateRange.start, endDate: dateRange.end }],
        queryFn: () => getDashboardSummary({
            startDate: dateRange.start,
            endDate: dateRange.end
        }),
    });

    const transactions = salesDataRes?.data || (Array.isArray(salesDataRes) ? salesDataRes : []);
    const total = salesDataRes?.total || transactions.length;

    const reportData = dashboardDataRes?.data || dashboardDataRes;

    const summary = {
        totalAmount: Number(reportData?.summary?.totalRevenue || 0),
        completedCount: Number(reportData?.summary?.totalTransactions || 0),
        failedCount: Number(reportData?.summary?.failedTransactions || 0),
        refundedCount: Number(reportData?.summary?.totalRefunds || 0),
        avgTicket: Number(reportData?.summary?.averageTicketSize || 0)
    };

    const chartsData = reportData?.charts?.revenueByDate?.map((d: any) => ({
        date: d.date,
        revenue: Number(d.revenue || 0)
    })) || [];

    const loading = salesLoading;

    return (
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-950 transition-colors duration-500 flex text-slate-900 dark:text-slate-100">
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
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales History</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage and track all transaction logs</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-[#1E1B4B]/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1E1B4B] hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                                <Download size={16} className="text-[#1E1B4B]" />
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-400/20 border border-blue-500">
                                <Plus size={16} />
                                New Sale
                            </button>
                        </div>
                    </div>

                    {/* Stats & Charts Summary */}
                    <div className="space-y-8">
                        <SalesSummaryCards data={summary} loading={summaryLoading} />

                        {/* Revenue Trend Chart */}
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Revenue Trend</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily sales performance for selected period</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ChartAreaAxes data={chartsData.map((d: any) => ({ date: d.date, sales: d.revenue }))} className="h-[300px]" noWrapper />
                            </div>
                        </div>
                    </div>

                    {/* Filters & Detailed View */}
                    <div className="space-y-8 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Transaction Ledger</h2>
                            <span className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {total} Entries Found
                            </span>
                        </div>

                        <SalesFilters
                            search={search}
                            onSearchChange={setSearch}
                            status={status}
                            onStatusChange={setStatus}
                            paymentMethod={paymentMethod}
                            onPaymentMethodChange={setPaymentMethod}
                            dateRange={dateRange}
                            onDateRangeChange={(start: string, end: string) => setDateRange({ start, end })}
                        />

                        <SalesTable
                            transactions={transactions}
                            loading={loading}
                            page={page}
                            total={total}
                            limit={limit}
                            onPageChange={setPage}
                            onCancel={async (id) => {
                                if (window.confirm("Cancel this sale?")) {
                                    await cancelSale(id, "Cancelled by admin");
                                    queryClient.invalidateQueries({ queryKey: ['sales'] });
                                }
                            }}
                            onRefund={async (id) => {
                                if (window.confirm("Refund this sale?")) {
                                    await refundSale(id, "Refunded by admin");
                                    queryClient.invalidateQueries({ queryKey: ['sales'] });
                                }
                            }}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SalesHistoryPage;
