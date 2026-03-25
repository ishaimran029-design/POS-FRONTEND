export interface Category {
  id: string
  name: string
  slug?: string
  parentId?: string | null
  parentName?: string | null
  _count?: {
    products: number
  }
}

// Frontend-only hierarchy metadata stored in localStorage
export interface CategoryHierarchyEntry {
  categoryId: string
  parentId: string | null
}
