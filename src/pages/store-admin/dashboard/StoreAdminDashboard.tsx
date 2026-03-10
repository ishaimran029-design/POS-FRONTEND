import { useEffect, useState } from 'react';
import { ShoppingBag, CreditCard, Activity, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import DashboardGrid from './components/DashboardGrid';
import MetricCard from './components/MetricCard';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import CategoryPieChart from './components/CategoryPieChart';
import ActiveDevicesPanel from './components/ActiveDevicesPanel';
import TopProductsTable from './components/TopProductsTable';
import StorageStatusCard from './components/StorageStatusCard';
import api from '@/service/api';

interface DashboardView {
  metrics: { value: number }[];
  dailySales: { date: string; sales: number }[];
  weeklyRevenue: { week: string; revenue: number }[];
  categories: { name: string; value: number; color: string }[];
  devices: { id: string; name: string; location: string; status: 'online' | 'offline' }[];
  topProducts: { id: string; name: string; sku: string; unitsSold: number; revenue: number; stockLevel: number }[];
}

export default function StoreAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<DashboardView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/reports/storeadmin/dashboard');
        const raw = res.data?.data ?? null;
        if (!raw) {
          setData(null);
          return;
        }
        const s = raw.summary ?? {};
        const today = raw.today ?? {};
        const inv = raw.inventory ?? {};
        const charts = raw.charts ?? {};
        const revByDate = charts.revenueByDate ?? [];
        const payBreakdown = charts.paymentBreakdown ?? [];
        const topProducts = raw.topProducts ?? [];

        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        setData({
          metrics: [
            { value: s.totalRevenue ?? 0 },
            { value: today.transactions ?? s.totalTransactions ?? 0 },
            { value: inv.lowStockCount ?? 0 },
            { value: s.totalTransactions ?? 0 },
          ],
          dailySales: revByDate.map((d: { date?: string; revenue?: number }) => ({ date: d.date ?? '', sales: d.revenue ?? 0 })),
          weeklyRevenue: revByDate.map((d: { date?: string; revenue?: number }) => ({ week: d.date ?? '', revenue: d.revenue ?? 0 })),
          categories: payBreakdown.map((p: { paymentMethod?: string; revenue?: number }, i: number) => ({
            name: p.paymentMethod ?? 'Other',
            value: p.revenue ?? 0,
            color: colors[i % colors.length],
          })),
          devices: [],
          topProducts: topProducts.map((p: { productId?: string; id?: string; name?: string; sku?: string; quantitySold?: number; revenue?: number }) => ({
            id: p.productId ?? p.id ?? '',
            name: p.name ?? 'Unknown',
            sku: p.sku ?? '',
            unitsSold: p.quantitySold ?? 0,
            revenue: p.revenue ?? 0,
            stockLevel: 50,
          })),
        });
      } catch (err: unknown) {
        console.error('Failed to load store admin dashboard', err);
        const msg = err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
        setError(msg || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    void loadDashboard();
  }, []);

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
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
            Emergency Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <DashboardGrid>
          <div className="xl:col-span-3">
            <MetricCard title="Total Revenue" value={`$${Number(data.metrics?.[0]?.value ?? 0).toLocaleString()}`} change={12} isPositive={true} icon={CreditCard} color="indigo" />
          </div>
          <div className="xl:col-span-3">
            <MetricCard title="Active Sales" value={data.metrics?.[1]?.value ?? 0} change={5} isPositive={true} icon={ShoppingBag} color="emerald" />
          </div>
          <div className="xl:col-span-3">
            <MetricCard title="Inventory Alerts" value={`${data.metrics?.[2]?.value ?? 0} Critical`} change={0} isPositive={false} icon={AlertCircle} color="rose" />
          </div>
          <div className="xl:col-span-3">
            <MetricCard title="Total Orders" value={Number(data.metrics?.[3]?.value ?? 0).toLocaleString()} change={8} isPositive={true} icon={Activity} color="amber" />
          </div>
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SalesChart data={data.dailySales ?? []} />
              <RevenueChart data={data.weeklyRevenue ?? []} />
            </div>
            <TopProductsTable products={data.topProducts ?? []} />
          </div>
          <div className="xl:col-span-4 space-y-8">
            <StorageStatusCard />
            <CategoryPieChart data={data.categories ?? []} />
            <ActiveDevicesPanel devices={data.devices ?? []} />
          </div>
        </DashboardGrid>
      </div>
    </div>
  );
}
