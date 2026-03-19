export interface SaleTransaction {
  id: string
  saleId: string
  date: string
  customer: string
  totalAmount: number
  paymentMethod: string
  status: "completed" | "pending" | "refunded" | string
}
