import React from 'react';
import { Package, Plus, AlertTriangle } from 'lucide-react';

const InventoryManagement: React.FC = () => {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Package size={24} className="mr-3 text-purple-400" />
          Inventory Management
        </h2>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl text-sm font-bold transition-all">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Wireless Mouse', stock: 5, status: 'Low Stock' },
          { name: 'Mechanical Keyboard', stock: 24, status: 'In Stock' },
          { name: 'USB-C Hub', stock: 2, status: 'Out of Stock' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-100/30 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${item.stock <= 5 ? 'bg-amber-500/10 text-amber-500' : 'bg-purple-500/10 text-purple-400'}`}>
                {item.stock <= 5 ? <AlertTriangle size={18} /> : <Package size={18} />}
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">{item.name}</div>
                <div className="text-[10px] text-slate-500 font-black uppercase">{item.stock} items remaining</div>
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              item.status === 'In Stock' ? 'text-emerald-400 bg-emerald-500/10' : 
              item.status === 'Low Stock' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;
