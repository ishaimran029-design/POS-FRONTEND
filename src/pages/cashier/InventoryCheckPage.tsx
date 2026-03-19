import React, { useState } from 'react';
import { Package, AlertTriangle, XCircle } from 'lucide-react';
import InventoryDisplay from '../../components/cashier/InventoryDisplay';

type ViewMode = 'all' | 'low-stock' | 'out-of-stock';

/**
 * InventoryCheckPage Component
 * 
 * Displays inventory information for cashier shift management.
 * Allows filtering between all items, low stock, and out of stock items.
 * 
 * API Integration:
 * - Fetches inventory data via InventoryDisplay component
 * - Proper error handling and loading states
 * - Manual refresh capability
 */
const InventoryCheckPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  return (
    <div className="min-h-[520px] flex flex-col bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 mb-4">
          <Package size={24} className="text-emerald-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Inventory Check
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Monitor stock levels and availability of all products
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Package size={16} />
              <span>All Items</span>
            </span>
          </button>

          <button
            onClick={() => setViewMode('low-stock')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'low-stock'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <AlertTriangle size={16} />
              <span>Low Stock</span>
            </span>
          </button>

          <button
            onClick={() => setViewMode('out-of-stock')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'out-of-stock'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <XCircle size={16} />
              <span>Out of Stock</span>
            </span>
          </button>
        </div>
      </div>

      {/* Inventory Display Component */}
      <div className="flex-1">
        <InventoryDisplay
          showLowStockOnly={viewMode === 'low-stock'}
          showOutOfStockOnly={viewMode === 'out-of-stock'}
        />
      </div>
    </div>
  );
};

export default InventoryCheckPage;

