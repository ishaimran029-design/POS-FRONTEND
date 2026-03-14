import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';

const topProducts = [
    { rank: 1, name: 'Signature Caramel Latte', revenue: 42580, units: 852 },
    { rank: 2, name: 'Artisan Butter Croissant', revenue: 28450, units: 1138 },
    { rank: 3, name: 'Organic Matcha Brew', revenue: 18900, units: 420 },
    { rank: 4, name: 'Everything Bagel & Cream Cheese', revenue: 14200, units: 568 },
    { rank: 5, name: 'Cold Brew Coffee', revenue: 9800, units: 326 },
];

const TopPerformingProducts: React.FC = () => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-fade-in hover:shadow-lg transition-all duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Top Performing Products</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ranked by revenue generation</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                    View All Products
                    <ArrowUpRight size={14} />
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Rank</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Revenue</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Units Sold</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {topProducts.map((product) => (
                            <tr key={product.rank} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${
                                        product.rank === 1 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                        : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {product.rank === 1 ? <Award size={14} /> : product.rank}
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-sm font-bold text-slate-900">{product.name}</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <span className="text-sm font-black text-slate-900 tabular-nums">
                                        ₹ {product.revenue.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <span className="text-xs font-black text-slate-400 tabular-nums">
                                        {product.units.toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPerformingProducts;
