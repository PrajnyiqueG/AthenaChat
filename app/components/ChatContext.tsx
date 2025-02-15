"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

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

type Message = {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

type ChatContextType = {
  messages: Message[]
  sendMessage: (text: string) => void
  selectedAssignment: Assignment | null
  setSelectedAssignment: (assignment: Assignment | null) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Welcome to Athena Student Assistant! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now(),
        text: `I understand you're asking about: "${text}". How can I assist you further?`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, aiResponse])
    }, 1000)
  }, [])

  return (
    <ChatContext.Provider value={{ messages, sendMessage, selectedAssignment, setSelectedAssignment }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

