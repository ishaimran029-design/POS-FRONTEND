import { useState } from "react"
import InventoryHeader from "@/components/store-admin/InventoryHeader"
import InventoryFilters from "@/components/store-admin/InventoryFilters"
import InventoryTable from "@/components/store-admin/InventoryTable"
import Sidebar from '@/components/store-admin/Sidebar'
import TopNavbar from '@/components/store-admin/TopNavbar'
import { useInventory } from "@/hooks/useInventory"

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

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Movements")
  const [timeFilter, setTimeFilter] = useState("All Time")

  // React Query Hook
  const { data: inventoryDataRes, isLoading: loading } = useInventory();

  const movementsRaw = (inventoryDataRes as any)?.data || (Array.isArray(inventoryDataRes) ? inventoryDataRes : []);
  const movements: InventoryMovement[] = movementsRaw;

  const filteredMovements = movements.filter(m => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
          m.productName.toLowerCase().includes(q) || 
          m.sku.toLowerCase().includes(q) ||
          m.referenceId.toLowerCase().includes(q);
      
      const matchesType = typeFilter === "All Movements" || 
          (typeFilter.toLowerCase() === m.changeType.toLowerCase());
      
      return matchesSearch && matchesType;
  });

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
