import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const FinancialOverview: React.FC = () => {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart3 size={24} className="mr-3 text-amber-400" />
          Financial Health
        </h2>
        <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
          Q1 Report
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-48 flex items-end space-x-3">
          {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
            <div key={i} className="flex-1 bg-amber-500/10 hover:bg-amber-500/30 transition-all rounded-t-xl group/bar relative" style={{ height: `${h}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[10px] font-black text-amber-400">
                ${h}k
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-black text-slate-600 tracking-tighter px-2">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span>
        </div>

        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <TrendingUp size={16} className="text-emerald-400" />
            <div className="text-xs font-bold text-slate-500">Net Profit <span className="text-slate-900 ml-1">$51,760</span></div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingDown size={16} className="text-red-400" />
            <div className="text-xs font-bold text-slate-500">Total Tax <span className="text-slate-900 ml-1">$8,421</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
