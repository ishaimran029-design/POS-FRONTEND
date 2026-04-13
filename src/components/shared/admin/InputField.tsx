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
      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] ml-1 font-num">
        {label}
      </label>
      <input
        {...registration}
        {...props}
        className={`w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 ${
          error ? 'border-rose-500/50 text-rose-600' : 'text-slate-900'
        } rounded-2xl font-bold text-sm placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 transition-all font-num ${className}`}
      />
      {error && (
        <span className="text-[9px] font-bold text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1 font-num uppercase tracking-wider">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
