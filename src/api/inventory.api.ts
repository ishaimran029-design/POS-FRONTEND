import api from "./api";

export const fetchLowStockInventory = () => {
  return api.get("/inventory?lowStock=true");
};

export const fetchFullInventory = () => {
  return api.get("/inventory");
};

export const fetchInventoryLogs = (params?: { productId?: string; changeType?: string; limit?: number }) => {
  return api.get("/inventory/logs", { params });
};

export const adjustStock = (data: {
  productId: string;
  changeType: string;
  quantity: number;
  notes?: string;
  referenceId?: string;
}) => {
  return api.post("/inventory/adjust", data);
};

