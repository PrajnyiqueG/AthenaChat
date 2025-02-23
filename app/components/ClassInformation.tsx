"use client"

import { useState, useEffect } from "react"
import { Book, MapPin, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface ClassInfo {
  id: number
  name: string
  time: string
  location: string
  instructor: string
  image: string
}

async function getClassInformation(): Promise<ClassInfo[]> {
  // This would be replaced with an actual API call
  console.log("Fetching class information...")
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
  return [
    {
      id: 1,
      name: "Math 201",
      time: "Mon, Wed, Fri 9:00 AM",
      location: "Building A, Room 101",
      instructor: "Dr. Smith",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.34%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Math%20201%20class.%20The%20scene%20features%20a%20modern%20classroom%20with%20a%20large%20chalkboard%20covered%20in%20complex%20equations%20a%20(1)-bXPI2OnuXcUDYbx4hWGTzlIkp2BcCT.webp",
    },
    {
      id: 2,
      name: "History 302",
      time: "Tue, Thu 11:00 AM",
      location: "Building B, Room 205",
      instructor: "Prof. Johnson",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.36%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20History%20302%20class.%20The%20scene%20features%20an%20elegant%20lecture%20hall%20with%20shelves%20of%20old%20books,%20a%20large%20world%20map%20o-alGReLxE1e3V3oIzDyaRXypRRvqoKD.webp",
    },
    {
      id: 3,
      name: "Computer Science 401",
      time: "Mon, Wed 2:00 PM",
      location: "Building C, Room 310",
      instructor: "Dr. Lee",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.38%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Computer%20Science%20401%20class.%20The%20scene%20features%20a%20modern%20tech%20lab%20with%20multiple%20high-resolution%20monitors%20disp-XxEnkg8xqinoH7Awid593niTddVPvB.webp",
    },
    {
      id: 4,
      name: "Biology 101",
      time: "Tue, Thu 1:00 PM",
      location: "Building D, Room 405",
      instructor: "Dr. Martinez",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.39%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Biology%20101%20class.%20The%20scene%20features%20a%20modern%20lab%20with%20microscopes,%20petri%20dishes,%20and%20biological%20specimens%20-sTZjFPXzozDS3FlfJdUhyLBjBboncF.webp",
    },
  ]
}

export default function ClassInformation() {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClassInformation()
        setClasses(data)
        setLoading(false)
        console.log("Classes fetched:", data)
      } catch (error) {
        console.error("Error fetching classes:", error)
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  if (loading) {
    return <div className="text-center">Loading class information...</div>
  }

  return (
    <div className="space-y-4 p-4 bg-background">
      <h2 className="text-2xl font-bold">Class Information</h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {classes.map((cls) => (
            <Card key={cls.id} className="overflow-hidden glowing">
              <div className="relative h-48 w-full">
                <Image
                  src={cls.image || "/placeholder.svg"}
                  alt={`${cls.name} classroom`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle>{cls.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Book className="h-4 w-4" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{cls.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{cls.instructor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

