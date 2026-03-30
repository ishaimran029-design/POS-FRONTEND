import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: any;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  error, 
  registration, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="w-full space-y-1.5 focus-within:z-10 relative">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">
        {label}
      </label>
      <input
        {...registration}
        {...props}
        className={`w-full px-5 py-3.5 bg-slate-50/50 border-2 ${
          error ? 'border-rose-500/50' : 'border-slate-100'
        } rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all ${className}`}
      />
      {error && (
        <span className="text-[10px] font-bold text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
