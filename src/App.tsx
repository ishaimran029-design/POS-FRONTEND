import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// UI Components
import PageLoader from './components/ui/PageLoader';
import HomeRedirect from './components/shared/HomeRedirect';

// Lazy loading pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const StoreOverview = lazy(() => import('./pages/super-admin/StoreOverview'));
const CreateStorePage = lazy(() => import('./pages/super-admin/CreateStorePage'));
const EditStorePage = lazy(() => import('./pages/super-admin/EditStorePage'));
const UserManagement = lazy(() => import('./pages/super-admin/UserManagement'));
const EditUserPage = lazy(() => import('./pages/super-admin/EditUserPage'));
const DeviceManagement = lazy(() => import('./pages/super-admin/DeviceManagement'));

const StoreAdminDashboard = lazy(() => import('./pages/store-admin/dashboard/StoreAdminDashboard'));
const StaffManagementPage = lazy(() => import('./pages/store-admin/staff-management/StaffManagementPage'));
const CashierDashboard = lazy(() => import('./pages/cashier/CashierDashboard'));
const AccountantDashboard = lazy(() => import('./pages/accountant/AccountantDashboard'));

const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const ProtectedRoute = lazy(() => import('./components/shared/ProtectedRoute'));

// New Admin Dashboard
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductsManagementPage = lazy(() => import('./pages/store-admin/products-management/ProductsManagementPage'));
const AddProductPage = lazy(() => import('./pages/store-admin/products-management/AddProductPage'));
const DevicesManagementPage = lazy(() => import('./pages/store-admin/devices-management/DevicesManagementPage'));
const SalesTransactions = lazy(() => import('./pages/SalesTransactions'));
const ProductCategories = lazy(() => import('./pages/ProductCategories'));

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

          <Route element={<ProtectedRoute allowedRoles={['STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/store-admin/dashboard" element={<StoreAdminDashboard />} />
            <Route path="/store-admin/staff" element={<StaffManagementPage />} />
            <Route path="/store-admin/inventory/products" element={<ProductsManagementPage />} />
            <Route path="/store-admin/inventory/products/add" element={<AddProductPage />} />
            <Route path="/store-admin/devices" element={<DevicesManagementPage />} />
            <Route path="/sales-transactions" element={<SalesTransactions />} />
            <Route path="/categories" element={<ProductCategories />} />
            <Route path="/store-admin" element={<Navigate to="/store-admin/dashboard" replace />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['CASHIER', 'STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/cashier/*" element={<CashierDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ACCOUNTANT', 'STORE_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/accountant/*" element={<AccountantDashboard />} />
          </Route>

          {/* Unified Admin Dashboard Route */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/admin/*" element={
              <AdminLayout>
                <Routes>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="stores" element={<StoreOverview />} />
                  <Route path="stores/create" element={<CreateStorePage />} />
                  <Route path="stores/edit/:id" element={<EditStorePage />} />
                  <Route path="admins" element={<UserManagement />} />
                  <Route path="admins/edit/:id" element={<EditUserPage />} />
                  <Route path="devices" element={<DeviceManagement />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </AdminLayout>
            } />
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
