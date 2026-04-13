import React from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  children, 
  isLoading, 
  loadingText = "Processing...", 
  icon, 
  className = "", 
  ...props 
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-3xl font-extrabold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none font-num ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
