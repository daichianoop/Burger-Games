"use client"

import { motion } from "framer-motion"
import { Heart, Users, Award, Clock, MapPin, Phone } from "lucide-react"

export default function AboutPage() {
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
          About Burger Games
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-secondary max-w-3xl mx-auto font-poppins leading-relaxed"
        >
          Where passion meets flavor, and every meal becomes an unforgettable adventure
        </motion.p>
      </motion.section>

      {/* Our Story */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <div className="glass-card rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-6 font-fredoka">Our Story</h2>
              <p className="text-secondary mb-4 font-poppins leading-relaxed">
                Founded with a simple mission: to create the most delicious and memorable dining experience in town.
                Burger Games started as a dream to bring together the best ingredients, innovative recipes, and
                exceptional service under one roof.
              </p>
              <p className="text-secondary mb-4 font-poppins leading-relaxed">
                What began as a small venture has grown into a beloved destination for food enthusiasts who appreciate
                quality, taste, and creativity. Every burger, sandwich, and wrap we serve tells a story of dedication,
                passion, and love for great food.
              </p>
              <p className="text-secondary font-poppins leading-relaxed">
                Today, we're proud to serve our community with fresh, high-quality meals that bring people together and
                create lasting memories.
              </p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="text-8xl mb-4"
              >
                🍔
              </motion.div>
              <p className="text-muted font-poppins italic">"Every bite is an adventure waiting to happen"</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold gradient-text text-center mb-12 font-fredoka">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Heart,
              title: "Passion",
              description: "We pour our heart into every dish we create",
            },
            {
              icon: Users,
              title: "Community",
              description: "Building connections through great food",
            },
            {
              icon: Award,
              title: "Quality",
              description: "Only the finest ingredients make it to your plate",
            },
            {
              icon: Clock,
              title: "Freshness",
              description: "Made fresh daily with love and care",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <value.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3 font-fredoka">{value.title}</h3>
              <p className="text-secondary font-poppins">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Locations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold gradient-text text-center mb-12 font-fredoka">Our Locations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Location 1",
              address: "123 Food Street, Flavor District",
              phone: "+91 95595 45103",
              hours: "9:00 AM - 11:00 PM",
            },
            {
              name: "Location 2",
              address: "456 Taste Avenue, Gourmet Plaza",
              phone: "+91 94508 28556",
              hours: "9:00 AM - 11:00 PM",
            },
          ].map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-4 font-fredoka">{location.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="text-secondary font-poppins">{location.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span className="text-secondary font-poppins">{location.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-secondary font-poppins">{location.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Message */}
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
            👨‍🍳👩‍🍳
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text mb-6 font-fredoka">From Our Kitchen to Your Heart</h2>
          <p className="text-secondary max-w-3xl mx-auto font-poppins leading-relaxed text-lg">
            Our dedicated team of chefs and staff work tirelessly to ensure that every meal we serve exceeds your
            expectations. We believe that great food has the power to bring people together, create memories, and
            brighten your day. Thank you for being part of our Burger Games family!
          </p>
        </div>
      </motion.section>
    </div>
  )
}
