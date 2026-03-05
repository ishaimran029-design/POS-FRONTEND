import React from 'react';
import { ShoppingCart, Scan, CreditCard } from 'lucide-react';

const POSInterface: React.FC = () => {
  return (
    <div className="flex-1 flex overflow-hidden bg-white border border-slate-200 rounded-3xl h-[600px]">
      {/* Menu Area */}
      <section className="flex-1 p-6 overflow-auto border-r border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">POS Menu</h2>
          <div className="flex space-x-2">
            {['All', 'Food', 'Drinks'].map((cat, i) => (
              <button key={i} className={`px-4 py-1 text-[10px] font-black uppercase rounded-full ${i === 0 ? 'bg-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-100/40 p-4 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <div className="aspect-square bg-slate-700 rounded-xl mb-3 group-hover:bg-slate-600 transition-colors"></div>
              <div className="font-bold text-xs">Item SKU-00{i}</div>
              <div className="text-emerald-400 font-black text-sm mt-1">${(i * 12).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Area */}
      <aside className="w-80 flex flex-col bg-white/50">
        <div className="p-6 border-b border-slate-200 flex items-center space-x-2">
          <ShoppingCart size={20} className="text-emerald-400" />
          <h2 className="font-bold">Active Cart</h2>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center text-slate-600 p-6">
          <Scan size={48} className="mb-4 opacity-10" />
          <p className="text-xs font-bold text-center">SCAN PRODUCTS TO START TRANSACTION</p>
        </div>

        <div className="p-6 bg-slate-100/20 border-t border-slate-200 space-y-4">
          <div className="flex justify-between text-2xl font-black">
            <span>Total</span>
            <span className="text-emerald-400">$0.00</span>
          </div>
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-black rounded-2xl shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center space-x-2">
            <CreditCard size={18} />
            <span className="uppercase tracking-widest text-xs">Complete Sale</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default POSInterface;
