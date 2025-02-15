"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ActionSearchBar from "./ActionSearchBar"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2, User } from "lucide-react"
import CourseRegistration from "./CourseRegistration"
import { useChat } from "./ChatContext"
import { AssignmentDashboard } from "./AssignmentDashboard"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import AuroraBackground from "./aurora-background"
import Image from "next/image"

const ClassInformation = dynamic(() => import("./ClassInformation"))
const AssignmentsDeadlines = dynamic(() => import("./AssignmentsDeadlines"))
const GradesGPA = dynamic(() => import("./GradesGPA"))
const EmailIntegration = dynamic(() => import("./EmailIntegration"))
const CalendarView = dynamic(() => import("./CalendarView"))
const StudyPlanner = dynamic(() => import("./StudyPlanner"))
const DiningInformation = dynamic(() => import("./DiningInformation"))
const Map = dynamic(() => import("./Map"), { ssr: false })
const LibraryResources = dynamic(() => import("./LibraryResources"))

type Message = {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

function ChatWindowContent() {
  const { messages, sendMessage, selectedAssignment } = useChat()
  const [currentComponent, setCurrentComponent] = useState<string | null>(null)
  const [mapQuery, setMapQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef]) // Added messagesEndRef to dependencies

  const handleSend = (input: string) => {
    sendMessage(input)

    const lowercaseInput = input.toLowerCase()
    if (lowercaseInput.includes("map") || lowercaseInput.includes("campus") || lowercaseInput.includes("location")) {
      setCurrentComponent("Campus Map")
      setMapQuery(input)
    } else if (lowercaseInput.includes("class") || lowercaseInput.includes("course")) {
      setCurrentComponent("Class Information")
    } else if (lowercaseInput.includes("assignment") || lowercaseInput.includes("deadline")) {
      setCurrentComponent("Assignments & Deadlines")
    } else if (lowercaseInput.includes("grade") || lowercaseInput.includes("gpa")) {
      setCurrentComponent("Grades & GPA")
    } else if (
      lowercaseInput.includes("register") ||
      lowercaseInput.includes("sign up") ||
      lowercaseInput.includes("course registration")
    ) {
      setCurrentComponent("Course Registration")
    } else if (lowercaseInput.includes("email") || lowercaseInput.includes("message")) {
      setCurrentComponent("Email Integration")
    } else if (lowercaseInput.includes("calendar") || lowercaseInput.includes("schedule")) {
      setCurrentComponent("Calendar View")
    } else if (lowercaseInput.includes("study") || lowercaseInput.includes("plan")) {
      setCurrentComponent("Study Planner")
    } else if (lowercaseInput.includes("dining") || lowercaseInput.includes("food")) {
      setCurrentComponent("Dining Information")
    } else if (lowercaseInput.includes("library") || lowercaseInput.includes("book")) {
      setCurrentComponent("Library Resources")
    } else {
      setCurrentComponent(null)
    }
  }

  const handleActionSelect = (action: any) => {
    sendMessage(`Action selected: ${action.label}`)
    if (action.label === "Campus Map") {
      setMapQuery("")
    }
    setCurrentComponent(action.label)
  }

  return (
    <div className="flex flex-col h-screen bg-content text-content-foreground rounded-lg overflow-hidden relative">
      <AuroraBackground />
      <div className="flex-grow overflow-y-auto relative z-10">
        <div className="p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X4i94RIIn9UEFvCGiEYSpJAPew65YG.png"
                        alt="Athena AI"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <TextGenerateEffect words={message.text} className="text-sm" />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />

          {selectedAssignment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-background rounded-lg shadow-inner-glow overflow-hidden"
            >
              <AssignmentDashboard assignment={selectedAssignment} />
            </motion.div>
          )}

          {currentComponent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-background rounded-lg shadow-inner-glow overflow-hidden"
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
              >
                {currentComponent === "Class Information" && <ClassInformation />}
                {currentComponent === "Assignments & Deadlines" && <AssignmentsDeadlines />}
                {currentComponent === "Grades & GPA" && <GradesGPA />}
                {currentComponent === "Course Registration" && <CourseRegistration />}
                {currentComponent === "Email Integration" && <EmailIntegration />}
                {currentComponent === "Calendar View" && <CalendarView />}
                {currentComponent === "Study Planner" && <StudyPlanner />}
                {currentComponent === "Dining Information" && <DiningInformation />}
                {currentComponent === "Campus Map" && <Map query={mapQuery} />}
                {currentComponent === "Library Resources" && <LibraryResources />}
              </Suspense>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-shrink-0 p-4 bg-background/95 backdrop-blur-xl dark:bg-background/95 border-t border-border/40 relative z-10 shadow-lg"
      >
        <ActionSearchBar onActionSelect={handleActionSelect} onSend={handleSend} />
      </motion.div>
    </div>
  )
}

export function ChatWindow() {
  return <ChatWindowContent />
}

