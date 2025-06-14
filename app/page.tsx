"use client"

import { useState, useMemo, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { menuItems, categories } from "@/data/menu"
import MenuItemCard from "@/components/MenuItemCard"
import { Search, Filter, MessageCircle, Star, Leaf, Clock, ChefHat } from "lucide-react"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showVegOnly, setShowVegOnly] = useState(false)
  const [showBestSellersOnly, setShowBestSellersOnly] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 50])

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      const matchesVeg = !showVegOnly || item.isVeg
      const matchesBestSeller = !showBestSellersOnly || item.isBestSeller

      return matchesSearch && matchesCategory && matchesVeg && matchesBestSeller
    })
  }, [searchTerm, selectedCategory, showVegOnly, showBestSellersOnly])

  const scrollToMenu = () => {
    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative">
      {/* Minimal Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, y }}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-orange-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/10" />

        {/* Subtle accent elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-red-500/20 rounded-full" />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-orange-500/30 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-500/20 rounded-full" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Clean title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black font-fredoka text-gray-900 dark:text-white leading-none tracking-tight">
                Burger
              </h1>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black font-fredoka bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent leading-none tracking-tight">
                Games
              </h1>
            </motion.div>

            {/* Simple tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light font-poppins mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where every bite is an epic adventure
            </motion.p>

            {/* Minimal badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <ChefHat size={20} className="text-red-500" />
                <span className="font-medium">Expert Chefs</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <Leaf size={20} className="text-green-500" />
                <span className="font-medium">Fresh Ingredients</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <Clock size={20} className="text-blue-500" />
                <span className="font-medium">Fast Service</span>
              </div>
            </motion.div>

            {/* Clean CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToMenu}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
              >
                Explore Menu
              </motion.button>

              <motion.a
                href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Order on WhatsApp</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section
        id="menu-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-16"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for delicious food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 dark:text-white transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Special Filters */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <Leaf size={16} className="text-green-500" />
                <span>Veg Only</span>
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBestSellersOnly}
                onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <Star size={16} className="text-yellow-500" />
                <span>Best Sellers Only</span>
              </span>
            </label>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-fredoka">Our Menu</h2>
            <div className="flex items-center space-x-2 text-gray-500">
              <Filter size={20} />
              <span className="font-medium">{filteredItems.length} items</span>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center py-16"
            >
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <MenuItemCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* WhatsApp Quick Order Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-16"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 text-center">
          <MessageCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-fredoka">Order via WhatsApp</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Prefer to order directly? Send us your order on WhatsApp for quick and personal service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Chat & Order Now</span>
            </motion.a>

            <div className="text-gray-600 dark:text-gray-300">
              <p className="font-medium">+91 95595 45103</p>
              <p className="text-sm">Available 9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
