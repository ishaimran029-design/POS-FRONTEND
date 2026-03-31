import { create } from 'zustand';
import { storesApi } from '../service/api';

interface StoreState {
  stores: any[];
  currentStore: any | null;
  isLoading: boolean;
  error: string | null;
  
  fetchStores: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<void>;
  createStore: (data: any) => Promise<boolean>;
  updateStore: (id: string, data: any) => Promise<boolean>;
  toggleStoreStatus: (id: string, isActive: boolean) => Promise<boolean>;
}

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  currentStore: null,
  isLoading: false,
  error: null,

  fetchStores: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await storesApi.getAll();
      if (response.data.success) {
        set({ stores: response.data.data, isLoading: false });
      } else {
        set({ error: response.data.message || 'Failed to fetch stores', isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error connecting to server', isLoading: false });
    }
  },

  fetchStoreById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await storesApi.getById(id);
      if (response.data.success) {
        set({ currentStore: response.data.data, isLoading: false });
      } else {
        set({ error: response.data.message || 'Failed to fetch store details', isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error connecting to server', isLoading: false });
    }
  },

  createStore: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await storesApi.create(data);
      set({ isLoading: false });
      return response.data.success;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create store', isLoading: false });
      return false;
    }
  },

  updateStore: async (id: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await storesApi.update(id, data);
      if (response.data.success) {
        set({ currentStore: response.data.data, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update store', isLoading: false });
      return false;
    }
  },

  toggleStoreStatus: async (id: string, isActive: boolean) => {
    // Optimistic UI could be added here, but following the requirement for stable integration first
    try {
      const response = await storesApi.update(id, { isActive });
      if (response.data.success) {
        set((state) => ({
          stores: state.stores.map((s) => s.id === id ? { ...s, isActive } : s),
          currentStore: state.currentStore?.id === id ? { ...state.currentStore, isActive } : state.currentStore
        }));
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}));
