"use client"

import { useState, useCallback } from "react"
import { Calendar, CheckCircle, XCircle, ChevronDown, ChevronUp, Upload, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

async function getAssignments() {
  // This would be replaced with an actual API call
  return [
    {
      id: 1,
      title: "Math Homework",
      dueDate: "2023-06-15",
      submitted: false,
      description: "Complete problems 1-20 in Chapter 5",
      instructions: "Show all work and circle your final answers. Use algebraic methods to solve equations.",
    },
    {
      id: 2,
      title: "History Essay",
      dueDate: "2023-06-18",
      submitted: false,
      description: "Write a 5-page essay on the Industrial Revolution",
      instructions: "Include at least 3 primary sources. Discuss the social and economic impacts of industrialization.",
    },
    {
      id: 3,
      title: "Programming Project",
      dueDate: "2023-06-20",
      submitted: false,
      description: "Create a simple web application using React",
      instructions:
        "Implement a to-do list app with the ability to add, remove, and mark tasks as complete. Use functional components and hooks.",
    },
  ]
}

export default function AssignmentsDeadlines() {
  const [assignments, setAssignments] = useState<any>()
  const [expandedAssignment, setExpandedAssignment] = useState<any>()
  const [selectedFile, setSelectedFile] = useState(null)
  const { toast } = useToast()

  useState(() => {
    getAssignments().then(setAssignments)
  }, )

  const toggleExpand = (id: number) => {
    setExpandedAssignment(expandedAssignment === id ? null : id)
  }

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = useCallback(
    (assignmentId:any) => {
      if (!selectedFile) {
        toast({
          title: "Error",
          description: "Please select a file to upload",
          variant: "destructive",
        })
        return
      }

      // Here you would typically upload the file to your server
      // For this example, we'll just simulate a successful upload
      setTimeout(() => {
        setAssignments((prevAssignments:any) =>
          prevAssignments.map((assignment:any) =>
            assignment.id === assignmentId ? { ...assignment, submitted: true } : assignment,
          ),
        )
        setSelectedFile(null)
        toast({
          title: "Success",
          description: "Assignment submitted successfully",
        })
      }, 1500)
    },
    [selectedFile, toast],
  )

  const handleSendToLMS = useCallback(
    (assignmentId: any) => {
      // Here you would typically send the submission to the LMS
      // For this example, we'll just simulate a successful send
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Assignment sent to LMS successfully",
        })
      }, 1500)
    },
    [toast],
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Assignments & Deadlines</h2>
      {assignments?.map((assignment:any) => (
        <Card key={assignment.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {assignment.title}
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(assignment.id)}>
                {expandedAssignment === assignment.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              {assignment.submitted ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>{assignment.submitted ? "Submitted" : "Not Submitted"}</span>
            </div>
            {expandedAssignment === assignment.id && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Description:</h4>
                <p>{assignment.description}</p>
                <h4 className="font-semibold">Instructions:</h4>
                <p>{assignment.instructions}</p>
                {!assignment.submitted && (
                  <div className="mt-4">
                    <Input type="file" onChange={handleFileChange} />
                    <div className="flex space-x-2 mt-2">
                      <Button onClick={() => handleSubmit(assignment.id)}>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Button>
                      <Button variant="outline" onClick={() => handleSendToLMS(assignment.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Send to LMS
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

