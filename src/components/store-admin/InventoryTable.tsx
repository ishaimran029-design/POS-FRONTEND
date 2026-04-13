import { Box, User as UserIcon, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { DataTable } from '@/components/global-components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import type { InventoryMovement } from "@/pages/store-admin/inventory/InventoryManagementPage";

interface Props {
  movements: InventoryMovement[];
  loading: boolean;
}

const InventoryTable = ({ movements, loading }: Props) => {
  const columns: ColumnDef<InventoryMovement>[] = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => (
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-num">
          {row.original.timestamp}
        </div>
      )
    },
    {
      accessorKey: "productName",
      header: "Product Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 dark:border-slate-800 flex flex-shrink-0 items-center justify-center overflow-hidden shadow-sm">
            {row.original.image ? (
              <img src={row.original.image} alt={row.original.productName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                <Box size={16} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{row.original.productName}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2.5px] mt-0.5 truncate leading-none">SKU: {row.original.sku}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: "quantityChange",
      header: "Movement",
      cell: ({ row }) => {
        const qty = row.original.quantityChange;
        return (
          <div className="flex items-center gap-2">
            {qty > 0 ? (
              <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 text-rose-500" />
            )}
            <span className={`text-[12px] font-black tabular-nums ${qty > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {qty > 0 ? '+' : ''}{qty}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: "changeType",
      header: "Ref & Type",
      cell: ({ row }) => {
        const type = row.original.changeType;
        const variants: any = {
           sale: "secondary",
           restock: "success",
           adjustment: "destructive"
        };
        return (
          <div className="space-y-1">
             <Badge variant={variants[type] || "outline"} className="uppercase tracking-widest text-[9px] font-black p-1 leading-none">
              {type}
            </Badge>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              ID: {row.original.referenceId}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "user",
      header: "Operator",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
            <UserIcon className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <span className="text-[11px] font-black text-slate-600 dark:text-slate-300">{row.original.user}</span>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <DataTable 
        columns={columns} 
        data={movements} 
        isLoading={loading}
        searchKey="productName"
        placeholder="Search audit trail by product or SKU..."
        showExport
        exportFilename="Inventory-Audit-Registry"
      />
    </div>
  );
};

export default InventoryTable;

