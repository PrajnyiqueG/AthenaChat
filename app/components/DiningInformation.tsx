"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import Image from "next/image"

async function getDiningInfo() {
  // This would be replaced with an actual API call
  return {
    menu: [
      {
        id: 1,
        item: "Grilled Chicken",
        calories: 300,
        price: 8.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.30%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Grilled%20Chicken.%20The%20grilled%20chicken%20is%20perfectly%20cooked%20with%20visible%20char%20marks,%20golden-brown%20and%20juicy.%20It%20i-PMj0SC0UmEj9WR0YrkWdMLzxnkYAkB.webp",
      },
      {
        id: 2,
        item: "Vegetarian Pasta",
        calories: 400,
        price: 7.99,
        isSpecial: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.24%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Vegetarian%20Pasta.%20The%20pasta%20features%20colorful%20vegetables%20like%20bell%20peppers,%20zucchini,%20and%20cherry%20tomatoes,%20tos-WEqbO0vLbYvRMEP2i0zw5l1SsK1Yor.webp",
      },
      {
        id: 3,
        item: "Caesar Salad",
        calories: 250,
        price: 6.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.25%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Caesar%20Salad.%20The%20salad%20features%20crisp%20romaine%20lettuce,%20golden%20croutons,%20and%20shaved%20parmesan%20cheese,%20with%20crea-n0m2kSLeq2F399TvZ3F2OuRLxnROIa.webp",
      },
    ],
    fullMenu: [
      {
        id: 1,
        item: "Grilled Chicken",
        calories: 300,
        price: 8.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.30%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Grilled%20Chicken.%20The%20grilled%20chicken%20is%20perfectly%20cooked%20with%20visible%20char%20marks,%20golden-brown%20and%20juicy.%20It%20i-PMj0SC0UmEj9WR0YrkWdMLzxnkYAkB.webp",
      },
      {
        id: 2,
        item: "Vegetarian Pasta",
        calories: 400,
        price: 7.99,
        isSpecial: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.24%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Vegetarian%20Pasta.%20The%20pasta%20features%20colorful%20vegetables%20like%20bell%20peppers,%20zucchini,%20and%20cherry%20tomatoes,%20tos-WEqbO0vLbYvRMEP2i0zw5l1SsK1Yor.webp",
      },
      {
        id: 3,
        item: "Caesar Salad",
        calories: 250,
        price: 6.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.25%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Caesar%20Salad.%20The%20salad%20features%20crisp%20romaine%20lettuce,%20golden%20croutons,%20and%20shaved%20parmesan%20cheese,%20with%20crea-n0m2kSLeq2F399TvZ3F2OuRLxnROIa.webp",
      },
      {
        id: 4,
        item: "Burger",
        calories: 550,
        price: 9.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.26%20-%20A%20realistic,%20standardized%20menu%20image%20of%20a%20Burger.%20The%20burger%20features%20a%20juicy%20beef%20patty%20with%20melted%20cheese,%20fresh%20lettuce,%20tomato%20slices,%20and%20a%20toast-fFvfFiULLzwF8PRbwwGJMQIl3k1vjw.webp",
      },
      {
        id: 5,
        item: "Fish and Chips",
        calories: 700,
        price: 10.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.27%20-%20A%20realistic,%20standardized%20menu%20image%20of%20Fish%20and%20Chips.%20The%20dish%20features%20golden,%20crispy%20battered%20fish%20fillets%20served%20with%20thick,%20perfectly%20cooked%20fri-uSAdqoyNGh8yKXGHQbd6meDsp131uU.webp",
      },
      {
        id: 6,
        item: "Sushi Roll",
        calories: 350,
        price: 11.99,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.59.28%20-%20A%20realistic,%20standardized%20menu%20image%20of%20a%20Sushi%20Roll.%20The%20sushi%20roll%20is%20neatly%20arranged%20with%20colorful%20ingredients%20like%20fresh%20salmon,%20avocado,%20and%20cucu-Vx9oDLtxxdkSSlsyh4OOHRw3nymWk2.webp",
      },
    ],
    hours: "7:00 AM - 9:00 PM",
    location: "Student Center, Building D",
    visitingChef: {
      name: "Chef Gordon Ramsay",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gordon-ramsay-s-DiCbNSS9vm3Ah48Fpx7BouwIqx7Y3e.webp",
      location: "Main Dining Hall",
      specialDish: "Beef Wellington",
      price: 15.99,
    },
  }
}

export default function DiningInformation() {
  const [diningInfo, setDiningInfo] = useState(null)

  useEffect(() => {
    getDiningInfo().then(setDiningInfo)
  }, [])

  if (!diningInfo) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-4">
        <Image
          src="/images/logos/dining-hall.webp"
          alt="Dining hall icon"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="text-2xl font-bold">Dining Information</h2>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {diningInfo?.menu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  item.isSpecial ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-secondary"
                }`}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.item}`}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${item.isSpecial ? "text-yellow-600 dark:text-yellow-400" : ""}`}>
                      {item.item}
                    </span>
                    {item.isSpecial && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{item.calories} cal</span>
                </div>
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-4">View Full Menu</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Full Menu</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
                {diningInfo?.fullMenu.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      item.isSpecial ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-secondary"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.item}`}
                      width={120}
                      height={120}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.isSpecial ? "text-yellow-600 dark:text-yellow-400" : ""}`}>
                          {item.item}
                        </span>
                        {item.isSpecial && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <span className="text-sm text-muted-foreground">{item.calories} cal</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      <Button size="sm">Order Now</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Dining Hall Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{diningInfo?.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{diningInfo?.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Visiting Chef</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={diningInfo.visitingChef.image || "/placeholder.svg"}
                    alt={diningInfo?.visitingChef.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{diningInfo?.visitingChef.name}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{diningInfo?.visitingChef.location}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="font-semibold">Special Dish</div>
                  <div className="flex items-center justify-between mt-2">
                    <span>{diningInfo?.visitingChef.specialDish}</span>
                    <span className="text-lg font-bold">${diningInfo?.visitingChef.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

