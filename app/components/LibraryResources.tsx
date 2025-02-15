"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

type Book = {
  id: string
  title: string
  author: string
  dueDate: string
  coverImage: string
}

type RecommendedBook = {
  id: string
  title: string
  author: string
  coverImage: string
  reason: string
}

const borrowedBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2023-06-15",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.48.20%20-%20A%20vintage,%20rustic%20book%20cover%20design%20for%20'The%20Great%20Gatsby'%20facing%20upward,%20similar%20in%20style%20to%20'To%20Kill%20a%20Mockingbird'.%20The%20cover%20features%20a%20dark%20blue%20-1H3SeTHhMY1ZD00upn39UXmuF1HSxi.webp",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dueDate: "2023-06-20",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.48.22%20-%20A%20vintage,%20rustic%20book%20cover%20design%20for%20'The%20Great%20Gatsby'%20to%20match%20the%20style%20of%20'To%20Kill%20a%20Mockingbird'.%20The%20cover%20features%20a%20dark%20blue%20background%20wi-M9VVsVOE7OUGcjbObsQ1Do1L2ti8MG.webp",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    dueDate: "2023-06-25",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.17.40%20-%20A%204K%20ultra-realistic%20book%20cover%20design%20for%20'1984'.%20The%20cover%20features%20a%20dystopian,%20minimalist%20style%20with%20a%20deep%20red%20background.%20A%20large,%20ominous%20eye%20s-G8dmvjrDQji0Iw6tNCj91Aqh43C61v.webp",
  },
]

const recommendedBooks: RecommendedBook[] = [
  {
    id: "4",
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.48.27%20-%20A%20flat,%20minimalist%20book%20cover%20design%20for%20'Brave%20New%20World'.%20The%20cover%20features%20a%20cool%20metallic%20blue%20background%20with%20a%20single%20large%20DNA%20helix%20centered%20-1NELwjiOClLHwRu7RJ00UqQbDxuqhc.webp",
    reason: "Based on your interest in dystopian literature",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.50.36%20-%20A%20vintage,%20nostalgic%20book%20cover%20design%20for%20'The%20Catcher%20in%20the%20Rye'.%20The%20cover%20features%20a%20burnt%20orange%20background%20with%20a%20simple%20illustration%20of%20a%20caro-0DncLZzSUL0zaNv30EIIV3rVs5wZpD.webp",
    reason: "Popular among students and deals with themes of adolescence",
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2010.48.24%20-%20A%20book%20cover%20design%20for%20'Pride%20and%20Prejudice'%20following%20a%20vintage,%20minimalist%20format.%20The%20cover%20features%20a%20soft%20pastel%20pink%20background%20with%20intricate%20-x14izhxtBskGhKT0ZL2dXq1XOYr5Hf.webp",
    reason: "A classic that aligns with your interest in literature",
  },
]

export default function LibraryResources() {
  const [reservedBooks, setReservedBooks] = useState<Set<string>>(new Set())

  const handleReserve = (bookId: string) => {
    setReservedBooks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(bookId)) {
        newSet.delete(bookId)
      } else {
        newSet.add(bookId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {borrowedBooks.map((book) => (
              <div key={book.id} className="flex items-center space-x-4">
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={`Cover of ${book.title}`}
                  width={60}
                  height={90}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="text-sm">
                    Due: <Badge variant="outline">{book.dueDate}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="flex items-center space-x-4">
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={`Cover of ${book.title}`}
                  width={60}
                  height={90}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="text-sm italic">{book.reason}</p>
                </div>
                <AnimatePresence mode="wait">
                  {reservedBooks.has(book.id) ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Button onClick={() => handleReserve(book.id)} size="sm" variant="ghost" className="p-0 h-auto">
                        <Check className="text-green-500 w-6 h-6" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Button onClick={() => handleReserve(book.id)} size="sm" className="whitespace-nowrap">
                        Reserve
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

