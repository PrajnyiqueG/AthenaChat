'use client';
import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ChatWindow } from "./components/ChatWindow"
import { SmartSidebar } from "./components/SmartSidebar"
import { ChatProvider } from "./components/ChatContext"
import { ClassDashboard } from "./components/ClassDashboard"

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)

  const handleClassSelect = (className: string) => {
    setSelectedClass(className)
    setIsDashboardOpen(true)
  }

  const handleBackToChat = () => {
    setIsDashboardOpen(false)
  }

  return (
    <ChatProvider>
      <div className="flex h-screen bg-content">
        <Sidebar onClassSelect={handleClassSelect} />
        <main className="flex-1 flex">
          <div className="flex-1">
            {selectedClass && isDashboardOpen ? (
              <ClassDashboard className={selectedClass} onBackToChat={handleBackToChat} />
            ) : (
              <ChatWindow />
            )}
          </div>
          <SmartSidebar />
        </main>
      </div>
    </ChatProvider>
  )
}

