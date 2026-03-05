import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  variant?: 'indigo' | 'purple' | 'amber' | 'emerald';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  variant = 'indigo' 
}) => {
  const variantStyles = {
    indigo: 'hover:border-indigo-300 group-hover:text-indigo-600 shadow-indigo-100',
    purple: 'hover:border-purple-300 group-hover:text-purple-600 shadow-purple-100',
    amber: 'hover:border-amber-300 group-hover:text-amber-600 shadow-amber-100',
    emerald: 'hover:border-emerald-300 group-hover:text-emerald-600 shadow-emerald-100',
  };

  const isPositive = change.startsWith('+') || change.includes('Healthy') || change.includes('All');

  return (
    <div className={`p-6 bg-white border border-slate-200 rounded-2xl transition-all shadow-sm group hover:shadow-md ${variantStyles[variant].split(' ')[0]} ${variantStyles[variant].split(' ')[2]}`}>
      <div className="text-slate-500 text-sm font-semibold tracking-wide mb-1">{title}</div>
      <div className={`text-4xl font-extrabold tracking-tight mb-2 text-slate-800 transition-colors ${variantStyles[variant].split(' ')[1]}`}>
        {value}
      </div>
      <div className={`text-sm font-bold flex items-center ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
        {change} <span className="text-slate-400 ml-1.5 font-medium text-xs">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
