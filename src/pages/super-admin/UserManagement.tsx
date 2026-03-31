import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Shield, AlertCircle } from 'lucide-react';
import { usersApi } from '../../service/api';
import { StatsCard } from '../../components/ui/StatsCard';
import { DataTable } from '@/components/global-components/data-table';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  const { data: usersRes, isLoading, error: usersError } = useQuery({
    queryKey: ['users', 'all'],
    queryFn: () => usersApi.getAll(),
  });

  const users = usersRes?.data?.data || [];
  const error = (usersError as any)?.response?.data?.message || (usersError as any)?.message;

  const adminUsers = useMemo(() => users.filter((u: any) => u.role !== 'SUPER_ADMIN'), [users]);

  const userColumns = useMemo<ColumnDef<any, any>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Admin Name',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shadow-sm ring-2 ring-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="font-extrabold text-slate-900 tracking-tight">{user.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
      cell: ({ getValue }) => <div className="font-medium text-slate-600">{getValue<string>()}</div>,
    },
    {
      accessorKey: 'storeId',
      header: 'Store ID',
      cell: ({ row }) => {
        const value = row.original.storeId;
        return <div className="font-mono text-slate-400 text-xs">{value ? `STR-${value.substring(value.length - 4).toUpperCase()}` : 'N/A'}</div>;
      },
    },
    {
      accessorKey: 'role',
      header: 'Account Role',
      cell: ({ getValue }) => (
        <span className="uppercase font-bold tracking-wider text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
          {getValue<string>().replace('_', ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            {active ? 'Active' : 'Suspended'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/super-admin/admins/edit/${row.original.id}`)}
          className="font-bold text-xs tracking-widest text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline"
        >
          EDIT / VIEW
        </button>
      ),
    },
  ], [navigate]);

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group min-h-[500px] relative z-0">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <Users size={28} className="mr-3 text-indigo-500" />
            Global User Management
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage Store Admins across the entire network</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#1f1e35] hover:bg-[#2a2845] px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all shadow-md">
          <UserPlus size={18} />
          <span>Provision Admin</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Admins"
          value={users.filter((u: any) => u.role !== 'SUPER_ADMIN').length}
          icon={Users}
          iconColorClass="text-indigo-600"
          iconBgClass="bg-indigo-50"
          description=""
          trend={{ value: "Active Staff", isPositive: true, label: "Active Staff" }}
        />
        <StatsCard 
          title="Store Owners"
          value={users.filter((u: any) => u.role === 'STORE_ADMIN').length}
          icon={Shield}
          iconColorClass="text-blue-600"
          iconBgClass="bg-blue-50"
          description=""
          trend={{ value: "Managers", isPositive: true, label: "Managers" }}
        />
        <StatsCard 
          title="Suspended"
          value={users.filter((u: any) => u.role !== 'SUPER_ADMIN' && !u.isActive).length}
          icon={AlertCircle}
          iconColorClass="text-rose-600"
          iconBgClass="bg-rose-50"
          description=""
          trend={{ value: "Accounts Locked", isPositive: false, label: "Accounts Locked" }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
        {/* Table Search / Filter Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-slate-50">
          <div className="relative w-full sm:w-72">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search admins by name or email..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm whitespace-nowrap">
              All Roles
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm whitespace-nowrap">
              Store Admins
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm whitespace-nowrap">
              Accountants
            </button>
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-slate-500 font-medium">{error}</p>
          </div>
        ) : (
          <DataTable
            data={adminUsers}
            columns={userColumns}
            isLoading={isLoading}
            showToolbar={false}
            showExport={false}
            showColumns={false}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
