import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getStoreInfo, getDashboardSummary, getSalesReport } from '../api/dashboard.api';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentUser,
  });
};

export const useStoreInfo = (storeId: string) => {
  return useQuery({
    queryKey: ['store', storeId],
    queryFn: () => getStoreInfo(storeId),
    enabled: !!storeId,
  });
};

export const useDashboardSummary = (params: { startDate: string; endDate: string }) => {
  return useQuery({
    queryKey: ['dashboard', 'summary', params],
    queryFn: () => getDashboardSummary(params),
  });
};

export const useSalesReport = (params: { startDate: string; endDate: string }) => {
  return useQuery({
    queryKey: ['dashboard', 'sales-report', params],
    queryFn: () => getSalesReport(params),
  });
};
