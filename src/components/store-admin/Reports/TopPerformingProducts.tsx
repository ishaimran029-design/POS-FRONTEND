import React from 'react';
import { PackageSearch } from 'lucide-react';

interface TopPerformingProductsProps {
  products: any[];
}

const TopPerformingProducts: React.FC<TopPerformingProductsProps> = ({ products }) => {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mt-10">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Top Performing Products</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Items generating the most revenue</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
          <PackageSearch size={22} strokeWidth={2.5} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Product Name</th>
              <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">SKU / ID</th>
              <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Units Sold</th>
              <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Revenue Generated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products && products.length > 0 ? (
              products.map((product, idx) => (
                <tr key={product.productId || product.id || idx} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <td className="py-5 px-6">
                    <div className="font-bold text-slate-900">{product.name || 'Unknown Product'}</div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="font-inter text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 uppercase">
                      {product.sku || product.productId?.slice(-6) || 'N/A'}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="font-inter font-bold text-slate-900">{Number(product.quantitySold ?? 0).toLocaleString()}</div>
                  </td>
                  <td className="py-5 px-6 text-right">
                     <div className="font-inter font-extrabold text-[#262255]">
                       ₹ {Math.round(product.revenue ?? 0).toLocaleString()}
                     </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <p className="font-inter text-sm font-medium text-slate-400">No product performance data available yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingProducts;
