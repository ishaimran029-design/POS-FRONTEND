export type UserRole = 'SUPER_ADMIN' | 'STORE_ADMIN' | 'CASHIER' | 'ACCOUNTANT';

export type Store = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
};

export type AssignedTerminal = {
  id: string;
  deviceName: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  store?: Store | null;
  lastLoginAt?: string | null;
  createdAt: string;
  assignedTerminals?: AssignedTerminal[];
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
};

export const AUTH_IS_MODULAR = true;
