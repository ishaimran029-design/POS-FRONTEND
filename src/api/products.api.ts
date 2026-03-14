import api from "./api";

export const fetchProducts = async () => {
  try {
    console.log('🔗 Products API - Calling GET /products endpoint...');
    const response = await api.get("/products");
    console.log('🔗 Products API - Response received:', response);
    return response;
  } catch (error: any) {
    console.error('🔗 Products API - Error calling /products:', error);
    throw error;
  }
};

export const fetchTopProducts = () => {
  return api.get("/products/top");
};

export const createProduct = (data: any) => {
  return api.post("/products", data);
};

export const updateProduct = (id: string, data: any) => {
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
