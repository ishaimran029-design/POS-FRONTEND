export interface MetricData {
    title: string;
    value: string | number;
    change: number;
    isPositive: boolean;
    icon: string;
}

export interface SalesData {
    date: string;
    sales: number;
}

export interface RevenueData {
    week: string;
    revenue: number;
}

export interface CategoryData {
    name: string;
    value: number;
    color: string;
}

export interface Device {
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline';
}

export interface Product {
    id: string;
    name: string;
    sku: string;
    unitsSold: number;
    revenue: number;
    stockLevel: number; // 0-100
}

export interface DashboardData {
    metrics: MetricData[];
    dailySales: SalesData[];
    weeklyRevenue: RevenueData[];
    categories: CategoryData[];
    devices: Device[];
    topProducts: Product[];
}
