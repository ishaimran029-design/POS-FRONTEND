import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 p-10 bg-white border border-slate-200 rounded-3xl shadow-2xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 animate-pulse">
            <ShieldAlert size={48} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-slate-500">
            You don't have the required permissions to access this page. Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center space-x-2 w-full py-3 bg-slate-100 hover:bg-slate-750 border border-slate-700 rounded-xl transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
