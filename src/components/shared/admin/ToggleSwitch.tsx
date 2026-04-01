import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <label className={`flex items-center justify-between p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-indigo-100 transition-all ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{label}</span>
      <div className="relative inline-flex items-center group">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
