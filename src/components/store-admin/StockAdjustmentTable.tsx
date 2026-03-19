import { History } from 'lucide-react';

const StockAdjustmentTable = ({ adjustments = [] }: { adjustments?: any[] }) => {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                <History className="text-blue-500" size={20} />
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Adjustments</h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Quantity</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Notes</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {adjustments.length > 0 ? (
                            adjustments.map((adj, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-800">{adj.product?.name || 'Deleted Product'}</span>
                                            <span className="text-[10px] text-gray-400 font-mono">{adj.product?.sku || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            adj.changeType === 'DAMAGE' ? 'bg-red-50 text-red-600' :
                                            adj.changeType === 'RETURN' ? 'bg-blue-50 text-blue-600' :
                                            adj.changeType === 'PURCHASE' ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {adj.changeType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-sm font-black ${
                                            adj.quantityChange > 0 ? 'text-emerald-600' : 'text-red-600'
                                        }`}>
                                            {adj.quantityChange > 0 ? '+' : ''}{adj.quantityChange}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-gray-500 truncate max-w-[200px]" title={adj.notes}>
                                            {adj.notes || '—'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-400">
                                            {new Date(adj.createdAt).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 uppercase">
                                                {adj.user?.name?.substring(0, 2) || 'S'}
                                            </div>
                                            <span className="text-xs font-bold text-gray-800">{adj.user?.name || 'System'}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-bold text-xs">
                                    No recent adjustments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockAdjustmentTable;
