import { useState } from 'react';
import { ShoppingBag, CreditCard, Activity, AlertCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardGrid from './components/DashboardGrid';
import MetricCard from './components/MetricCard';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import CategoryPieChart from './components/CategoryPieChart';
import ActiveDevicesPanel from './components/ActiveDevicesPanel';
import TopProductsTable from './components/TopProductsTable';
import StorageStatusCard from './components/StorageStatusCard';
import { useDashboardData } from './hooks/useDashboardData';

export default function StoreAdminDashboard() {
  const { data, loading, error } = useDashboardData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Initializing Console...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center p-12 bg-white rounded-[40px] shadow-xl max-w-md border border-slate-100">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">System Error</h2>
          <p className="text-slate-500 font-medium mb-8">{error || 'Failed to establish connection to POS core.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
          >
            Emergency Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <DashboardGrid>
          {/* Top Metrics Row */}
          <div className="xl:col-span-3">
            <MetricCard
              title="Total Revenue"
              value={`$${(data.metrics[0]?.value as number || 24500).toLocaleString()}`}
              change={12}
              isPositive={true}
              icon={CreditCard}
              color="indigo"
            />
          </div>
          <div className="xl:col-span-3">
            <MetricCard
              title="Active Sales"
              value={data.metrics[1]?.value || 156}
              change={5}
              isPositive={true}
              icon={ShoppingBag}
              color="emerald"
            />
          </div>
          <div className="xl:col-span-3">
            <MetricCard
              title="Inventory Alerts"
              value="08 Critical"
              change={0}
              isPositive={false}
              icon={AlertCircle}
              color="rose"
            />
          </div>
          <div className="xl:col-span-3">
            <MetricCard
              title="Total Orders"
              value={(data.metrics[2]?.value as number || 1204).toLocaleString()}
              change={8}
              isPositive={true}
              icon={Activity}
              color="amber"
            />
          </div>

          {/* Middle Analytics Section */}
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SalesChart data={data.dailySales} />
              <RevenueChart data={data.weeklyRevenue} />
            </div>

            <TopProductsTable products={data.topProducts} />
          </div>

          {/* Right Info Panel */}
          <div className="xl:col-span-4 space-y-8">
            <StorageStatusCard />
            <CategoryPieChart data={data.categories} />
            <ActiveDevicesPanel devices={data.devices} />
          </div>
        </DashboardGrid>
      </div>
    </div>
  );
}
