import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, profileApi } from '../service/api';
import { type User, type AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      
      setAuth: (user, accessToken) => set({ 
        user, 
        accessToken, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false
      }),
      
      logout: async () => {
        try {
          const refreshToken = localStorage.getItem('refresh-token');
          await authApi.logout(refreshToken || undefined);
          console.log('[AUTH] ✅ Logout API successful');
        } catch (error) {
          console.error('[AUTH] Logout API error:', error);
        } finally {
          localStorage.removeItem('refresh-token');
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
          console.log('[AUTH] ✅ Global state cleared');
        }
      },
      
      hydrate: async () => {
        try {
          // If already loading, don't restart to avoid flicker
          set({ isLoading: true });
          
          const currentState = get();
          const token = currentState.accessToken;
          
          if (!token) {
            console.log('[AUTH] No persisted token, user unauthenticated');
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }

          console.log('[AUTH] Persisted session found, synchronizing with backend...');
          
          try {
            const response = await profileApi.getProfile();
            
            if (response.data?.success && response.data?.data) {
              // Align with backend sendSuccess({ user: { ... } }) structure
              const userData = response.data.data.user;
              console.log('✅ [AUTH] Session valid. User:', userData.email);
              set({ 
                user: userData, 
                isAuthenticated: true, 
                isLoading: false 
              });
            } else {
              throw new Error('Malformed profile response');
            }
          } catch (error: any) {
            console.warn('⚠️ [AUTH] Session invalid or expired:', error.response?.data?.message || error.message);
            
            // Critical: If it's a 401, the token is definitely dead
            if (error.response?.status === 401) {
              set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
              localStorage.removeItem('refresh-token');
            } else {
              // For other errors (maybe server down), keep local state but stop loading
              set({ isLoading: false });
            }
          }
        } catch (error) {
          console.error('[AUTH] Root hydration failure:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
