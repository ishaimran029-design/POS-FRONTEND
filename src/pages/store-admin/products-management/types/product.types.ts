export interface Product {
    id: string
    name: string
    sku: string
    barcode: string
    category: string
    purchasePrice: number
    sellingPrice: number
    stock: number
    status: "active" | "inactive"
}
