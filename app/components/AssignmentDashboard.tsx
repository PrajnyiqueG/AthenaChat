import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  AlertTriangle,
  BookOpen,
  Pencil,
  Code,
  FlaskRoundIcon as Flask,
  Calculator,
} from "lucide-react"
import { CircularProgress } from "@/components/ui/circular-progress"
import Image from "next/image"

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

interface AssignmentDashboardProps {
  assignment: Assignment
}

export function AssignmentDashboard({ assignment }: AssignmentDashboardProps) {
  const daysUntilDue = Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))

  const priorityColor = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  }

  const getSubjectIcon = (className: string) => {
    const lowerClass = className.toLowerCase()
    if (lowerClass.includes("math")) return Calculator
    if (lowerClass.includes("computer") || lowerClass.includes("programming")) return Code
    if (lowerClass.includes("science")) return Flask
    if (lowerClass.includes("literature") || lowerClass.includes("english")) return BookOpen
    return Pencil
  }

  const SubjectIcon = getSubjectIcon(assignment.class)

  const getStockImage = (className: string) => {
    const lowerClass = className.toLowerCase()
    if (lowerClass.includes("math")) return "/placeholder.svg?height=200&width=200&text=Math"
    if (lowerClass.includes("computer") || lowerClass.includes("programming"))
      return "/placeholder.svg?height=200&width=200&text=Computer+Science"
    if (lowerClass.includes("science")) return "/placeholder.svg?height=200&width=200&text=Science"
    if (lowerClass.includes("literature") || lowerClass.includes("english"))
      return "/placeholder.svg?height=200&width=200&text=Literature"
    return "/placeholder.svg?height=200&width=200&text=General+Subject"
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{assignment.title}</span>
          <span className={`text-sm font-normal ${priorityColor[assignment.priority]}`}>
            {assignment.priority} priority
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Image
            src={getStockImage(assignment.class) || "/placeholder.svg"}
            alt={`${assignment.class} illustration`}
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <SubjectIcon className="h-5 w-5 text-primary" />
              <span className="font-semibold">{assignment.class}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{daysUntilDue} days left</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description:</h3>
          <p>{assignment.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p>{assignment.instructions}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="font-semibold">Grade Weight:</div>
            <div className="text-2xl font-bold">{assignment.gradeWeight}%</div>
            <div className="text-sm text-muted-foreground">of total grade</div>
          </div>
          <CircularProgress progress={assignment.progress} size={120} strokeWidth={12} className="text-primary" />
        </div>

        {daysUntilDue <= 3 && (
          <div className="flex items-center space-x-2 text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <span>This assignment is due soon! Make sure to prioritize it.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

