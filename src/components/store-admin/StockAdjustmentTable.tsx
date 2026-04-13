import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { History, User as UserIcon } from 'lucide-react';
import { DataTable } from '@/components/global-components/data-table';

const StockAdjustmentTable = ({ adjustments = [] }: { adjustments?: any[] }) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "createdAt",
            header: "Date",
            cell: ({ row }) => (
                <div className="text-xs font-bold text-slate-500 font-num">
                    {new Date(row.original.createdAt).toLocaleString()}
                </div>
            )
        },
        {
            id: "product",
            header: "Product",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        {row.original.product?.name || 'Deleted Product'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">
                        SKU: {row.original.product?.sku || 'N/A'}
                    </span>
                </div>
            )
        },
        {
            accessorKey: "changeType",
            header: "Type",
            cell: ({ row }) => {
                const type = row.original.changeType;
                const variants: any = {
                    DAMAGE: "destructive",
                    RETURN: "secondary",
                    PURCHASE: "success",
                };
                return (
                    <Badge variant={variants[type] || "outline"} className="uppercase tracking-widest text-[9px] font-black px-2.5">
                        {type}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "quantityChange",
            header: () => <div className="text-center">Quantity</div>,
            cell: ({ row }) => (
                <div className={`text-center text-sm font-black tabular-nums ${row.original.quantityChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {row.original.quantityChange > 0 ? '+' : ''}{row.original.quantityChange}
                </div>
            )
        },
        {
            accessorKey: "user",
            header: "Executed By",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <UserIcon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">{row.original.user?.name || 'System'}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            {row.original.user?.role?.replace('_', ' ') || 'Process'}
                        </div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "notes",
            header: "Notes",
            cell: ({ row }) => (
                <p className="text-[11px] font-bold text-slate-500 truncate max-w-[150px]" title={row.original.notes}>
                    {row.original.notes || '—'}
                </p>
            )
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <History className="text-blue-500 h-5 w-5" />
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Audit Logs: Stock Movements</h3>
                </div>
            </div>
            
            <DataTable 
                columns={columns} 
                data={adjustments} 
                searchKey="notes"
                placeholder="Search audit trail by notes..."
                showExport
                exportFilename="Stock-Adjustment-Audit-Log"
            />
        </div>
    );
};

export default StockAdjustmentTable;
