import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStaffMembers, createStaffMember, updateStaffMember, deleteStaffMember } from '../api/staff.api';

export const useStaff = () => {
  return useQuery({
    queryKey: ['staff'],
    queryFn: fetchStaffMembers,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateStaffMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};
