import axios from "../service/api";

export const fetchDailySales = () => {
  return axios.get("/sales/daily");
};

export const fetchWeeklyRevenue = () => {
  return axios.get("/sales/weekly");
};

export const createSale = (payload: any, idempotencyKey: string) => {
  return axios.post("/sales", payload, {
    headers: {
      "x-idempotency-key": idempotencyKey,
    },
  });
};

export const getSaleById = (saleId: string) => {
  return axios.get(`/sales/${saleId}`);
};

export const syncOfflineSales = (payload: { batchId: string; deviceId: string; sales: any[] }) => {
  return axios.post("/sync/sales", payload);
};