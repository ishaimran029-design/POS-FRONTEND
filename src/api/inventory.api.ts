import api from "./api";

export const fetchLowStockInventory = () => {
  return api.get("/inventory?lowStock=true");
};

export const fetchFullInventory = () => {
  return api.get("/inventory");
};

