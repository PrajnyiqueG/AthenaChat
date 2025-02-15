"use client"

import { useState } from "react"
import { Calendar, Clock, MessageSquare, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

type Assignment = {
  id: number
  title: string
  class: string
  dueDate: Date
  description: string
  priority: "high" | "medium" | "low"
  gradeWeight: number
  instructions: string
  progress: number
}

interface AssignmentsScheduleProps {
  activeTab?: string
  onAssignmentClick: (assignment: Assignment) => void
  onTabChange?: (value: string) => void
  assignments: Assignment[]
}

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

const getSubjectImage = (className: string) => {
  const lowerClass = className.toLowerCase()
  if (lowerClass.includes("math")) return "/images/subjects/math.webp"
  if (lowerClass.includes("computer") || lowerClass.includes("programming"))
    return "/images/subjects/computer-science.webp"
  if (lowerClass.includes("science")) return "/images/subjects/science.webp"
  if (lowerClass.includes("literature") || lowerClass.includes("english")) return "/images/subjects/literature.webp"
  return "/images/subjects/general-subject.webp"
}

export function AssignmentsSchedule({
  activeTab = "assignments",
  onAssignmentClick,
  onTabChange,
  assignments,
}: AssignmentsScheduleProps) {
  const [filter, setFilter] = useState("all")
  const [hoveredAssignment, setHoveredAssignment] = useState<number | null>(null)

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true
    return assignment.class === filter
  })

  const getPriorityColor = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500 dark:text-red-400"
      case "medium":
        return "text-yellow-500 dark:text-yellow-400"
      case "low":
        return "text-green-500 dark:text-green-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="h-full bg-sidebar text-sidebar-foreground rounded-lg overflow-auto p-2">
      {activeTab === "assignments" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Athena Assignments</h2>
          <div className="space-y-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="mr-2"
            >
              All
            </Button>
            {Array.from(new Set(assignments.map((a) => a.class))).map((className) => (
              <Button
                key={className}
                variant={filter === className ? "default" : "outline"}
                onClick={() => setFilter(className)}
                className="mr-2"
              >
                {className}
              </Button>
            ))}
          </div>
          <AnimatePresence>
            <motion.ul className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <motion.li
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredAssignment(assignment.id)}
                  onMouseLeave={() => setHoveredAssignment(null)}
                >
                  <div
                    onClick={() => onAssignmentClick(assignment)}
                    className="bg-secondary/50 p-4 rounded-lg cursor-pointer hover:bg-secondary/80 transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={getClassImage(assignment.class) || "/placeholder.svg"}
                          alt={assignment.class}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-base">{assignment.title}</h3>
                          <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
                            {assignment.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{assignment.class}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Due: {assignment.dueDate.toLocaleDateString()}
                          </p>
                          {hoveredAssignment === assignment.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex items-center text-sm text-primary"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Ask about this
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </>
      )}
      {activeTab === "schedule" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Athena Class Schedule</h2>
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="mr-2" />
                  <span className="font-medium">Monday, Wednesday, Friday</span>
                </div>
                <div className="ml-6 space-y-2 mt-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>9:00 AM - Math 201</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>11:00 AM - History 302</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="mr-2" />
                  <span className="font-medium">Tuesday, Thursday</span>
                </div>
                <div className="ml-6 space-y-2 mt-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>10:00 AM - Computer Science 401</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>2:00 PM - Biology 101</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
      {activeTab === "grades" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2" />
              Grades Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your grades information will be displayed here.</p>
          </CardContent>
        </Card>
      )}
      {activeTab === "dining" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {/*Utensils className="mr-2" />*/}
              Dining Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dining hall menus and information will be displayed here.</p>
          </CardContent>
        </Card>
      )}
      {activeTab === "library" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {/*Library className="mr-2" />*/}
              Library Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Library resources and information will be displayed here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

