import React from 'react';

interface FormWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ 
  title, 
  subtitle, 
  children, 
  maxWidth = "max-w-xl" 
}) => {
  return (
    <div className={`w-full ${maxWidth} mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center animate-in fade-in zoom-in duration-500`}>
      <div className="text-center mb-10 w-full">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 font-bold text-sm tracking-wide">{subtitle}</p>
        )}
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mx-auto mt-6" />
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
