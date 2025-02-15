import { useState, useEffect } from "react"
import { Calendar, Book, GraduationCap, Utensils, Library, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProfileSection } from "./ProfileSection"
import Image from "next/image"
import { useTheme } from "next-themes"

interface SidebarProps {
  onClassSelect: (className: string) => void
}

const classes = [
  {
    name: "Math 201",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.34%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Math%20201%20class.%20The%20scene%20features%20a%20modern%20classroom%20with%20a%20large%20chalkboard%20covered%20in%20complex%20equations%20a%20(1)-bXPI2OnuXcUDYbx4hWGTzlIkp2BcCT.webp",
  },
  {
    name: "History 302",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.36%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20History%20302%20class.%20The%20scene%20features%20an%20elegant%20lecture%20hall%20with%20shelves%20of%20old%20books,%20a%20large%20world%20map%20o-alGReLxE1e3V3oIzDyaRXypRRvqoKD.webp",
  },
  {
    name: "Computer Science 401",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.38%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Computer%20Science%20401%20class.%20The%20scene%20features%20a%20modern%20tech%20lab%20with%20multiple%20high-resolution%20monitors%20disp-XxEnkg8xqinoH7Awid593niTddVPvB.webp",
  },
  {
    name: "Biology 101",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-02%2009.53.39%20-%20A%204K%20ultra-realistic%20image%20representing%20a%20Biology%20101%20class.%20The%20scene%20features%20a%20modern%20lab%20with%20microscopes,%20petri%20dishes,%20and%20biological%20specimens%20-sTZjFPXzozDS3FlfJdUhyLBjBboncF.webp",
  },
]

const events = ["Visiting Chef: Gordon Ramsay", "Campus Movie Night", "Career Fair"]

export function Sidebar({ onClassSelect }: SidebarProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <motion.aside
      className={`bg-sidebar text-sidebar-foreground border-r border-border/40 p-4 pt-16 space-y-6 relative ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out`}
      initial={false}
      animate={{ width: isOpen ? "16rem" : "5rem" }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={`absolute z-20 transition-all duration-300 ${
          isOpen ? "left-2 top-2" : "left-1/2 top-4 -translate-x-1/2"
        }`}
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-56 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 rounded-lg w-full transition-all duration-300"
              style={{
                backgroundImage: !mounted
                  ? "none"
                  : theme === "dark"
                    ? `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ShCnNcimgMRxvbIj2EI3i8hAhwO9Gs.png)`
                    : `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X3B0iqYma1PCNjbdUhG5sRkqKGeDNc.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            {mounted && (
              <div className="relative z-10 w-[180px]">
                <Image
                  src={
                    theme === "dark"
                      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/athena-high-resolution-white-transparent-SGYsgGnBhSotlQfDAze8VtxTMvklOv.png"
                      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/athena-high-resolution-logo-transparent.f70cd753ecdf7f0e6388-bwXu8JAF7HkBLdJ6znR7VadlUlZ0sa.png"
                  }
                  alt="Athena Logo"
                  width={180}
                  height={50}
                  className="h-auto w-auto"
                  priority
                />
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex justify-center my-4">
        <ThemeToggle />
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-2">Classes</h2>
            <ul className="space-y-2">
              {classes.map((cls) => (
                <li key={cls.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-secondary/50 text-muted-foreground hover:text-foreground p-2"
                    onClick={() => {
                      onClassSelect(cls.name)
                      if (window.innerWidth < 768) {
                        setIsOpen(false)
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="relative w-8 h-8 rounded-md overflow-hidden">
                        <Image src={cls.image || "/placeholder.svg"} alt={cls.name} fill className="object-cover" />
                      </div>
                      <span>{cls.name}</span>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-6">Upcoming Events</h2>
            <ul className="space-y-1">
              {events.map((event) => (
                <li key={event}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-secondary/50 text-muted-foreground hover:text-foreground text-left whitespace-normal py-2 h-auto"
                  >
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-2">{event}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`flex flex-col items-center space-y-4 ${isOpen ? "hidden" : "block"}`}>
        <Button variant="ghost" size="icon" title="Classes">
          <Book className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" title="Events">
          <Calendar className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" title="Grades">
          <GraduationCap className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" title="Dining">
          <Utensils className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" title="Library">
          <Library className="h-6 w-6" />
        </Button>
      </div>
      <div className={`mt-auto ${isOpen ? "block" : "hidden"}`}>
        <ProfileSection username="zarrathustraa" isPremium={true} />
      </div>
    </motion.aside>
  )
}

