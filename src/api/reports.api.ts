import api from "./api";

export const getSuperAdminOverview = () => {
  return api.get('/reports/superadmin/overview');
};

export const getSalesReport = (params: { startDate: string; endDate: string }) => {
  return api.get('/reports/sales', { params });
};

export const getStoreDashboardData = (params: { startDate: string; endDate: string }) => {
  return api.get('/reports/storeadmin/dashboard', { params });
};

export const getInventoryReport = () => {
  return api.get('/reports/inventory');
};

