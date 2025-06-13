"use client"

import { useState, useMemo, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { menuItems, categories } from "@/data/menu"
import MenuItemCard from "@/components/MenuItemCard"
import { Search, Filter, MessageCircle, Sparkles, Star, Zap, Leaf, Clock } from "lucide-react"
import Image from "next/image"

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
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100])

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

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  }

  return (
    <div className="relative">
      {/* Enhanced Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale, y }}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden animated-bg"
      >
        {/* Background Elements with smoother animations */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />

        {/* Animated background circles with smoother transitions */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-400/20 to-orange-400/20 dark:from-red-400/10 dark:to-orange-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-yellow-400/10 dark:to-orange-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-red-400/20 dark:from-orange-400/10 dark:to-red-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Enhanced Quality Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow-lg">
                <Star className="text-white" size={16} fill="white" />
                <span className="font-bold tracking-wider text-sm">PREMIUM QUALITY</span>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow-lg">
                <Leaf className="text-white" size={16} />
                <span className="font-bold tracking-wider text-sm">FRESH INGREDIENTS</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow-lg">
                <Clock className="text-white" size={16} />
                <span className="font-bold tracking-wider text-sm">FAST SERVICE</span>
              </div>
            </motion.div>

            {/* Enhanced Main Title */}
            <div className="mb-8">
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{
                  duration: 1.2,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
              >
                <motion.h1
                  className="text-7xl md:text-9xl lg:text-[10rem] font-bold font-fredoka hero-text leading-none"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Burger
                </motion.h1>
              </motion.div>

              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{
                  delay: 0.4,
                  duration: 1.2,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
              >
                <motion.h1
                  className="text-7xl md:text-9xl lg:text-[10rem] font-bold font-fredoka hero-text leading-none"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  Games
                </motion.h1>
              </motion.div>
            </div>

            {/* Enhanced Tagline */}
            <motion.div className="mb-10" variants={itemVariants}>
              <div className="flex items-center justify-center space-x-3 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="text-yellow-500" size={28} />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-poppins">
                  Where Every Bite is an Epic Adventure
                </h2>
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="text-yellow-500" size={28} />
                </motion.div>
              </div>

              <p className="text-xl md:text-2xl text-secondary max-w-4xl mx-auto font-poppins leading-relaxed">
                🔥 Discover our mouth-watering collection of{" "}
                <span className="font-bold gradient-text">premium burgers</span>,{" "}
                <span className="font-bold gradient-text">gourmet sandwiches</span>, and{" "}
                <span className="font-bold gradient-text">delicious wraps</span> crafted with the finest ingredients
              </p>
            </motion.div>

            {/* Feature Badges with enhanced styling */}
            <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={containerVariants}>
              {[
                { icon: Zap, text: "Bold Flavors", color: "from-red-500 to-pink-500" },
                { icon: Leaf, text: "Natural Ingredients", color: "from-green-500 to-emerald-500" },
                { icon: Star, text: "5-Star Quality", color: "from-yellow-500 to-orange-500" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full shadow-lg`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <feature.icon size={20} />
                  <span className="text-lg font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={containerVariants}
            >
              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToMenu}
                className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
              >
                <span className="text-2xl">🍔</span>
                <span>Explore Our Menu</span>
              </motion.button>

              <motion.a
                variants={itemVariants}
                href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
              >
                <MessageCircle size={24} />
                <span>Order Now on WhatsApp</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Items Carousel with enhanced glowing prices */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 bg-gradient-to-b from-transparent to-white/5 dark:to-zinc-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <motion.h2
              className="text-4xl font-bold gradient-text mb-4 font-fredoka"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Customer Favorites
            </motion.h2>
            <motion.p
              className="text-secondary text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Our most loved items that keep our customers coming back for more
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems
              .filter((item) => item.isBestSeller)
              .slice(0, 3)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  className="glass-card rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>Best Seller</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-2">{item.name}</h3>
                  <p className="text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold price-text price-glow">₹{item.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Order Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
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
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search for delicious food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-zinc-800/30 backdrop-blur-md border border-white/30 dark:border-zinc-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 dark:placeholder-zinc-400 text-primary transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    : "bg-white/20 dark:bg-zinc-800/30 text-secondary hover:bg-white/30 dark:hover:bg-zinc-700/30"
                }`}
              >
                {category.emoji} {category.name}
              </motion.button>
            ))}
          </div>

          {/* Special Filters - Removed Non-Veg Only */}
          <div className="flex flex-wrap gap-4">
            <motion.label whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-white/20 border-white/30 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-secondary">🌱 Veg Only</span>
            </motion.label>

            <motion.label whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBestSellersOnly}
                onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-white/20 border-white/30 rounded focus:ring-yellow-500"
              />
              <span className="text-sm font-medium text-secondary">⭐ Best Sellers Only</span>
            </motion.label>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold gradient-text font-fredoka">Our Delicious Menu</h2>
            <div className="flex items-center space-x-2 text-muted">
              <Filter size={20} />
              <span className="font-medium">{filteredItems.length} items</span>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-primary mb-2 font-fredoka">No items found</h3>
              <p className="text-muted font-poppins">Try adjusting your search or filters</p>
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
        <div className="glass-card rounded-2xl p-8">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            viewport={{ once: true }}
            className="text-6xl mb-4 mx-auto w-fit"
          >
            📱
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text mb-4 font-fredoka text-center">Order via WhatsApp</h2>
          <p className="text-muted mb-6 max-w-2xl mx-auto font-poppins leading-relaxed text-center">
            Prefer to order directly? Send us your order on WhatsApp and we'll take care of everything! Quick, easy, and
            personal service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            >
              <MessageCircle size={24} />
              <span>Chat & Order Now</span>
            </motion.a>

            <div className="text-muted font-poppins">
              <p className="font-medium">📞 +91 95595 45103</p>
              <p className="text-sm">Available 9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
