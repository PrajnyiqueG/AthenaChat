"use client"

import { useState } from "react"
import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Event {
  id: number
  title: string
  date: Date
  type: "class" | "assignment" | "event"
}

const mockEvents: Event[] = [
  { id: 1, title: "Math 101", date: new Date("2023-06-15T09:00:00"), type: "class" },
  { id: 2, title: "History Essay Due", date: new Date("2023-06-18T23:59:59"), type: "assignment" },
  { id: 3, title: "Campus Movie Night", date: new Date("2023-06-20T20:00:00"), type: "event" },
  { id: 4, title: "Math 201", date: new Date("2023-06-22T14:00:00"), type: "class" },
  { id: 5, title: "History 302", date: new Date("2023-06-25T10:00:00"), type: "class" },
  { id: 6, title: "Computer Science 401", date: new Date("2023-06-27T16:00:00"), type: "class" },
  { id: 7, title: "Biology 101", date: new Date("2023-06-29T09:00:00"), type: "class" },
]

const getClassImage = (className: string): string => {
  const classMap: Record<string, string> = {
    "Math 201":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.34%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Math%20201%20class.%20The%20scene%20features%20a%20modern%20classroom%20with%20a%20large%20chalkboard%20covered%20in%20complex%20equations%20a%20(1)-bXPI2OnuXcUDYbx4hWGTzlIkp2BcCT.webp",
    "History 302":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.36%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20History%20302%20class.%20The%20scene%20features%20an%20elegant%20lecture%20hall%20with%20shelves%20of%20old%20books,%20a%20large%20world%20map%20o-alGReLxE1e3V3oIzDyaRXypRRvqoKD.webp",
    "Computer Science 401":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.38%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Computer%20Science%20401%20class.%20The%20scene%20features%20a%20modern%20tech%20lab%20with%20multiple%20high-resolution%20monitors%20disp-XxEnkg8xqinoH7Awid593niTddVPvB.webp",
    "Biology 101":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.39%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Biology%20101%20class.%20The%20scene%20features%20a%20modern%20lab%20with%20microscopes,%20petri%20dishes,%20and%20biological%20specimens%20-sTZjFPXzozDS3FlfJdUhyLBjBboncF.webp",
  }
  return classMap[className] || "/placeholder.svg"
}

export default function CalendarView() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const eventColors = {
    class: "border-blue-500 bg-blue-500/20",
    assignment: "border-red-500 bg-red-500/20",
    event: "border-green-500 bg-green-500/20",
  }

  const selectedDateEvents = selectedDate
    ? events.filter((event) => event.date.toDateString() === selectedDate.toDateString())
    : []

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Calendar View</h2>

      <Card>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              booked: (date) => events.some((event) => event.date.toDateString() === date.toDateString()),
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                textDecoration: "underline",
              },
            }}
          />
        </CardContent>
      </Card>

      <div className="space-y-2">
        {selectedDateEvents.map((event) => (
          <Card key={event.id} className={cn("border-2", eventColors[event.type])}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <Image
                    src={getClassImage(event.title) || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="flex items-center justify-between">
                  <span>{event.title}</span>
                  <span className="text-sm font-normal capitalize">{event.type}</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>{event.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{event.date.toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

