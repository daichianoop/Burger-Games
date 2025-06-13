"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem, MenuItem } from "@/types"

interface OrderState {
  cart: CartItem[]
  orderType: "home" | "dine-in"
  location: "Location 1" | "Location 2"
}

type OrderAction =
  | { type: "ADD_TO_CART"; payload: MenuItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ORDER_TYPE"; payload: "home" | "dine-in" }
  | { type: "SET_LOCATION"; payload: "Location 1" | "Location 2" }
  | { type: "LOAD_STATE"; payload: OrderState }

const initialState: OrderState = {
  cart: [],
  orderType: "home",
  location: "Location 1",
}

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
          .filter((item) => item.quantity > 0),
      }
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }
    case "SET_ORDER_TYPE":
      return {
        ...state,
        orderType: action.payload,
      }
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      }
    case "LOAD_STATE":
      return action.payload
    default:
      return state
  }
}

interface OrderContextType {
  state: OrderState
  dispatch: React.Dispatch<OrderAction>
  getTotalAmount: () => number
  getCartItemsCount: () => number
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("burger-games-cart")
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)
          dispatch({ type: "LOAD_STATE", payload: parsedState })
        } catch (error) {
          console.error("Error loading saved cart:", error)
        }
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("burger-games-cart", JSON.stringify(state))
    }
  }, [state])

  const getTotalAmount = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <OrderContext.Provider value={{ state, dispatch, getTotalAmount, getCartItemsCount }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
