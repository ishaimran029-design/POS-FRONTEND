import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFullInventory, fetchLowStockInventory, fetchInventoryLogs, adjustStock } from '../api/inventory.api';

export const useInventory = (lowStock: boolean = false) => {
  return useQuery({
    queryKey: ['inventory', { lowStock }],
    queryFn: () => lowStock ? fetchLowStockInventory() : fetchFullInventory(),
  });
};

export const useInventoryLogs = (params?: any) => {
  return useQuery({
    queryKey: ['inventory-logs', params],
    queryFn: () => fetchInventoryLogs(params),
  });
};

export const useAdjustStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adjustStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-logs'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Stock is shown in products list
    },
  });
};
