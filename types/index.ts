export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isVeg: boolean
  isBestSeller?: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  phone: string
  email?: string
  orderType: "home" | "dine-in"
  address?: string
  tableNumber?: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "accepted" | "cooking" | "ready" | "completed"
  createdAt: string
  estimatedTime?: string
}

export type OrderStatus = Order["status"]
