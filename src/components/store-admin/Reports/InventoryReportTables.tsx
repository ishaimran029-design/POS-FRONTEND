import React from 'react';
import { AlertTriangle, XCircle, Package } from 'lucide-react';

interface InventoryItem {
  id: string;
  totalQuantity: number;
  product: {
    name: string;
    sku: string;
    reorderLevel: number;
    sellingPrice: string;
  };
}

interface InventoryReportTablesProps {
  lowStock: InventoryItem[];
  outOfStock: InventoryItem[];
}

const InventoryReportTables: React.FC<InventoryReportTablesProps> = ({ lowStock, outOfStock }) => {
  const EmptyState = ({ title, icon: Icon }: { title: string; icon: any }) => (
    <div className="flex flex-col items-center justify-center py-12 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
      <Icon className="w-12 h-12 text-slate-200 mb-3" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{title}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Out of Stock Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100 shadow-sm">
            <XCircle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Out of Stock</h3>
            <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Immediate Attention Required</p>
          </div>
        </div>

        {outOfStock.length > 0 ? (
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {outOfStock.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.product.name}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.product.sku}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="All products in stock" icon={Package} />
        )}
      </div>

      {/* Low Stock Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100 shadow-sm">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Low Stock Alerts</h3>
            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Approaching Reorder Level</p>
          </div>
        </div>

        {lowStock.length > 0 ? (
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {lowStock.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.product.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{item.product.sku}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-rose-600">{item.totalQuantity}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{item.product.reorderLevel} units</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No low stock alerts" icon={Package} />
        )}
      </div>
    </div>
  );
};

export default InventoryReportTables;
