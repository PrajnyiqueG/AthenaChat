"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Send,
  BarChart2,
  AudioLines,
  Book,
  Calendar,
  Mail,
  PlusCircle,
  CalendarDays,
  Clock,
  Utensils,
  MapIcon as MapIconLucide,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Building,
  MapIcon,
} from "lucide-react"
import useDebounce from "../hooks/use-debounce"
import { useTheme } from "next-themes"
import type React from "react"

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  short?: string
  end?: string
  keywords: string[]
  category: "Academic" | "Campus Life"
}

interface SearchResult {
  actions: Action[]
}

const allActions: Action[] = [
  {
    id: "1",
    label: "Class Information",
    icon: <Book className="h-4 w-4 text-primary" />,
    description: "View class times, locations, and instructor details",
    keywords: ["class", "course", "lecture", "seminar", "professor", "teacher", "schedule", "syllabus"],
    category: "Academic",
  },
  {
    id: "2",
    label: "Assignments & Deadlines",
    icon: <Calendar className="h-4 w-4 text-primary" />,
    description: "Check upcoming assignments and due dates",
    keywords: ["assignment", "homework", "project", "deadline", "due date", "submission", "task"],
    category: "Academic",
  },
  {
    id: "3",
    label: "Grades & GPA",
    icon: <BarChart2 className="h-4 w-4 text-primary" />,
    description: "View grades and calculate GPA",
    keywords: ["grade", "score", "mark", "GPA", "academic performance", "transcript", "report card"],
    category: "Academic",
  },
  {
    id: "4",
    label: "Course Registration",
    icon: <PlusCircle className="h-4 w-4 text-primary" />,
    description: "Register for courses and manage your schedule",
    keywords: ["register", "enroll", "sign up", "add class", "drop class", "course selection", "academic planning"],
    category: "Academic",
  },
  {
    id: "5",
    label: "Email Integration",
    icon: <Mail className="h-4 w-4 text-primary" />,
    description: "Send and receive emails",
    keywords: ["email", "message", "inbox", "compose", "send", "receive", "communicate", "contact"],
    category: "Campus Life",
  },
  {
    id: "6",
    label: "Calendar View",
    icon: <CalendarDays className="h-4 w-4 text-primary" />,
    description: "View class schedules and events",
    keywords: ["calendar", "schedule", "timetable", "event", "appointment", "reminder", "planner"],
    category: "Campus Life",
  },
  {
    id: "7",
    label: "Study Planner",
    icon: <Clock className="h-4 w-4 text-primary" />,
    description: "Generate personalized study schedules",
    keywords: ["study", "plan", "schedule", "organize", "time management", "productivity", "revision"],
    category: "Academic",
  },
  {
    id: "8",
    label: "Dining Information",
    icon: <Utensils className="h-4 w-4 text-primary" />,
    description: "View dining hall menus and information",
    keywords: ["food", "meal", "dining", "cafeteria", "menu", "nutrition", "dietary", "restaurant"],
    category: "Campus Life",
  },
  {
    id: "9",
    label: "Ask Athena AI Tutor",
    icon: <AudioLines className="h-4 w-4 text-primary" />,
    description: "Get help from Athena AI",
    keywords: ["help", "question", "explain", "clarify", "assist", "support", "guidance", "advice"],
    category: "Academic",
  },
  {
    id: "10",
    label: "Campus Map",
    icon: <MapIconLucide className="h-4 w-4 text-primary" />,
    description: "Navigate the campus and find locations",
    keywords: ["map", "direction", "location", "building", "room", "navigate", "find", "where"],
    category: "Campus Life",
  },
  {
    id: "11",
    label: "Library Resources",
    icon: <BookOpen className="h-4 w-4 text-primary" />,
    description: "Access library catalogs and resources",
    keywords: ["library", "book", "research", "journal", "article", "database", "resource", "study material"],
    category: "Campus Life",
  },
  {
    id: "12",
    label: "Student Services",
    icon: <HelpCircle className="h-4 w-4 text-primary" />,
    description: "Information about various student services",
    keywords: ["service", "support", "help", "counseling", "advising", "financial aid", "health", "career"],
    category: "Campus Life",
  },
  {
    id: "13",
    label: "Campus Map",
    icon: <MapIcon className="h-4 w-4 text-primary" />,
    description: "View an interactive map of the campus",
    keywords: ["map", "campus", "location", "building", "navigate"],
    category: "Campus Life",
  },
]

function ActionSearchBar({
  actions = allActions,
  onActionSelect,
  onSend,
}: {
  actions?: Action[]
  onActionSelect: (action: Action) => void
  onSend: (input: string) => void
}) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const debouncedQuery = useDebounce(query, 200)
  const { theme } = useTheme()

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      return
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions })
      return
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    const filteredActions = allActions.filter((action) => {
      return (
        action.label.toLowerCase().includes(normalizedQuery) ||
        action.description.toLowerCase().includes(normalizedQuery) ||
        action.keywords.some((keyword) => keyword.includes(normalizedQuery))
      )
    })

    setResult({ actions: filteredActions })
  }, [debouncedQuery, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSend(query)
    setQuery("")
  }

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        y: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleFocus = () => {
    setSelectedAction(null)
    setIsFocused(true)
  }

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action)
    onActionSelect(action)
    setQuery("")
    setIsFocused(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return <GraduationCap className={`h-6 w-6 ${theme === "dark" ? "text-primary-foreground" : "text-primary"}`} />
      case "Campus Life":
        return <Building className={`h-6 w-6 ${theme === "dark" ? "text-primary-foreground" : "text-primary"}`} />
      default:
        return null
    }
  }

  return (
    <div className="w-full relative">
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full bg-background z-10 pt-4 pb-1">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask Athena about your classes, assignments, or campus events..."
                value={query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="pl-4 pr-10 py-2 h-10 text-sm bg-secondary/80 border-[0.5px] border-border/40 rounded-lg focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:border-border/80"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <AnimatePresence mode="popLayout">
                  {query.length > 0 ? (
                    <motion.div
                      key="send"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </form>
        </div>

        <div className="w-full">
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className="absolute bottom-full left-0 right-0 border-[0.5px] border-border/40 rounded-lg shadow-lg bg-background mb-2 overflow-hidden"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="grid grid-cols-2 divide-x divide-border/10">
                  {["Academic", "Campus Life"].map((category) => (
                    <motion.div key={category}>
                      <h3 className="px-3 py-2 font-semibold text-sm border-b border-border/10 flex items-center bg-secondary">
                        {getCategoryIcon(category)}
                        <span className="ml-2 text-foreground">{category}</span>
                      </h3>
                      <motion.ul className="divide-y divide-border/10">
                        {result.actions
                          .filter((action) => action.category === category)
                          .map((action) => (
                            <motion.li
                              key={action.id}
                              className="px-3 py-2.5 flex items-center justify-between hover:bg-secondary cursor-pointer transition-colors"
                              variants={item}
                              layout
                              onClick={() => handleActionSelect(action)}
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/30">
                                  {action.icon}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{action.label}</span>
                                  <span className="text-xs text-muted-foreground">{action.description}</span>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                      </motion.ul>
                    </motion.div>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-border/10">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Press ⌘K to open commands</span>
                    <span>ESC to cancel</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ActionSearchBar

