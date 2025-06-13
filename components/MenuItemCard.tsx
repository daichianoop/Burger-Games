"use client"

import { motion } from "framer-motion"
import type { MenuItem } from "@/types"
import { useOrder } from "@/context/OrderContext"
import { Plus, Star, MessageCircle } from "lucide-react"
import Image from "next/image"
import { sendQuickOrder } from "@/utils/whatsapp"

interface MenuItemCardProps {
  item: MenuItem
  index: number
}

export default function MenuItemCard({ item, index }: MenuItemCardProps) {
  const { dispatch } = useOrder()

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: item })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="bg-white/10 dark:bg-zinc-800/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-zinc-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        {item.isBestSeller && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold"
          >
            <Star size={12} fill="currentColor" />
            <span>Best Seller</span>
          </motion.div>
        )}
        <div className="absolute top-2 left-2">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={`px-2 py-1 rounded-full text-xs font-bold ${
              item.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {item.isVeg ? "🌱 Veg" : "🥩 Non-Veg"}
          </motion.span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-lg text-primary">{item.name}</h3>
        <p className="text-secondary text-sm line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold price-text price-glow">₹{item.price}</span>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px -3px rgba(34, 197, 94, 0.4)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sendQuickOrder(item.name)}
              className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              title="Order via WhatsApp"
            >
              <MessageCircle size={16} />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px -3px rgba(239, 68, 68, 0.4)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
