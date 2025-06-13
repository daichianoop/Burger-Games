"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useOrder } from "@/context/OrderContext"
import { useTheme } from "@/context/ThemeContext"
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Header() {
  const { getCartItemsCount } = useOrder()
  const { theme, toggleTheme } = useTheme()
  const cartCount = getCartItemsCount()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-600/30 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">🍔</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-fredoka hero-text">Burger Games</h1>
                <p className="text-[10px] sm:text-xs text-muted font-poppins">Delicious Adventures</p>
              </div>
            </div>
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

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-primary transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-secondary hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Cart Button */}
            <Link href="/cart">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-full flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg transition-all duration-300">
                <ShoppingCart size={18} />
                <span className="hidden sm:inline font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-white/20 dark:border-gray-600/30 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/about"
                  className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/gallery"
                  className="text-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
