import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Settings, LogOut, Store, BarChart3, Users } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SidebarLink from '../../components/ui/SidebarLink';
import StatCard from '../../components/ui/StatCard';
import InventoryManagement from './InventoryManagement';
import StaffManagement from './StaffManagement';

const StoreAdminDashboard: React.FC = () => {
  const sidebar = (
    <>
      <div className="flex items-center space-x-3 mb-10 pl-1 mt-2">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/30 flex-shrink-0">
          <Store size={24} className="text-white" />
        </div>
        <div className="sidebar-header-text whitespace-nowrap overflow-hidden">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-none">
            StoreAdmin
          </div>
          <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Management</div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <SidebarLink to="/store-admin" icon={<LayoutDashboard size={20} />} label="Dashboard" variant="purple" />
        <SidebarLink to="/store-admin/sales" icon={<ShoppingCart size={20} />} label="New Sale" variant="purple" />
        <SidebarLink to="/store-admin/inventory" icon={<Package size={20} />} label="Inventory" variant="purple" />
        <SidebarLink to="/store-admin/staff" icon={<Users size={20} />} label="Staff" variant="purple" />
        <SidebarLink to="/store-admin/reports" icon={<BarChart3 size={20} />} label="Reports" variant="purple" />
        <SidebarLink to="/store-admin/settings" icon={<Settings size={20} />} label="Store Settings" variant="purple" />
      </nav>
    </>
  );

  return (
    <DashboardLayout 
      sidebarContent={sidebar}
      title="Store Management"
      subtitle="Manage products, staff and daily operations"
      role="STORE_ADMIN"
      accentColor="purple"
    >
      <Routes>
        <Route path="/" element={
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in">
              <StatCard title="Today's Sales" value="$4,285" change="+15%" variant="purple" />
              <StatCard title="Low Stock Items" value="12" change="Attention" variant="purple" />
              <StatCard title="Active Staff" value="4" change="All shifts active" variant="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InventoryManagement />
              <StaffManagement />
            </div>
          </>
        } />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="*" element={<Navigate to="/store-admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StoreAdminDashboard;
