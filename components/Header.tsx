"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useOrder } from "@/context/OrderContext"
import { useTheme } from "@/context/ThemeContext"
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const { getCartItemsCount } = useOrder()
  const { theme, toggleTheme } = useTheme()
  const cartCount = getCartItemsCount()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-600/30 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-bold text-xl">🍔</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-fredoka hero-text">Burger Games</h1>
                <p className="text-xs text-muted font-poppins">Delicious Adventures</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
            >
              Gallery
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-primary transition-all duration-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-secondary hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {/* Cart Button */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline font-medium">Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce-slow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 border-t border-white/20 dark:border-gray-600/30"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
