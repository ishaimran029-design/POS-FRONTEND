import React from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, XCircle, Eye } from 'lucide-react';
import InventoryStatsWidget from './InventoryStatsWidget';

interface InventoryQuickViewProps {
  className?: string;
}

/**
 * InventoryQuickView Component
 * 
 * Displays a quick overview of inventory status on the cashier dashboard.
 * Shows key metrics and provides easy access to the full inventory check page.
 * 
 * Features:
 * - Summary stats widget
 * - Link to detailed inventory check
 * - Responsive design
 */
const InventoryQuickView: React.FC<InventoryQuickViewProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Package size={20} className="text-emerald-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Inventory Overview</h3>
            <p className="text-xs text-slate-500">Current stock status</p>
          </div>
        </div>
      </div>

      {/* Stats Widget */}
      <InventoryStatsWidget />

      {/* View Full Details Button */}
      <Link
        to="/cashier/inventory"
        className="inline-flex items-center justify-center w-full space-x-2 px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium transition-colors text-sm"
      >
        <Eye size={16} />
        <span>View Full Details</span>
      </Link>
    </div>
  );
};

export default InventoryQuickView;
