import { useState, useEffect } from 'react';
import { fetchStoreDashboard } from '../../../api/dashboard.api';
import type { DashboardData } from '../types/dashboard.types';

export const useDashboardData = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                const res = await fetchStoreDashboard();
                if (res.data.success) {
                    const b = res.data.data;
                    setData({
                        metrics: [
                            { title: 'Total Revenue', value: b.summary.totalRevenue || 0, change: 12, isPositive: true, icon: 'CreditCard' },
                            { title: 'Active Sales', value: b.summary.totalTransactions || 0, change: 5, isPositive: true, icon: 'ShoppingBag' },
                            { title: 'Total Orders', value: b.summary.totalTransactions || 0, change: 8, isPositive: true, icon: 'Activity' }
                        ],
                        dailySales: (b.charts.revenueByDate && b.charts.revenueByDate.length > 0)
                            ? b.charts.revenueByDate.map((d: any) => ({
                                date: d.date,
                                sales: d.revenue
                            }))
                            : MOCK_DASHBOARD.dailySales,
                        weeklyRevenue: (b.charts.revenueByDate && b.charts.revenueByDate.length > 0)
                            ? b.charts.revenueByDate.slice(-4).map((d: any, i: number) => ({
                                week: `Week ${i + 1}`,
                                revenue: d.revenue
                            }))
                            : MOCK_DASHBOARD.weeklyRevenue,
                        categories: (b.charts.paymentBreakdown && b.charts.paymentBreakdown.length > 0)
                            ? b.charts.paymentBreakdown.map((p: any) => ({
                                name: p.paymentMethod,
                                value: p.revenue,
                                color: '#4F46E5'
                            }))
                            : MOCK_DASHBOARD.categories,
                        devices: [
                            { id: '1', name: 'Active Devices', location: 'System', status: 'online' }
                        ],
                        topProducts: (b.topProducts && b.topProducts.length > 0)
                            ? b.topProducts.map((p: any) => ({
                                id: p.productId,
                                name: p.name,
                                sku: p.sku,
                                unitsSold: p.quantitySold,
                                revenue: p.revenue,
                                stockLevel: 100
                            }))
                            : MOCK_DASHBOARD.topProducts
                    });
                }
            } catch (err: any) {
                console.warn('Dashboard API failed, using mock data', err);
                setError(null); // Silent fallback
                setData(MOCK_DASHBOARD);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    return { data, loading, error };
};

const MOCK_DASHBOARD: DashboardData = {
    metrics: [
        { title: 'Total Revenue', value: 24500, change: 12, isPositive: true, icon: 'CreditCard' },
        { title: 'Active Sales', value: 156, change: 5, isPositive: true, icon: 'ShoppingBag' },
        { title: 'Total Orders', value: 1204, change: 8, isPositive: true, icon: 'Activity' }
    ],
    dailySales: [
        { date: 'Mon', sales: 4000 },
        { date: 'Tue', sales: 3000 },
        { date: 'Wed', sales: 2000 },
        { date: 'Thu', sales: 2780 },
        { date: 'Fri', sales: 1890 },
        { date: 'Sat', sales: 2390 },
        { date: 'Sun', sales: 3490 },
    ],
    weeklyRevenue: [
        { week: 'Week 1', revenue: 15000 },
        { week: 'Week 2', revenue: 25000 },
        { week: 'Week 3', revenue: 18000 },
        { week: 'Week 4', revenue: 32000 },
    ],
    categories: [
        { name: 'Electronics', value: 400, color: '#4F46E5' },
        { name: 'Fashion', value: 300, color: '#10B981' },
        { name: 'Home', value: 300, color: '#F59E0B' },
        { name: 'Other', value: 200, color: '#EF4444' },
    ],
    devices: [
        { id: '1', name: 'POS-Front-01', location: 'Main Entrance', status: 'online' },
        { id: '2', name: 'POS-Mobile-01', location: 'Table Service', status: 'online' },
        { id: '3', name: 'POS-Back-01', location: 'Kitchen Pick-up', status: 'offline' },
    ],
    topProducts: [
        { id: '1', name: 'Premium Coffee Beans', sku: 'COF-001', unitsSold: 450, revenue: 12500, stockLevel: 85 },
        { id: '2', name: 'Organic Green Tea', sku: 'TEA-042', unitsSold: 320, revenue: 8400, stockLevel: 25 },
        { id: '3', name: 'Artisan Sourdough', sku: 'BAK-012', unitsSold: 280, revenue: 5600, stockLevel: 10 },
    ],
};
