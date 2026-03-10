export default function ProductStockBadge({ stock }: { stock: number }) {

    if (stock === 0)
        return (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                Out of stock
            </span>
        )

    if (stock < 10)
        return (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                Low stock
            </span>
        )

    return (
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
            {stock} units
        </span>
    )

}
