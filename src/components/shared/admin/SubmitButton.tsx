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
      className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1a192b] text-white rounded-2xl font-black text-xs uppercase tracking-[3px] shadow-xl shadow-indigo-900/10 hover:bg-[#2a2940] hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-indigo-900/20 active:translate-y-[0] transition-all disabled:opacity-70 disabled:pointer-events-none ${className}`}
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
