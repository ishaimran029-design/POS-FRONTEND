import { MoreVertical, Search, Filter } from 'lucide-react';
import type { Product } from '../types';

interface TopProductsTableProps {
    products: Product[];
}

export default function TopProductsTable({ products }: TopProductsTableProps) {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Top Selling Inventory</h3>
                    <p className="text-sm text-slate-500 font-medium">Most popular products this month</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Filter items..." className="pl-12 pr-4 py-2 bg-slate-100/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400 w-full sm:w-48" />
                    </div>
                    <button className="p-2.5 bg-slate-100/50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-8 py-5">Product Details</th>
                            <th className="px-8 py-5">SKU</th>
                            <th className="px-8 py-5">Units Sold</th>
                            <th className="px-8 py-5 text-right">Revenue</th>
                            <th className="px-8 py-5">Stock Intensity</th>
                            <th className="px-4 py-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.map((product) => (
                            <tr key={product.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                                            <span className="font-black text-xs uppercase">{product.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{product.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Category ID: 10{product.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-mono text-xs font-black text-slate-400">{product.sku}</td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-slate-900 text-sm">{product.unitsSold}</span>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">+5.2%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right font-black text-slate-900 text-sm">${product.revenue.toLocaleString()}</td>
                                <td className="px-8 py-5 min-w-[180px]">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className={product.stockLevel < 30 ? 'text-rose-500' : 'text-slate-400'}>{product.stockLevel < 30 ? 'Critical' : 'Good'}</span>
                                            <span className="text-slate-900">{product.stockLevel}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-1000 ${product.stockLevel < 30 ? 'bg-rose-500' : product.stockLevel < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${product.stockLevel}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-5 text-right">
                                    <button className="p-2 text-slate-300 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-6 bg-slate-50/50 flex justify-center border-t border-slate-50">
                <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline px-4 py-2">View Full Inventory Analytics</button>
            </div>
        </div>
    );
}
