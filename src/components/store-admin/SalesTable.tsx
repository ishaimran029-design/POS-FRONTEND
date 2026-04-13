import React from "react"
import { MoreHorizontal, Ban, RotateCcw, CreditCard } from "lucide-react"
import { DataTable } from "@/components/global-components/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/format"
import type { SaleTransaction } from "@/types/sales"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  transactions: SaleTransaction[]
  loading: boolean
  onCancel: (id: string) => void
  onRefund: (id: string) => void
}

const SalesTable: React.FC<Props> = ({ transactions, loading, onCancel, onRefund }) => {
  const columns: ColumnDef<SaleTransaction>[] = [
    {
      accessorKey: "date",
      header: "Registry Date",
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : (row.original.date ? new Date(row.original.date) : null);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 dark:text-white font-num leading-none">
              {date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {date ? date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'Pending'}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: "customer",
      header: "Reference & Identity",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black uppercase shadow-sm">
             {row.original.customer && row.original.customer !== "Guest" ? row.original.customer.charAt(0) : "G"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none">
                {row.original.customer || "Guest Instance"}
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                Ref: {row.original.invoiceNumber}
            </span>
          </div>
        </div>
      )
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="text-right">Settlement</div>,
      cell: ({ row }) => {
        const amount = typeof row.original.totalAmount === 'number' 
          ? row.original.totalAmount 
          : parseFloat(String(row.original.totalAmount || "0"));
        return (
          <div className="text-right flex flex-col items-end">
            <span className="text-[14px] font-black text-slate-900 dark:text-white font-num leading-none">{formatCurrency(amount)}</span>
            {row.original._count?.saleItems && (
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{row.original._count.saleItems} Units</span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "paymentMethod",
      header: "Channel",
      cell: ({ row }) => (
        <Badge variant="outline" className="uppercase tracking-[1.5px] text-[9px] font-black bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex items-center gap-1.5 w-fit">
           <CreditCard size={10} />
           {row.original.paymentMethod || "CASH"}
        </Badge>
      )
    },
    {
      accessorKey: "status",
      header: "Registry Status",
      cell: ({ row }) => {
        const statuses: any = {
           COMPLETED: "success",
           PENDING: "warning",
           FAILED: "destructive",
           REFUNDED: "secondary"
        };
        const status = (row.original.status || row.original.paymentStatus || "PENDING").toUpperCase();
        return (
          <Badge variant={statuses[status] || "outline"} className="uppercase tracking-[2px] text-[9px] font-black px-2.5">
            {status}
          </Badge>
        );
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition-colors border border-transparent hover:border-slate-200">
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-2xl border-slate-100 dark:border-slate-800">
              <DropdownMenuItem 
                 className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-3"
                 onClick={() => onCancel(row.original.id)}
              >
                <Ban size={14} />
                Abort Sale
              </DropdownMenuItem>
              <DropdownMenuItem 
                 className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 cursor-pointer flex items-center gap-3"
                 onClick={() => onRefund(row.original.id)}
              >
                <RotateCcw size={14} />
                Credit Refund
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <DataTable 
        columns={columns} 
        data={transactions} 
        isLoading={loading}
        searchKey="invoiceNumber"
        placeholder="Filter by invoice reference..."
        showExport
        exportFilename="Sales-Registry-Log"
      />
    </div>
  )
}

export default SalesTable;
