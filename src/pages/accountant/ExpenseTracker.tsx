import React from 'react';
import { Calculator, Plus, ArrowUpRight } from 'lucide-react';

const ExpenseTracker: React.FC = () => {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Calculator size={24} className="mr-3 text-amber-400" />
          Pending Expenses
        </h2>
        <button className="p-2 bg-amber-500/10 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Cloud Hosting Monthly', amount: '$450.00', date: 'Oct 24, 2025' },
          { label: 'Office Supplies', amount: '$120.50', date: 'Oct 22, 2025' },
          { label: 'Electricity Bill', amount: '$2,100.00', date: 'Oct 20, 2025' },
        ].map((expense, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-100/30 rounded-2xl border border-slate-700/50 hover:bg-slate-100/50 transition-all cursor-pointer">
            <div>
              <div className="font-bold text-sm tracking-tight">{expense.label}</div>
              <div className="text-[10px] text-slate-500 font-black uppercase">{expense.date}</div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-black text-slate-900">{expense.amount}</span>
              <ArrowUpRight size={14} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 border border-slate-700 border-dashed rounded-2xl text-slate-500 text-xs font-black uppercase tracking-widest hover:border-amber-500/30 hover:text-amber-400 transition-all">
        View All Ledger Entries
      </button>
    </div>
  );
};

export default ExpenseTracker;
