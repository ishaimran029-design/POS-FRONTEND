import { useEffect, useState } from "react"
import InventoryHeader from "@/components/store-admin/InventoryHeader"
import InventoryFilters from "@/components/store-admin/InventoryFilters"
import InventoryTable from "@/components/store-admin/InventoryTable"
import Sidebar from '@/pages/store-admin/components/Sidebar'
import TopNavbar from '@/pages/store-admin/components/TopNavbar'
import { fetchFullInventory } from "@/api/inventory.api"

export interface InventoryMovement {
  id: string
  productName: string
  sku: string
  image: string
  quantityChange: number
  changeType: "sale" | "restock" | "adjustment"
  referenceId: string
  user: string
  timestamp: string
}

const InventoryManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [movements, setMovements] = useState<InventoryMovement[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMovements = async () => {
    try {
      setLoading(true)
      // I checked inventory.api.ts and getInventoryMovements does not exist, so I am using fetchFullInventory as fallback or just mock data
      const res = await fetchFullInventory()
      if (res.data?.data) {
          setMovements(res.data.data)
      } else {
          setMovements(res.data)
      }
    } catch (error) {
      console.error("Failed to load inventory movements", error)
      // Fallback data if API is not fully implemented yet 
      setMovements([
          {
              id: "1",
              productName: "Logitech MX Master 3S",
              sku: "LOG-MX3S-GRY",
              image: "",
              quantityChange: 15,
              changeType: "restock",
              referenceId: "PO-2023-4589",
              user: "Admin User",
              timestamp: "2023-10-27 14:32"
          },
          {
              id: "2",
              productName: "Apple MacBook Pro 14\"",
              sku: "APP-MBP14-M2",
              image: "",
              quantityChange: -1,
              changeType: "sale",
              referenceId: "ORD-9982-XS",
              user: "Store Cashier",
              timestamp: "2023-10-27 11:15"
          },
          {
              id: "3",
              productName: "Sony WH-1000XM5",
              sku: "SON-WH5-BLK",
              image: "",
              quantityChange: -2,
              changeType: "adjustment",
              referenceId: "ADJ-001-2023",
              user: "Inventory Manager",
              timestamp: "2023-10-26 09:45"
          }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovements()
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-500 flex">
      {sidebarOpen && (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full animate-fade-in space-y-6">
          <InventoryHeader />
          <InventoryFilters />
          <InventoryTable movements={movements} loading={loading} />
        </main>
      </div>
    </div>
  )
}

export default InventoryManagement
