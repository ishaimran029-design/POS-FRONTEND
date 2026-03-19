import { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import SalesFilters from "@/components/store-admin/SalesHistory/SalesFilters";
import SalesHistoryTable from "@/components/store-admin/SalesHistory/SalesHistoryTable";
import SalesSummaryCards from "@/components/store-admin/SalesHistory/SalesSummaryCards";

import { getSalesTransactions } from "@/api/sales.api";
import { getSalesReport } from "@/api/reports.api";

const SalesHistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);
    
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
    const [total, setTotal] = useState(0);

    // Summary data state
    const [summary, setSummary] = useState({
        totalAmount: 0,
        completedCount: 0,
        failedCount: 0
    });

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const params: any = {
                page,
                limit,
                startDate: dateRange.start,
                endDate: dateRange.end
            };
            
            if (search) params.search = search;
            if (status !== 'All Status') params.paymentStatus = status;
            if (paymentMethod !== 'All Methods') params.paymentMethod = paymentMethod;
            
            const res = await getSalesTransactions(params);
            const data = res.data?.data || (Array.isArray(res.data) ? res.data : []);
            setTransactions(data);
            setTotal(res.data?.total || data.length);
        } catch (error) {
            console.error("Failed to fetch sales transactions:", error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, status, paymentMethod, dateRange]);

    const fetchAnalytics = useCallback(async () => {
        try {
            setSummaryLoading(true);
            const res = await getSalesReport({
                startDate: dateRange.start,
                endDate: dateRange.end
            });
            
            if (res.data?.data?.summary || res.data?.summary) {
                const s = res.data.summary || res.data.data.summary;
                setSummary({
                    totalAmount: Number(s.totalRevenue || 0),
                    completedCount: Number(s.totalTransactions || 0),
                    failedCount: 0 // Backend currently filters out cancelled/failed in report
                });
            }
        } catch (error) {
            console.error("Failed to fetch sales analytics:", error);
        } finally {
            setSummaryLoading(false);
        }
    }, [dateRange]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

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

                    {/* Filters Section */}
                    <SalesFilters 
                        search={search}
                        onSearchChange={setSearch}
                        status={status}
                        onStatusChange={setStatus}
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        dateRange={dateRange}
                        onDateRangeChange={(start, end) => setDateRange({ start, end })}
                    />

                    {/* Table Section */}
                    <SalesHistoryTable 
                        transactions={transactions}
                        loading={loading}
                        page={page}
                        total={total}
                        limit={limit}
                        onPageChange={setPage}
                    />

                    {/* Summary Section */}
                    <SalesSummaryCards data={summary} loading={summaryLoading} />
                </main>
            </div>
        </div>
    );
};

export default SalesHistoryPage;
