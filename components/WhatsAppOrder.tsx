"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { sendCartToWhatsApp, sendQuickOrder } from "@/utils/whatsapp"

interface WhatsAppOrderProps {
  cart?: any[]
  customerInfo?: any
  orderType?: string
  totalAmount?: number
  itemName?: string
  variant?: "cart" | "quick" | "contact"
  className?: string
}

export default function WhatsAppOrder({
  cart,
  customerInfo,
  orderType,
  totalAmount,
  itemName,
  variant = "contact",
  className = "",
}: WhatsAppOrderProps) {
  const handleWhatsAppOrder = () => {
    if (variant === "cart" && cart && customerInfo && orderType && totalAmount) {
      sendCartToWhatsApp(cart, customerInfo, orderType, totalAmount)
    } else if (variant === "quick" && itemName) {
      sendQuickOrder(itemName)
    } else {
      // Default contact
      const phoneNumber = "919559545103"
      const message = "Hi! I want to know more about Burger Games menu and offers."
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappURL, "_blank")
    }
  }

  const getButtonText = () => {
    switch (variant) {
      case "cart":
        return `Order via WhatsApp${totalAmount ? ` - ₹${totalAmount}` : ""}`
      case "quick":
        return "Quick Order"
      default:
        return "Chat on WhatsApp"
    }
  }

  const getButtonColor = () => {
    return "bg-green-500 hover:bg-green-600"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleWhatsAppOrder}
      className={`${getButtonColor()} text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${className}`}
    >
      <MessageCircle size={20} />
      <span>{getButtonText()}</span>
    </motion.button>
  )
}
