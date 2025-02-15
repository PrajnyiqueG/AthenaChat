import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

async function getEmails() {
  // This would be replaced with an actual API call
  return [
    { id: 1, from: "professor@university.edu", subject: "Assignment Feedback", preview: "Great job on your recent..." },
    { id: 2, from: "advisor@university.edu", subject: "Meeting Request", preview: "I'd like to schedule a meeting..." },
  ]
}

async function getTeachers() {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: "Dr. Smith", email: "smith@university.edu" },
    { id: 2, name: "Prof. Johnson", email: "johnson@university.edu" },
    { id: 3, name: "Dr. Lee", email: "lee@university.edu" },
  ]
}

export default function EmailIntegration() {
  const [emails, setEmails] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  useState(() => {
    getEmails().then(setEmails)
    getTeachers().then(setTeachers)
  }, [])

  const handleSendEmail = (e) => {
    e.preventDefault()
    // Here you would typically send the email
    console.log("Sending email to:", selectedTeacher, "Subject:", subject, "Message:", message)
    // Reset form
    setSelectedTeacher("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Email Integration</h2>
      <Card>
        <CardHeader>
          <CardTitle>Compose Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.email}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
      <h3 className="text-xl font-semibold">Inbox</h3>
      {emails.map((email) => (
        <Card key={email.id}>
          <CardHeader>
            <CardTitle>{email.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{email.from}</span>
            </div>
            <p className="mt-2">{email.preview}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

