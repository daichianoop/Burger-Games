"use client"

import { useState, useMemo, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { menuItems, categories } from "@/data/menu"
import MenuItemCard from "@/components/MenuItemCard"
import { Search, Filter, MessageCircle, Sparkles, Star, Leaf, Clock, ChefHat, Award, Heart } from "lucide-react"

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
      {/* Enhanced Hero Section with Moving Background */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale, y }}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Moving Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20" />

        {/* Moving geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating circles */}
          <motion.div
            className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <motion.div
            className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: 5,
            }}
          />

          <motion.div
            className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}
          />

          {/* Floating food-related shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500/30 rounded-full"
            animate={{
              x: [0, 200, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <motion.div
            className="absolute top-2/3 right-1/4 w-6 h-6 bg-orange-500/30 rounded-full"
            animate={{
              x: [0, -150, 0],
              y: [0, 80, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: 3,
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-yellow-500/40 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -120, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 14,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:50px_50px] opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Premium Quality Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 shadow-xl backdrop-blur-sm">
                <Award className="text-white" size={20} />
                <span className="font-bold tracking-wider text-sm">PREMIUM QUALITY</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 shadow-xl backdrop-blur-sm">
                <Leaf className="text-white" size={20} />
                <span className="font-bold tracking-wider text-sm">FRESH INGREDIENTS</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 shadow-xl backdrop-blur-sm">
                <Clock className="text-white" size={20} />
                <span className="font-bold tracking-wider text-sm">FAST SERVICE</span>
              </div>
            </motion.div>

            {/* Enhanced Main Title with better typography */}
            <div className="mb-12">
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
                  className="text-8xl md:text-9xl lg:text-[12rem] font-black font-fredoka leading-none bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    textShadow: "0 0 40px rgba(239, 68, 68, 0.3)",
                  }}
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
                  className="text-8xl md:text-9xl lg:text-[12rem] font-black font-fredoka leading-none bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  style={{
                    textShadow: "0 0 40px rgba(251, 146, 60, 0.3)",
                  }}
                >
                  Games
                </motion.h1>
              </motion.div>
            </div>

            {/* Enhanced Tagline with better visual hierarchy */}
            <motion.div className="mb-16" variants={itemVariants}>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="text-yellow-500 drop-shadow-lg" size={32} />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary font-poppins text-center max-w-4xl leading-tight">
                  Where Every Bite is an Epic Adventure
                </h2>
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="text-yellow-500 drop-shadow-lg" size={32} />
                </motion.div>
              </div>

              <motion.p
                className="text-xl md:text-2xl text-secondary font-poppins max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Crafted with passion, served with excellence. Experience the ultimate fusion of taste and quality.
              </motion.p>
            </motion.div>

            {/* Feature Highlights with enhanced design */}
            <motion.div className="flex flex-wrap justify-center gap-6 mb-16" variants={containerVariants}>
              {[
                {
                  icon: ChefHat,
                  text: "Master Chefs",
                  color: "from-red-500 to-pink-500",
                  description: "Expert culinary team",
                },
                {
                  icon: Heart,
                  text: "Made with Love",
                  color: "from-pink-500 to-rose-500",
                  description: "Every ingredient matters",
                },
                {
                  icon: Star,
                  text: "5-Star Experience",
                  color: "from-yellow-500 to-orange-500",
                  description: "Premium quality guaranteed",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className={`group relative bg-gradient-to-r ${feature.color} p-6 rounded-2xl shadow-2xl text-white min-w-[200px] backdrop-blur-sm`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <div className="text-center">
                    <feature.icon size={32} className="mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">{feature.text}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons with better spacing and design */}
            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              variants={containerVariants}
            >
              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(251, 146, 60, 0.5)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToMenu}
                className="group relative bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-16 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 backdrop-blur-sm"
              >
                <ChefHat size={28} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Explore Our Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.button>

              <motion.a
                variants={itemVariants}
                href="https://wa.me/919559545103?text=Hi! I want to see your full menu and place an order."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.5)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-16 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 backdrop-blur-sm"
              >
                <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
                <span>Order Now on WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Special Filters */}
          <div className="flex flex-wrap gap-4">
            <motion.label whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-white/20 border-white/30 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-secondary flex items-center space-x-1">
                <Leaf size={16} className="text-green-500" />
                <span>Veg Only</span>
              </span>
            </motion.label>

            <motion.label whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBestSellersOnly}
                onChange={(e) => setShowBestSellersOnly(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-white/20 border-white/30 rounded focus:ring-yellow-500"
              />
              <span className="text-sm font-medium text-secondary flex items-center space-x-1">
                <Star size={16} className="text-yellow-500" />
                <span>Best Sellers Only</span>
              </span>
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
              <Search size={64} className="mx-auto mb-4 text-muted" />
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
            <MessageCircle size={64} className="text-green-500 mx-auto" />
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

            <div className="text-muted font-poppins text-center">
              <p className="font-medium flex items-center justify-center space-x-2">
                <span>📞 +91 95595 45103</span>
              </p>
              <p className="text-sm">Available 9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
