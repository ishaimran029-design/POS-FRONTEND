import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// UI Components
import PageLoader from './components/ui/PageLoader';
import HomeRedirect from './components/HomeRedirect';

// Lazy loading pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/SuperAdminDashboard'));
const StoreAdminDashboard = lazy(() => import('./pages/store-admin/StoreAdminDashboard'));
const CashierDashboard = lazy(() => import('./pages/cashier/CashierDashboard'));
const AccountantDashboard = lazy(() => import('./pages/accountant/AccountantDashboard'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const App: React.FC = () => {
  const { hydrate, isLoading } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Role-Specific Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/store-admin/*" element={<StoreAdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['CASHIER', 'STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/cashier/*" element={<CashierDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ACCOUNTANT', 'STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/accountant/*" element={<AccountantDashboard />} />
          </Route>

          {/* Intelligent Redirect Handling */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
