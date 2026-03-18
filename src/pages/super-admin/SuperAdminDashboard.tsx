import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Store, ShieldCheck, Laptop2, CreditCard, Settings } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SidebarLink from '../../components/ui/SidebarLink';
import SuperOverview from './SuperOverview';
import StoreOverview from './StoreOverview';
import CreateStorePage from './CreateStorePage';
import EditStorePage from './EditStorePage';
import UserManagement from './UserManagement';
import EditUserPage from './EditUserPage';
import DeviceManagement from './DeviceManagement';
import { useAuthStore } from '../../store/useAuthStore';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const sidebar = (
    <>
      <div className="flex items-center space-x-3 mb-10 pl-1 mt-2">
        <div className="w-10 h-10 bg-[#1a192b] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <div className="sidebar-header-text whitespace-nowrap overflow-hidden">
          <div className="text-xl font-extrabold text-white tracking-tight leading-none">
            Hybrid POS
          </div>
          <div className="text-[10px] font-black uppercase text-slate-300 tracking-widest mt-1">SUPER ADMIN</div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <SidebarLink to="/super-admin" icon={<LayoutDashboard size={20} />} label="Overview" variant="navy" />
        <SidebarLink to="/super-admin/stores" icon={<Store size={20} />} label="Stores" variant="navy" />
        <SidebarLink to="/super-admin/admins" icon={<Users size={20} />} label="Admins" variant="navy" />
        <SidebarLink to="/super-admin/devices" icon={<Laptop2 size={20} />} label="Devices" variant="navy" />
        <SidebarLink to="/super-admin/subscriptions" icon={<CreditCard size={20} />} label="Subscriptions" variant="navy" />
        <SidebarLink to="/super-admin/settings" icon={<Settings size={20} />} label="Settings" variant="navy" />
      </nav>
    </>
  );

  return (
    <DashboardLayout 
      sidebarContent={sidebar}
      title="Global Terminal"
      subtitle={`Welcome back, ${user?.name || 'Administrator'}`}
      role="SUPER_ADMIN"
      accentColor="indigo"
    >
      <Routes>
        <Route path="/" element={<SuperOverview />} />
        <Route path="/stores" element={<StoreOverview />} />
        <Route path="/stores/create" element={<CreateStorePage />} />
        <Route path="/stores/edit/:id" element={<EditStorePage />} />
        <Route path="/admins" element={<UserManagement />} />
        <Route path="/admins/edit/:id" element={<EditUserPage />} />
        <Route path="/devices" element={<DeviceManagement />} />
        
        <Route path="/subscriptions" element={<div className="p-10 text-center font-bold text-xl text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Subscriptions Management (API integration pending)</div>} />
        <Route path="/settings" element={<div className="p-10 text-center font-bold text-xl text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Global Settings</div>} />
        
        <Route path="*" element={<Navigate to="/super-admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
