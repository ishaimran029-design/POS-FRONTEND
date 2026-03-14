import { useState } from "react";
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import ReportsHeader from "@/components/store-admin/Reports/ReportsHeader";
import ReportsSummaryCards from "@/components/store-admin/Reports/ReportsSummaryCards";
import ReportsCharts from "@/components/store-admin/Reports/ReportsCharts";
import TopPerformingProducts from "@/components/store-admin/Reports/TopPerformingProducts";

const ReportsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'sales' | 'inventory'>('sales');
    const [dateRange, setDateRange] = useState('Month');

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

                    {activeTab === 'sales' ? (
                        <>
                            <ReportsSummaryCards />
                            <ReportsCharts />
                            <TopPerformingProducts />
                        </>
                    ) : (
                        <div className="bg-white p-20 rounded-[32px] border border-slate-100 shadow-sm text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4 border border-slate-100">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Inventory Report Coming Soon</h3>
                            <p className="text-[10px] text-slate-400 font-bold max-w-xs mx-auto mt-2 uppercase tracking-widest leading-loose">
                                We're currently building advanced inventory stock tracking and movement analytical reports for your store.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

import { FileText } from "lucide-react";

export default ReportsPage;
