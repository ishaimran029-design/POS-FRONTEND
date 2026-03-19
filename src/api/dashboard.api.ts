import api from '../service/api';

/**
 * Dashboard API Integration
 * These functions connect the Store Admin Dashboard to the backend.
 */

// 1. Get Current User Profile (Role, StoreID, etc.)
export const getCurrentUser = () => {
    return api.get('/auth/me');
};

// 2. Get Store Information
export const getStoreInfo = (storeId: string) => {
    return api.get(`/stores/${storeId}`);
};

// 3. Get Devices registered for the Store
export const getDevices = (storeId?: string) => {
    return api.get(storeId ? `/devices?storeId=${storeId}` : '/devices');
};

// 4. Get Products list (General overview)
export const getProducts = () => {
    return api.get('/products');
};

// 5. Get Inventory Stock Info
export const getInventory = () => {
    return api.get('/inventory');
};

// 6. Get Recent Sales
export const getSales = () => {
    return api.get('/sales');
};

// 7. Get Aggregated Sales Report for Dashboard Charts
export const getSalesReport = (params: { startDate: string; endDate: string }) => {
    return api.get('/reports/sales', { params });
};

// 8. Get Store Admin Specific Dashboard Metrics (Today's summary, top products, etc.)
export const getDashboardSummary = () => {
    return api.get('/reports/storeadmin/dashboard');
};
