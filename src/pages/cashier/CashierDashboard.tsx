import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Scan } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SidebarLink from '../../components/ui/SidebarLink';
import POSInterface from './POSInterface';
import ShiftTools from './ShiftTools';

const CashierDashboard: React.FC = () => {
  const sidebar = (
    <>
      <div className="flex items-center space-x-3 mb-10 pl-1 mt-2">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/30 flex-shrink-0">
          <Scan size={24} className="text-white" />
        </div>
        <div className="sidebar-header-text whitespace-nowrap overflow-hidden">
          <div className="font-extrabold text-xl tracking-tight text-slate-800 leading-none">QUICK-POS</div>
          <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Cashier Pro</div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <SidebarLink to="/cashier" icon={<ShoppingCart size={20} />} label="POS Terminal" variant="emerald" />
        <SidebarLink to="/cashier/scan" icon={<Scan size={20} />} label="Scan Item" variant="emerald" />
      </nav>
    </>
  );

  return (
    <DashboardLayout 
      sidebarContent={sidebar}
      title="POS Terminal"
      subtitle="Complete sales and manage your active shift"
      role="CASHIER"
      accentColor="emerald"
    >
      <Routes>
        <Route path="/" element={
          <>
            <POSInterface />
            <ShiftTools />
          </>
        } />
        <Route path="/scan" element={
          <div className="text-center p-20 bg-white border border-slate-200 rounded-3xl">
            <Scan size={64} className="mx-auto text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800">Scan Item Ready</h2>
            <p className="text-slate-500 mt-2">Waiting for barcode input...</p>
          </div>
        } />
        <Route path="*" element={<Navigate to="/cashier" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CashierDashboard;
