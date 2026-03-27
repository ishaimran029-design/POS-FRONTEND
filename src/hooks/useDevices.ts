import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as deviceApi from '../api/devices.api';

export const useTerminals = () => {
  return useQuery({
    queryKey: ['terminals'],
    queryFn: deviceApi.listTerminals,
  });
};

export const useDevices = (storeId?: string) => {
  return useQuery({
    queryKey: ['devices', { storeId }],
    queryFn: () => deviceApi.fetchDevices(storeId),
  });
};

export const useRegisterTerminal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceApi.registerTerminal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terminals'] });
    },
  });
};

export const useRegisterDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceApi.registerDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => deviceApi.updateDevice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terminals'] });
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceApi.deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};
