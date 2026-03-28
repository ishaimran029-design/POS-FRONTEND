import { useQuery } from '@tanstack/react-query';
import * as reportsApi from '../api/reports.api';

export const useStoreDashboardData = (params: { startDate: string; endDate: string }) => {
  return useQuery({
    queryKey: ['reports-dashboard', params],
    queryFn: () => reportsApi.getStoreDashboardData(params),
  });
};

export const useInventoryReport = () => {
  return useQuery({
    queryKey: ['reports-inventory'],
    queryFn: reportsApi.getInventoryReport,
  });
};

export const useSuperAdminOverview = () => {
  return useQuery({
    queryKey: ['reports-superadmin-overview'],
    queryFn: reportsApi.getSuperAdminOverview,
  });
};

export const useAuditLogs = (params?: any) => {
  return useQuery({
    queryKey: ['audit-logs', params],
    queryFn: () => reportsApi.getAuditLogs(params),
  });
};
