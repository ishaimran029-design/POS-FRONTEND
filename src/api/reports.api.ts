import api from "./api";

export const getSuperAdminOverview = () => {
  return api.get('/reports/superadmin/overview').then(res => res.data);
};

export const getSalesReport = (params: { startDate: string; endDate: string }) => {
  return api.get('/reports/sales', { params }).then(res => res.data);
};

export const getStoreDashboardData = (params: { startDate: string; endDate: string }) => {
  return api.get('/reports/storeadmin/dashboard', { params }).then(res => res.data);
};

export const getInventoryReport = () => {
  return api.get('/reports/inventory').then(res => res.data);
};

