import { useEffect, useState } from "react"
import { fetchProducts } from "@/api/products.api"
import type { Product } from "../types/product.types"

export const useProductsData = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const limit = 10

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        setLoading(true)
        try {
            const res = await fetchProducts()
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                setProducts(res.data)
            } else {
                // Mock data as fallback for development
                setProducts(MOCK_PRODUCTS)
            }
        } catch (error) {
            console.error("Failed to fetch products, using mock data:", error)
            setProducts(MOCK_PRODUCTS)
        } finally {
            setLoading(false)
        }
    }

    const paginated = products.slice((page - 1) * limit, page * limit)

    return {
        products,
        paginated,
        loading,
        page,
        setPage,
        total: products.length,
        loadProducts
    }

}

const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Mouse",
        sku: "MOU-001",
        barcode: "1234567890123",
        category: "Electronics",
        purchasePrice: 20.00,
        sellingPrice: 45.00,
        stock: 50,
        status: "active"
    },
    {
        id: "2",
        name: "Mechanical Keyboard RGB",
        sku: "KBD-042",
        barcode: "9876543210987",
        category: "Electronics",
        purchasePrice: 45.00,
        sellingPrice: 89.99,
        stock: 5,
        status: "active"
    },
    {
        id: "3",
        name: "USB-C To HDMI Adapter",
        sku: "ADP-102",
        barcode: "4567891230456",
        category: "Electronics",
        purchasePrice: 8.50,
        sellingPrice: 15.00,
        stock: 0,
        status: "inactive"
    },
    {
        id: "4",
        name: "Ergonomic Office Chair",
        sku: "CHR-501",
        barcode: "3216549871234",
        category: "Furniture",
        purchasePrice: 120.00,
        sellingPrice: 249.00,
        stock: 12,
        status: "active"
    }
]
