import type { InventoryMovement } from "@/pages/store-admin/inventory/InventoryManagementPage"

interface Props {
  movement: InventoryMovement
  index: number
}

const InventoryRow = ({ movement, index }: Props) => {
  const quantityColor =
    movement.quantityChange > 0
      ? "text-emerald-600 bg-emerald-50 border-emerald-100"
      : "text-rose-600 bg-rose-50 border-rose-100"

  const changeTypeBadge = () => {
    const type = movement.changeType.toLowerCase();
    switch (type) {
      case "sale":
        return <span className="px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg text-[10px] font-medium uppercase tracking-widest">Sale</span>;
      case "purchase":
      case "restock":
        return <span className="px-2.5 py-1 bg-indigo-600/5 text-indigo-600 border border-indigo-600/10 rounded-lg text-[10px] font-medium uppercase tracking-widest">Stock In</span>;
      case "adjustment":
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Adjustment</span>;
      case "opening_stock":
        return <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Opening</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg text-[10px] font-medium uppercase tracking-widest">{movement.changeType}</span>;
    }
  }

  return (
    <tr className="hover:bg-[#2563EB]/5 transition-all duration-300 group cursor-pointer">
      <td className="px-6 py-4 text-slate-400 font-mono text-[10px]">
        {index.toString().padStart(2, '0')}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#2563EB]/20 transition-colors">
            <img
              src={movement.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'}
              alt={movement.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
              {movement.productName}
            </div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
              SKU: {movement.sku}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tabular-nums border ${quantityColor}`}>
          {movement.quantityChange > 0 ? "+" : ""}
          {movement.quantityChange}
        </span>
      </td>
      <td className="px-6 py-4 capitalize">
        {changeTypeBadge()}
      </td>
      <td className="px-6 py-4 text-slate-500 font-medium text-[10px] tracking-widest uppercase">
        {movement.referenceId}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/5 border border-indigo-600/10 text-indigo-600 flex items-center justify-center text-[10px] font-medium">
            {movement.user ? movement.user.charAt(0) : "U"}
          </div>
          <span className="text-[11px] font-medium text-slate-700 uppercase tracking-tight">{movement.user}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-[11px] font-medium text-slate-400 tabular-nums">
        {movement.timestamp}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-slate-300 hover:text-[#2563EB] hover:bg-white transition-all p-2 rounded-xl active:scale-95 shadow-sm border border-transparent hover:border-[#2563EB]/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default InventoryRow
