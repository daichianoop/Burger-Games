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
      {/* Animated Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, y }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-orange-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/10" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute top-2/3 right-1/5 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400/15 to-red-400/15 rounded-full blur-lg"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: 4,
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

        {/* Animated Lines */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-transparent via-orange-500/20 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            delay: 1.5,
          }}
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main Title with Original Fonts */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-fredoka hero-text leading-none tracking-tight mb-2">
                Burger
              </h1>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-fredoka bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent leading-none tracking-tight">
                Games
              </h1>
            </motion.div>

            {/* Tagline with Original Font */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-poppins mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where every bite is an epic adventure
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <ChefHat size={20} className="text-red-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300 font-poppins">Expert Chefs</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Leaf size={20} className="text-green-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300 font-poppins">Fresh Ingredients</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Clock size={20} className="text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300 font-poppins">Fast Service</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToMenu}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg font-poppins transition-all duration-300 hover:shadow-lg"
              >
                Explore Menu
              </motion.button>

              <motion.a
                href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg font-poppins transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
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
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 dark:text-white transition-all duration-300 font-poppins"
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
                className={`px-4 py-2 rounded-full text-sm font-medium font-poppins transition-all duration-300 ${
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1 font-poppins">
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1 font-poppins">
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
              <span className="font-medium font-poppins">{filteredItems.length} items</span>
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-fredoka">No items found</h3>
              <p className="text-gray-500 font-poppins">Try adjusting your search or filters</p>
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
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-poppins">
            Prefer to order directly? Send us your order on WhatsApp for quick and personal service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg font-poppins transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Chat & Order Now</span>
            </motion.a>

            <div className="text-gray-600 dark:text-gray-300 font-poppins">
              <p className="font-medium">+91 95595 45103</p>
              <p className="text-sm">Available 9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
