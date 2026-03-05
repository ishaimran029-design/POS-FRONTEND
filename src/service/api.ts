import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3003/api/v1',
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    } catch (e) {
      console.error('Error parsing auth-storage', e);
    }
  }
  return config;
});

// Response Interceptor for Token Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          const refreshToken = localStorage.getItem('refresh-token'); // Or from state if preferred
          
          if (refreshToken) {
            const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
              refreshToken
            });
            
            if (response.data.success) {
              const { accessToken, refreshToken: newRefreshToken } = response.data.data;
              
              // Update state in localStorage (Zustand will pick it up or we manually patch)
              const newState = { ...JSON.parse(authStorage), state: { ...state, accessToken } };
              localStorage.setItem('auth-storage', JSON.stringify(newState));
              localStorage.setItem('refresh-token', newRefreshToken);
              
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axios(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // localStorage.removeItem('auth-storage');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  logout: (refreshToken?: string) => api.post('/auth/logout', { refreshToken }),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};

export const profileApi = {
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.patch('/auth/me', data),
};

export const storesApi = {
  getAll: () => api.get('/stores'),
  getById: (id: string) => api.get(`/stores/${id}`),
  create: (data: any) => api.post('/stores', data),
  update: (id: string, data: any) => api.patch(`/stores/${id}`, data),
};

export const usersApi = {
  getAll: (storeId?: string) => api.get(storeId ? `/users?storeId=${storeId}` : '/users'),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
};

export const devicesApi = {
  getAll: (storeId?: string) => api.get(storeId ? `/devices?storeId=${storeId}` : '/devices'),
  register: (data: any) => api.post('/devices', data),
  update: (id: string, data: any) => api.patch(`/devices/${id}`, data),
};

export const reportsApi = {
  getSuperAdminOverview: () => api.get('/reports/superadmin/overview'),
};

export default api;
