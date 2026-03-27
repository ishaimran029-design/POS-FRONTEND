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

export const getAuditLogs = (params?: {
  page?: number;
  limit?: number;
  userId?: string;
  entity?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return api.get("/reports/audit-logs", { params }).then(res => res.data);
};
