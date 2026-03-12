import api from "./api";

export const fetchProducts = () => {
  return api.get("/products");
};

export const fetchTopProducts = () => {
  return api.get("/products/top");
};

export const createProduct = (data: FormData) => {
  return api.post("/products", data);
};

export const updateProduct = (id: string, data: FormData) => {
  return api.patch(`/products/${id}`, data);
};

export const deleteProduct = (id: string) => {
  return api.delete(`/products/${id}`);
};

export const getProductByBarcode = (barcode: string, deviceId?: string | null) => {
  return api.get(`/products/barcode/${encodeURIComponent(barcode)}`, {
    headers: deviceId ? { "x-device-id": deviceId } : undefined,
  });
};

export const searchProducts = (query: string) => {
  return api.get(`/products`, { params: { search: query } });
};
