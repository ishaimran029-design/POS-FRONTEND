import api from "./api"

export const fetchProducts = () => {
    return api.get("/products")
}

export const fetchTopProducts = () => {
    return api.get("/products/top")
}

export const createProduct = (data: any) => {
    return api.post("/products", data)
}

export const updateProduct = (id: string, data: any) => {
    return api.patch(`/products/${id}`, data)
}

export const deleteProduct = (id: string) => {
    return api.delete(`/products/${id}`)
}
