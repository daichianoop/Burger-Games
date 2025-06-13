export function sendCartToWhatsApp(
  cart: any[],
  orderType: string,
  location: string,
  customerName?: string,
  customerPhone?: string,
  address?: string,
  tableNumber?: string,
) {
  // Location-based WhatsApp numbers
  const phoneNumbers = {
    "Location 1": "919559545103",
    "Location 2": "919559545103",
  }

  const phoneNumber = phoneNumbers[location as keyof typeof phoneNumbers] || phoneNumbers["Location 1"]

  let message = "*🍔 Burger Games Order*\n\n"

  if (customerName) {
    message += `*Customer:* ${customerName}\n`
  }
  if (customerPhone) {
    message += `*Phone:* ${customerPhone}\n`
  }

  message += `*Location:* ${location}\n`
  message += `*Order Type:* ${orderType === "home" ? "🏠 Home Delivery" : "🪑 Dine-In"}\n`

  if (orderType === "home" && address) {
    message += `*Address:* ${address}\n`
  } else if (orderType === "dine-in" && tableNumber) {
    message += `*Table Number:* ${tableNumber}\n`
  }

  message += `\n*Order Items:*\n`

  let subtotal = 0
  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price
    subtotal += itemTotal
    message += `${index + 1}. ${item.name} x ${item.quantity} = ₹${itemTotal}\n`
    if (item.isVeg) {
      message += `   🌱 Vegetarian\n`
    }
  })

  const deliveryFee = orderType === "home" ? 40 : 0
  const taxes = Math.round(subtotal * 0.18)
  const total = subtotal + deliveryFee + taxes

  message += `\n*Order Summary:*\n`
  message += `Subtotal: ₹${subtotal}\n`
  if (deliveryFee > 0) {
    message += `Delivery Fee: ₹${deliveryFee}\n`
  }
  message += `Taxes (18%): ₹${taxes}\n`
  message += `*Total: ₹${total}*\n\n`

  message += `📞 Please confirm this order and let me know the estimated time.\n`
  message += `Thank you! 🙏`

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappURL, "_blank")
}

export function sendQuickOrder(itemName: string, quantity = 1) {
  const phoneNumber = "919559545103" // Default to Location 1
  const message = `Hi! I want to order:\n\n🍔 ${itemName} x ${quantity}\n\nPlease let me know the price and availability. Thank you!`
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappURL, "_blank")
}
