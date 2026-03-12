import api from "@/service/api"

export const getCategories = () => {
  return api.get("/categories")
}

export const createCategory = (data: { name: string, description?: string }) => {
  return api.post("/categories", data)
}

export const updateCategory = (id: string, data: any) => {
  return api.patch(`/categories/${id}`, data)
}

export const deleteCategory = (id: string) => {
  return api.delete(`/categories/${id}`)
}
