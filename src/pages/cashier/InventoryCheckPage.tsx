import React, { useEffect, useState } from 'react';
import { Package, RefreshCcw, AlertTriangle, XCircle } from 'lucide-react';
import { fetchLowStockInventory } from '../../api/inventory.api';

type InventoryItem = {
  id: string;
  name: string;
  stock: number;
  threshold?: number;
};

const InventoryCheckPage: React.FC = () => {
  const [lowStock, setLowStock] = useState<InventoryItem[]>([]);
  const [outOfStock, setOutOfStock] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await fetchLowStockInventory();
      if (res.data?.success && Array.isArray(res.data.data)) {
        const raw = res.data.data as any[];
        const mapped: InventoryItem[] = raw.map((row) => ({
          id: row.product?.id ?? row.productId,
          name: row.product?.name ?? 'Unknown',
          stock: Number(row.totalQuantity ?? 0),
          threshold: Number(row.product?.reorderLevel ?? 0),
        }));
        setLowStock(mapped.filter((i) => i.stock > 0));
        setOutOfStock(mapped.filter((i) => i.stock <= 0));
      }
    } catch {
      // swallow for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div className="min-h-[520px] flex flex-col bg-white border border-slate-200 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Package size={20} className="text-emerald-500" />
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">
              Inventory Status
            </h1>
            <p className="text-xs text-slate-500">
              Quick view of low and out-of-stock items.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadInventory}
          className="inline-flex items-center space-x-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50"
        >
          <RefreshCcw size={13} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-xs">
        <div className="inline-flex items-center space-x-2 rounded-full bg-amber-50 px-3 py-1 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} />
          <span className="font-semibold">
            Low stock items: {lowStock.length}
          </span>
        </div>
        <div className="inline-flex items-center space-x-2 rounded-full bg-red-50 px-3 py-1 border border-red-200 text-red-800">
          <XCircle size={14} />
          <span className="font-semibold">
            Out of stock: {outOfStock.length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-xs text-slate-500">
          Loading inventory...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-amber-700 mb-2">
              Low Stock Items
            </h2>
            {lowStock.length === 0 ? (
              <div className="text-xs text-slate-500">
                No low stock items.
              </div>
            ) : (
              <ul className="space-y-1 text-xs">
                {lowStock.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">
                      {item.name}
                    </span>
                    <span className="text-slate-600">
                      {item.stock} in stock
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-red-700 mb-2">
              Out of Stock Items
            </h2>
            {outOfStock.length === 0 ? (
              <div className="text-xs text-slate-500">
                No out-of-stock items.
              </div>
            ) : (
              <ul className="space-y-1 text-xs">
                {outOfStock.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">
                      {item.name}
                    </span>
                    <span className="text-slate-600">0 in stock</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCheckPage;

