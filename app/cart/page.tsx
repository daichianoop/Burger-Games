"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useOrder } from "@/context/OrderContext"
import {
  Minus,
  Plus,
  Trash2,
  Home,
  UtensilsCrossed,
  MessageCircle,
  User,
  Phone,
  MapPin,
  Hash,
  Store,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { sendCartToWhatsApp } from "@/utils/whatsapp"

export default function CartPage() {
  const { state, dispatch, getTotalAmount } = useOrder()
  const { cart, orderType, location } = state

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    tableNumber: "",
  })

  const [showOrderForm, setShowOrderForm] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const setOrderType = (type: "home" | "dine-in") => {
    dispatch({ type: "SET_ORDER_TYPE", payload: type })
  }

  const setLocation = (loc: "Location 1" | "Location 2") => {
    dispatch({ type: "SET_LOCATION", payload: loc })
  }

  const handleWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Please enter your name and phone number")
      return
    }

    if (orderType === "home" && !customerInfo.address) {
      alert("Please enter your delivery address")
      return
    }

    if (orderType === "dine-in" && !customerInfo.tableNumber) {
      alert("Please enter your table number")
      return
    }

    sendCartToWhatsApp(
      cart,
      orderType,
      location,
      customerInfo.name,
      customerInfo.phone,
      customerInfo.address,
      customerInfo.tableNumber,
    )

    // Clear cart after sending order
    dispatch({ type: "CLEAR_CART" })
    setCustomerInfo({ name: "", phone: "", address: "", tableNumber: "" })
    setShowOrderForm(false)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold gradient-text mb-4 font-fredoka">Your cart is empty</h2>
          <p className="text-muted mb-8 font-poppins">Add some delicious items to get started!</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const subtotal = getTotalAmount()
  const deliveryFee = orderType === "home" ? 40 : 0
  const taxes = Math.round(subtotal * 0.18)
  const total = subtotal + deliveryFee + taxes

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center font-fredoka">Your Cart</h1>

        {/* Location Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-primary mb-4 font-fredoka">Select Store Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocation("Location 1")}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                location === "Location 1"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/30"
              }`}
            >
              <Store className="mx-auto mb-2 text-red-500" size={24} />
              <div className="font-medium text-primary">Location 1</div>
              <div className="text-sm text-secondary">123 Food Street</div>
              <div className="text-xs text-muted">📞 +91 95595 45103</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocation("Location 2")}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                location === "Location 2"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/30"
              }`}
            >
              <Store className="mx-auto mb-2 text-red-500" size={24} />
              <div className="font-medium text-primary">Location 2</div>
              <div className="text-sm text-secondary">456 Taste Avenue</div>
              <div className="text-xs text-muted">📞 +91 94508 28556</div>
            </motion.button>
          </div>
        </motion.div>

        {/* Order Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-primary mb-4 font-fredoka">Order Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderType("home")}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                orderType === "home"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/30"
              }`}
            >
              <Home className="mx-auto mb-2 text-red-500" size={24} />
              <div className="font-medium text-primary">Home Delivery</div>
              <div className="text-sm text-secondary">Delivered to your door</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderType("dine-in")}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                orderType === "dine-in"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/30"
              }`}
            >
              <UtensilsCrossed className="mx-auto mb-2 text-red-500" size={24} />
              <div className="font-medium text-primary">Dine-In</div>
              <div className="text-sm text-secondary">Eat at our restaurant</div>
            </motion.button>
          </div>
        </motion.div>

        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-primary mb-6 font-fredoka">Cart Items</h3>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/30 rounded-xl"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                  <p className="text-secondary text-sm">{item.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.isVeg
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.isVeg ? "🌱 Veg" : "🥩 Non-Veg"}
                    </span>
                    {item.isBestSeller && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs">
                        ⭐ Best Seller
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </motion.button>

                  <span className="font-bold text-lg w-8 text-center text-primary">{item.quantity}</span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg gradient-text">₹{item.price * item.quantity}</div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-primary mb-4 font-fredoka">Order Summary</h3>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-secondary">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Delivery Fee</span>
              <span>{orderType === "home" ? "₹40" : "Free"}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Taxes (18%)</span>
              <span>₹{taxes}</span>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <div className="flex justify-between text-xl font-bold text-primary">
              <span>Total</span>
              <span className="gradient-text">₹{total}</span>
            </div>
          </div>

          {!showOrderForm ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOrderForm(true)}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Order via WhatsApp - ₹{total}</span>
            </motion.button>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-primary font-fredoka">Enter Your Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <User size={16} className="inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-primary placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-primary placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {orderType === "home" && (
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Delivery Address *
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-primary placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your complete address"
                  />
                </div>
              )}

              {orderType === "dine-in" && (
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    <Hash size={16} className="inline mr-2" />
                    Table Number *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.tableNumber}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-primary placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Table number"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-medium"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Send Order</span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
