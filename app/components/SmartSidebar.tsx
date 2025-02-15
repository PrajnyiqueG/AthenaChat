"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Calendar, GraduationCap, Utensils, Library } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssignmentsSchedule } from "./AssignmentsSchedule"
import { useChat } from "./ChatContext"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const assignments = [
  {
    id: 1,
    title: "Linear Algebra Problem Set",
    class: "Math 201",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    description: "Complete problems 1-20 in Chapter 5 on matrix operations and determinants.",
    priority: "high",
    gradeWeight: 15,
    instructions: "Show all work, use proper notation, and explain your reasoning for each step.",
    progress: 30,
  },
  {
    id: 2,
    title: "World War II Essay",
    class: "History 302",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    description: "Write a 5-page essay on the impact of World War II on global politics.",
    priority: "medium",
    gradeWeight: 20,
    instructions: "Use at least 5 scholarly sources, follow MLA format, and include a works cited page.",
    progress: 50,
  },
  {
    id: 3,
    title: "Web Application Project",
    class: "Computer Science 401",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    description: "Develop a full-stack web application using React and Node.js.",
    priority: "high",
    gradeWeight: 25,
    instructions:
      "Implement user authentication, database integration, and at least 3 main features. Submit source code and a demo video.",
    progress: 10,
  },
  {
    id: 4,
    title: "Lab Report: Photosynthesis",
    class: "Biology 101",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    description: "Write a comprehensive lab report on the photosynthesis experiment conducted in class.",
    priority: "medium",
    gradeWeight: 10,
    instructions:
      "Include introduction, methods, results, discussion, and conclusion sections. Attach all relevant data and graphs.",
    progress: 70,
  },
]

export function SmartSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("assignments")
  const { sendMessage, setSelectedAssignment } = useChat()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleAssignmentClick = (assignment) => {
    sendMessage(
      `Tell me about the assignment: "${assignment.title}" - ${assignment.description}. What are the key requirements and any tips for completing it?`,
    )
    setSelectedAssignment(assignment)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    const determineRelevantTab = () => {
      const hour = new Date().getHours()
      if (hour >= 9 && hour < 17) {
        setActiveTab("assignments")
      } else {
        setActiveTab("schedule")
      }
    }

    determineRelevantTab()
    const interval = setInterval(determineRelevantTab, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !event.target.closest(".smart-sidebar")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const mainIcons = [
    { icon: BookOpen, label: "Assignments", value: "assignments" },
    { icon: Calendar, label: "Schedule", value: "schedule" },
    { icon: GraduationCap, label: "Grades", value: "grades" },
    { icon: Utensils, label: "Dining", value: "dining" },
    { icon: Library, label: "Library", value: "library" },
  ]

  return (
    <motion.div
      className={`smart-sidebar relative bg-sidebar text-sidebar-foreground border-l border-border/40 ${
        !isOpen ? "cursor-pointer hover:bg-sidebar-foreground/10" : ""
      }`}
      initial={{ width: 320 }}
      animate={{ width: isOpen ? 320 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <div className="h-full flex flex-col">
        <div className={`flex-shrink-0 ${isOpen ? "p-2" : "py-2 flex flex-col items-center"}`}>
          <div className={`flex ${isOpen ? "flex-row justify-around" : "flex-col items-center"} gap-2`}>
            <TooltipProvider>
              {mainIcons.map(({ icon: Icon, label, value }) => (
                <Tooltip key={value}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${activeTab === value ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => handleTabChange(value)}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side={isOpen ? "bottom" : "right"} sideOffset={10}>
                    {label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-grow overflow-auto"
            >
              <AssignmentsSchedule
                activeTab={activeTab}
                onAssignmentClick={handleAssignmentClick}
                onTabChange={handleTabChange}
                assignments={assignments}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

