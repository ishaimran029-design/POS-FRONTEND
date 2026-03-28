import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchTopProducts } from '../api/products.api';
import { getCategories } from '../api/category.api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
};

export const useTopProducts = () => {
  return useQuery({
    queryKey: ['products', 'top'],
    queryFn: fetchTopProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
