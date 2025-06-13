"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Delicious Burger Games Classic Burger" },
  { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Fresh Ingredients Preparation" },
  { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Happy Customers Enjoying Meals" },
  { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Our Cozy Restaurant Interior" },
  { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Gourmet Sandwich Collection" },
  { id: 6, src: "/placeholder.svg?height=400&width=600", alt: "Chef Preparing Special Wraps" },
]

const customerReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    review:
      "Absolutely amazing! The Games Special Burger is out of this world. Fresh ingredients, perfect taste, and excellent service. Will definitely come back!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 5,
    review:
      "Best burgers in town! The paneer cheese burger was incredible. The staff is so friendly and the atmosphere is great. Highly recommended!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 4,
    review:
      "Great food quality and quick service. The Mexican wrap was delicious and the fries were perfectly crispy. Good value for money.",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rating: 5,
    review:
      "Love this place! The veggie burger is amazing and they have great options for vegetarians. Clean, tasty, and affordable. My new favorite spot!",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Vikash Singh",
    rating: 5,
    review:
      "Ordered through WhatsApp and the experience was seamless. Food arrived hot and fresh. The cheese corn sandwich was absolutely delicious!",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Anita Verma",
    rating: 4,
    review:
      "Excellent taste and presentation. The pizza was loaded with toppings and the cold coffee was refreshing. Great place for family dining.",
    date: "1 month ago",
  },
]

export default function GalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold font-fredoka hero-text mb-6"
        >
          Gallery & Reviews
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-secondary max-w-3xl mx-auto font-poppins leading-relaxed"
        >
          See what makes Burger Games special through our food gallery and customer experiences
        </motion.p>
      </motion.section>

      {/* Image Slider */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold gradient-text text-center mb-8 font-fredoka">Food Gallery</h2>
        <div className="glass-card rounded-2xl p-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                    alt={galleryImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Image Caption */}
            <div className="text-center mt-4">
              <p className="text-secondary font-poppins">{galleryImages[currentImageIndex].alt}</p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-2 mt-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Customer Reviews */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold gradient-text text-center mb-8 font-fredoka">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary font-poppins">{review.name}</h3>
                <div className="flex space-x-1">{renderStars(review.rating)}</div>
              </div>
              <p className="text-secondary mb-4 font-poppins leading-relaxed">"{review.review}"</p>
              <p className="text-muted text-sm font-poppins">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Google Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="glass-card rounded-2xl p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            ⭐
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text mb-6 font-fredoka">Love Our Food?</h2>
          <p className="text-secondary mb-8 max-w-2xl mx-auto font-poppins leading-relaxed">
            Share your experience with others! Your feedback helps us improve and lets other food lovers discover the
            amazing taste of Burger Games.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://www.google.com/search?q=burger+games+reviews"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            >
              <ExternalLink size={20} />
              <span>Write a Google Review</span>
            </motion.a>

            <div className="text-muted font-poppins">
              <p className="font-medium">⭐ 4.8/5 Rating on Google</p>
              <p className="text-sm">Based on 150+ reviews</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
