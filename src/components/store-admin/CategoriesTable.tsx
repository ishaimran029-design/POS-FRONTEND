import { FolderOpen } from "lucide-react"
import { DataTable } from "@/components/global-components/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/types/category"

interface Props {
  categories: Category[]
  loading: boolean
}

const CategoriesTable = ({ categories, loading }: Props) => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-num">
          {String(row.index + 1).padStart(2, '0')}
        </div>
      )
    },
    {
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-800">
             <FolderOpen size={16} />
          </div>
          <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {row.original.name}
          </span>
        </div>
      )
    },
    {
      accessorKey: "subCategories",
      header: "Sub Category",
      cell: ({ row }) => {
        const subCount = (row.original as any).subCategories?.length || 0;
        return (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              {subCount > 0 ? `${subCount} Segments` : 'Root Only'}
            </span>
          </div>
        );
      }
    },
    {
      id: "items",
      header: "Assigned Items",
      cell: ({ row }) => {
        const productCount = (row.original as any)._count?.products || 0;
        return (
          <Badge variant={productCount > 0 ? "success" : "secondary"} className="uppercase tracking-widest text-[9px] font-black">
            {productCount} Products
          </Badge>
        );
      }
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <DataTable 
        columns={columns} 
        data={categories} 
        isLoading={loading}
        searchKey="name"
        placeholder="Search category registry..."
        showExport
        exportFilename="Category-Hierarchy-Report"
      />
    </div>
  )
};

export default CategoriesTable;
