import { useEffect, useState } from "react"
import InventoryHeader from "@/components/store-admin/InventoryHeader"
import InventoryFilters from "@/components/store-admin/InventoryFilters"
import InventoryTable from "@/components/store-admin/InventoryTable"
import Sidebar from '@/components/store-admin/Sidebar'
import TopNavbar from '@/components/store-admin/TopNavbar'
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

const InventoryManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [movements, setMovements] = useState<InventoryMovement[]>([])
  const [loading, setLoading] = useState(false)

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Movements")
  const [timeFilter, setTimeFilter] = useState("All Time")

  const filteredMovements = movements.filter(m => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
          m.productName.toLowerCase().includes(q) || 
          m.sku.toLowerCase().includes(q) ||
          m.referenceId.toLowerCase().includes(q);
      
      const matchesType = typeFilter === "All Movements" || 
          (typeFilter.toLowerCase() === m.changeType.toLowerCase());
      
      // Time filter logic could be added here if needed, 
      // but for now we focus on search and type.
      return matchesSearch && matchesType;
  });

  const fetchMovements = async () => {
    try {
      setLoading(true)
      const res = await fetchFullInventory()
      
      // Handle the nested structure of the API response
      const inventoryData = res.data?.data || res.data || []
      
      // Mapping or direct assignment based on the API response structure
      // For now, assuming the API returns an array of inventory items
      setMovements(inventoryData)
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
    <div className="min-h-screen bg-[#F7F9FC] transition-colors duration-500 flex text-slate-900">
      {sidebarOpen && (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-8 lg:p-10 w-full animate-fade-in space-y-10">
          <InventoryHeader />
          <InventoryFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
          />
          <InventoryTable movements={filteredMovements} loading={loading} />
        </main>
      </div>
    </div>
  )
}

export default InventoryManagementPage
