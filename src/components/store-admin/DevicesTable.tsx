import { Cpu, Usb, Bluetooth, Trash2, Edit2, User, Globe } from "lucide-react"
import { DataTable } from "@/components/global-components/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { Device } from "@/pages/store-admin/devices-management/types/device.types"

export default function DevicesTable({ data, onDelete }: { data: Device[]; onDelete: (id: string) => Promise<boolean> }) {
    const columns: ColumnDef<Device>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <span className="text-[10px] font-black text-slate-400 font-num uppercase tracking-widest pl-1">
                    {String(row.index + 1).padStart(2, '0')}
                </span>
            )
        },
        {
            accessorKey: "name",
            header: "Terminal Hub",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                        <Cpu size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{row.original.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Registry Node</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "serialNumber",
            header: "Hardware ID",
            cell: ({ row }) => (
                <Badge variant="outline" className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                    {row.original.serialNumber}
                </Badge>
            )
        },
        {
            accessorKey: "status",
            header: "State",
            cell: ({ row }) => {
                const status = row.original.status?.toUpperCase() || "OFFLINE";
                const variants: any = {
                    ONLINE: "success",
                    BUSY: "warning",
                    OFFLINE: "destructive",
                    MAINTENANCE: "secondary"
                };
                return (
                    <Badge variant={variants[status] || "outline"} className="uppercase tracking-[2px] text-[9px] font-black px-2.5">
                        {status}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "connectedTo",
            header: "Assigned User",
            cell: ({ row }) => (
                row.original.connectedTo ? (
                    <div className="flex items-center gap-2 px-2.5 py-1 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl w-fit">
                        <User size={10} className="text-indigo-600 dark:text-indigo-400" strokeWidth={3} />
                        <span className="text-[9px] font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">{row.original.connectedTo}</span>
                    </div>
                ) : (
                    <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[2.5px] px-2.5 py-1 bg-slate-50/30 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-xl">Available</span>
                )
            )
        },
        {
            accessorKey: "lastHeartbeat",
            header: "Sync Horizon",
            cell: ({ row }) => {
                const [date, time] = row.original.lastHeartbeat.split(',');
                return (
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{date}</span>
                        {time && <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{time.trim()}</span>}
                    </div>
                );
            }
        },
        {
            accessorKey: "ipAddress",
            header: "Network",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-slate-400">
                    <Globe size={10} />
                    <span className="text-[10px] font-black font-num uppercase tracking-widest">{row.original.ipAddress}</span>
                </div>
            )
        },
        {
             accessorKey: "scanner",
             header: "Peripherals",
             cell: ({ row }) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400">
                        {row.original.scanner === "USB" ? <Usb size={12} /> : <Bluetooth size={12} />}
                    </div>
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{row.original.scanner}</span>
                </div>
             )
        },
        {
            id: "actions",
            header: () => <div className="text-right">Management</div>,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <button className="h-9 w-9 flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800/20">
                        <Edit2 size={15} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
                                onDelete(row.original.id);
                            }
                        }}
                        className="h-9 w-9 flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-800/20"
                    >
                        <Trash2 size={15} />
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
                placeholder="Search terminal nodes..."
                showExport
                exportFilename="Hardware-Infrastructure-Log"
            />
        </div>
    )
}
