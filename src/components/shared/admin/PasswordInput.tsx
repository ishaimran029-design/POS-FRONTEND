import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  error, 
  registration, 
  className = "", 
  ...props 
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full space-y-1.5 focus-within:z-10 relative">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">
        {label}
      </label>
      <div className="relative group">
        <input
          {...registration}
          {...props}
          type={show ? 'text' : 'password'}
          className={`w-full pl-5 pr-14 py-3.5 bg-slate-50/50 border-2 ${
            error ? 'border-rose-500/50' : 'border-slate-100'
          } rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all ${className}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <span className="text-[10px] font-bold text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
