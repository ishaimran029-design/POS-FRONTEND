import api from '../service/api';

/**
 * Dashboard API Integration
 * These functions connect the Store Admin Dashboard to the backend.
 */

// 1. Get Current User Profile (Role, StoreID, etc.)
export const getCurrentUser = () => {
    return api.get('/auth/me').then(res => res.data);
};

// 2. Get Store Information
export const getStoreInfo = (storeId: string) => {
    return api.get(`/stores/${storeId}`).then(res => res.data);
};

// 3. Get Devices registered for the Store
export const getDevices = (storeId?: string) => {
    return api.get(storeId ? `/devices?storeId=${storeId}` : '/devices').then(res => res.data);
};

// 4. Get Products list (General overview)
export const getProducts = () => {
    return api.get('/products').then(res => res.data);
};

// 5. Get Inventory Stock Info
export const getInventory = () => {
    return api.get('/inventory').then(res => res.data);
};

// 6. Get Recent Sales
export const getSales = () => {
    return api.get('/sales').then(res => res.data);
};

// 7. Get Aggregated Sales Report for Dashboard Charts
export const getSalesReport = (params: { startDate: string; endDate: string }) => {
    return api.get('/reports/sales', { params }).then(res => res.data);
};

// 8. Get Store Admin Specific Dashboard Metrics (Today's summary, top products, etc.)
export const getDashboardSummary = (params?: { startDate: string; endDate: string }) => {
    return api.get('/reports/storeadmin/dashboard', { params }).then(res => res.data);
};

// 9. Get Super Admin Specific Dashboard Metrics
export const getSuperAdminOverview = () => {
    return api.get('/reports/superadmin/overview').then(res => res.data);
};
