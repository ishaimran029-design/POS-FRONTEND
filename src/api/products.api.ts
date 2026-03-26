import api from "./api";

export const fetchProducts = async (params?: any) => {
  console.log('📦 [Products API] Calling GET /products...', params);
  try {
    const response = await api.get("/products", { params });
    console.log('📦 [Products API] Response:', response);
    return response;
  } catch (error: any) {
    console.error('❌ [Products API] Error:', error);
    throw error;
  }
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
