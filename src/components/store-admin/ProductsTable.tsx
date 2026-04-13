import { useState } from "react"
import { Box, Plus, Trash } from "lucide-react"
import { DataTable } from "@/components/global-components/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/format"
import ProductStockBadge from "./ProductStockBadge"
import AddStockModal from "./AddStockModal"

export default function ProductsTable({ data, onRefresh }: any) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);

    const handleAddStock = (product: any) => {
        setSelectedProduct(product);
        setIsStockModalOpen(true);
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "image",
            header: "Product",
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 dark:border-slate-800 flex flex-shrink-0 items-center justify-center overflow-hidden shadow-sm group-hover:border-indigo-600/20 transition-all">
                        {(row.original.imageUrl || row.original.image) ? (
                            <img 
                                src={row.original.imageUrl || (row.original.image?.startsWith('http') ? row.original.image : `http://localhost:3005${row.original.image}`)} 
                                alt={row.original.name} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                <Box size={20} strokeWidth={1.5} />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                             <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none">{row.original.name}</p>
                             <Badge variant={row.original.isActive ? "success" : "destructive"} className="uppercase tracking-[1.5px] text-[8px] font-black p-1 leading-none">
                                {row.original.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] mt-1.5 truncate leading-none">SKU: {row.original.sku || 'N/A'}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <Badge variant="secondary" className="uppercase tracking-widest text-[9px] font-black">
                    {row.original.category?.name || 'General'}
                </Badge>
            )
        },
        {
            accessorKey: "purchasePrice",
            header: () => <div className="text-right">Price (B/S)</div>,
            cell: ({ row }) => (
                <div className="text-right space-y-1">
                    <div className="text-[11px] font-black text-slate-400 font-num leading-none">{formatCurrency(Number(row.original.purchasePrice))}</div>
                    <div className="text-[12px] font-black text-indigo-600 font-num leading-none">{formatCurrency(Number(row.original.sellingPrice))}</div>
                </div>
            )
        },
        {
            accessorKey: "stock",
            header: () => <div className="text-center">Inventory</div>,
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <ProductStockBadge stock={row.original.stock ?? 0} reorderLevel={row.original.reorderLevel} />
                </div>
            )
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => (
                <div className="flex gap-2 justify-end">
                    <button 
                        onClick={() => handleAddStock(row.original)}
                        className="p-2.5 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl transition-all active:scale-95 flex items-center gap-2 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 group/btn shadow-sm"
                        title="Add Stock"
                    >
                        <Plus size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Add Stock</span>
                    </button>
                    <button className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all active:scale-95">
                        <Trash size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <DataTable 
                columns={columns} 
                data={data} 
                searchKey="name"
                placeholder="Search catalog by name or SKU..."
                showExport
                exportFilename="Product-Catalog-Registry"
            />

            <AddStockModal 
                open={isStockModalOpen} 
                onClose={() => setIsStockModalOpen(false)} 
                product={selectedProduct} 
                onSuccess={onRefresh}
            />
        </div>
    )
}
