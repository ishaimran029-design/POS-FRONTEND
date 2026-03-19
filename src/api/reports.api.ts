import axios from "../service/api";

export const getSalesReport = (params: { startDate: string; endDate: string }) => {
  return axios.get("/reports/sales", { params });
};

export const getInventoryReport = () => {
  return axios.get("/reports/inventory");
};

export const getStoreDashboardData = (params?: { startDate?: string; endDate?: string }) => {
  return axios.get("/reports/storeadmin/dashboard", { params });
};
