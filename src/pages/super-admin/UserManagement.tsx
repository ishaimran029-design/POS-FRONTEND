import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Shield, Loader2, AlertCircle } from 'lucide-react';
import { usersApi } from '../../service/api';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersApi.getAll();
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError('Failed to load users');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error communicating with server');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refreshTrigger]);

  const handleUserUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group min-h-[500px] relative z-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Users size={24} className="mr-3 text-indigo-500" />
            Global User Management
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage Store Admins across the entire network</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#1f1e35] hover:bg-[#2a2845] px-4 py-2 rounded-xl text-white text-sm font-bold transition-all shadow-md mt-2 sm:mt-0">
          <UserPlus size={18} />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-48"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-16 h-6 bg-slate-200 rounded-full mr-4"></div>
                  <div className="w-12 h-8 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-slate-500 font-medium">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-medium italic border bg-slate-50 rounded-2xl">
            No admin users found in the network.
          </div>
        ) : (
          users.map((user: any) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${user.role === 'SUPER_ADMIN' ? 'bg-purple-600' : 'bg-indigo-600'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</div>
                  <div className="text-xs text-slate-500 font-medium space-x-2">
                    <span>{user.email}</span>
                    <span className="text-slate-300">•</span>
                    <span className={`uppercase font-bold tracking-wider ${user.role === 'SUPER_ADMIN' ? 'text-purple-500' : 'text-indigo-500'}`}>{user.role.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className={`mr-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center ${user.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </div>
                <button 
                  onClick={() => navigate(`/super-admin/admins/edit/${user.id}`)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all bg-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;
