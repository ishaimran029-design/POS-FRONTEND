import React from 'react';
import { MoreHorizontal, History } from 'lucide-react';

interface InventoryItem {
    id: string;
    productName: string;
    sku: string;
    image?: string;
    currentStock: number;
    reorderLevel: number;
    category?: string;
}

interface Props {
    items: InventoryItem[];
    loading: boolean;
}

const StockTable: React.FC<Props> = ({ items, loading }) => {
    const getStatusBadge = (current: number, reorder: number) => {
        if (current === 0) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200">
                    Out of Stock
                </span>
            );
        }
        if (current <= reorder) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                    Low Stock
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                OK
            </span>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="p-12 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2563EB] rounded-full animate-spin mb-4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">#</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Details</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Stock</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Reorder Level</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-[#2563EB]/5 transition-all duration-300 group cursor-pointer">
                                <td className="px-6 py-4 text-xs font-bold text-gray-400">
                                    {String(idx + 1).padStart(2, '0')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                                                    img
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#1E1B4B] transition-colors">{item.productName}</p>
                                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{item.sku}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600 text-sm font-medium">{item.category || 'Uncategorized'}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-sm font-black ${item.currentStock <= item.reorderLevel ? 'text-rose-600' : 'text-gray-900'}`}>
                                        {item.currentStock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-gray-400 text-sm font-medium">{item.reorderLevel}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {getStatusBadge(item.currentStock, item.reorderLevel)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-[#2563EB] hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-[#2563EB]/10" title="View History">
                                            <History size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-[#2563EB] hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-[#2563EB]/10" title="Log Adjustment">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockTable;
