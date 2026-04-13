import React from 'react';
import { Box } from 'lucide-react';
import { DataTable } from '@/components/global-components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

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
    const columns: ColumnDef<InventoryItem>[] = [
        {
            accessorKey: "productName",
            header: "Product Details",
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 dark:border-slate-800 flex flex-shrink-0 items-center justify-center overflow-hidden shadow-sm group-hover:border-indigo-600/20 transition-all font-num">
                        {row.original.image ? (
                            <img src={row.original.image} alt={row.original.productName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                <Box size={20} strokeWidth={1.5} />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{row.original.productName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mt-0.5 truncate leading-none">SKU: {row.original.sku}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <Badge variant="secondary" className="uppercase tracking-widest text-[9px] font-black">
                    {row.original.category || 'General'}
                </Badge>
            )
        },
        {
            accessorKey: "currentStock",
            header: () => <div className="text-right">Stock</div>,
            cell: ({ row }) => (
                <div className={`text-right text-[11px] font-black uppercase tracking-widest tabular-nums ${row.original.currentStock <= row.original.reorderLevel ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>
                    {row.original.currentStock}
                </div>
            )
        },
        {
            accessorKey: "reorderLevel",
            header: () => <div className="text-right">Reorder</div>,
            cell: ({ row }) => (
                <div className="text-right text-slate-400 text-[11px] font-black uppercase tracking-widest tabular-nums leading-none">
                    {row.original.reorderLevel}
                </div>
            )
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const current = row.original.currentStock;
                const reorder = row.original.reorderLevel;
                if (current === 0) return <Badge variant="destructive" className="uppercase tracking-[1px] text-[9px] font-black">Out of Stock</Badge>;
                if (current <= reorder) return <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none uppercase tracking-[1px] text-[9px] font-black">Low Stock</Badge>;
                return <Badge variant="success" className="uppercase tracking-[1px] text-[9px] font-black">Healthy</Badge>;
            }
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <DataTable 
                columns={columns} 
                data={items} 
                isLoading={loading}
                searchKey="productName"
                placeholder="Search inventory by product name or SKU..."
                showExport
                exportFilename="Stock-Level-Report"
            />
        </div>
    );
};

export default StockTable;
