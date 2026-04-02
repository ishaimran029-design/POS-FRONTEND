import { create } from 'zustand';
import { usersApi } from '../service/api';

interface UserState {
  users: any[];
  isLoading: boolean;
  error: string | null;
  
  fetchUsers: (storeId?: string) => Promise<void>;
  createUser: (data: any) => Promise<boolean>;
  updateUser: (id: string, data: any) => Promise<boolean>;
  toggleUserStatus: (id: string, isActive: boolean) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async (storeId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await usersApi.getAll(storeId);
      if (response.data.success) {
        set({ users: response.data.data, isLoading: false });
      } else {
        set({ error: response.data.message || 'Failed to fetch users', isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error connecting to server', isLoading: false });
    }
  },

  createUser: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await usersApi.create(data);
      if (response.data.success) {
          set((state) => ({ users: [response.data.data, ...state.users], isLoading: false }));
          return true;
      }
      set({ isLoading: false });
      return false;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create user', isLoading: false });
      return false;
    }
  },

  updateUser: async (id: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await usersApi.update(id, data);
      if (response.data.success) {
        set((state) => ({
          users: state.users.map((u) => u.id === id ? response.data.data : u),
          isLoading: false
        }));
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update user', isLoading: false });
      return false;
    }
  },

  toggleUserStatus: async (id: string, isActive: boolean) => {
    try {
      const response = await usersApi.update(id, { isActive });
      if (response.data.success) {
        set((state) => ({
          users: state.users.map((u) => u.id === id ? { ...u, isActive } : u)
        }));
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}));
