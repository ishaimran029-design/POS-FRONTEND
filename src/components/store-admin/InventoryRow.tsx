import React from "react"
import { InventoryMovement } from "@/pages/InventoryManagement"

interface Props {
  movement: InventoryMovement
}

const InventoryRow: React.FC<Props> = ({ movement }) => {
  const quantityColor =
    movement.quantityChange > 0
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100"

  const changeTypeBadge = () => {
    switch (movement.changeType) {
      case "sale":
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs uppercase font-medium">Sale</span>;
      case "restock":
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs uppercase font-medium">Restock</span>;
      case "adjustment":
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs uppercase font-medium">Adjustment</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs uppercase font-medium">{movement.changeType}</span>;
    }
  }

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-4 flex items-center gap-3">
        <img
          src={movement.image || 'https://via.placeholder.com/40'}
          alt={movement.productName}
          className="w-10 h-10 rounded object-cover shadow-sm bg-gray-100"
        />
        <div>
          <div className="font-medium text-gray-900">
            {movement.productName}
          </div>
          <div className="text-xs text-gray-500">
            SKU: {movement.sku}
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded text-sm font-semibold ${quantityColor}`}>
          {movement.quantityChange > 0 ? "+" : ""}
          {movement.quantityChange}
        </span>
      </td>
      <td className="p-4 capitalize">
        {changeTypeBadge()}
      </td>
      <td className="p-4 text-gray-600 font-medium text-sm">
          {movement.referenceId}
      </td>
      <td className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {movement.user.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700">{movement.user}</span>
          </div>
      </td>
      <td className="p-4 text-sm text-gray-500">
          {movement.timestamp}
      </td>
      <td className="p-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        </button>
      </td>
    </tr>
  )
}

export default InventoryRow
