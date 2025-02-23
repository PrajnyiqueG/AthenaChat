import { useState } from "react"
import { Clock, Book, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

async function getStudyPlan() {
  // This would be replaced with an actual API call
  return [
    {
      id: 1,
      subject: "Math 101",
      duration: 60,
      time: "9:00 AM - 10:00 AM",
      topics: [
        "Algebra: Solving quadratic equations",
        "Geometry: Properties of triangles",
        "Calculus: Introduction to limits",
      ],
    },
    {
      id: 2,
      subject: "History 202",
      duration: 45,
      time: "11:00 AM - 11:45 AM",
      topics: [
        "World War II: Major battles",
        "Cold War: Key events and figures",
        "Decolonization: Impact on global politics",
      ],
    },
    {
      id: 3,
      subject: "Computer Science 301",
      duration: 90,
      time: "2:00 PM - 3:30 PM",
      topics: [
        "Data Structures: Binary trees and heaps",
        "Algorithms: Sorting and searching techniques",
        "Database Systems: SQL queries and normalization",
      ],
    },
  ]
}

export default function StudyPlanner() {
  const [studyPlan, setStudyPlan] = useState<any>()
  const [expandedSubject, setExpandedSubject] = useState(null)

  useState(() => {
    getStudyPlan().then(setStudyPlan)
  }, )

  const toggleExpand = (id:any) => {
    setExpandedSubject(expandedSubject === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Study Planner</h2>
      {studyPlan.map((session:any) => (
        <Card key={session.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {session.subject}
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(session.id)}>
                {expandedSubject === session.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{session.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Book className="h-4 w-4" />
              <span>{session.duration} minutes</span>
            </div>
            {expandedSubject === session.id && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Topics to Study:</h4>
                <ul className="list-disc list-inside">
                  {session.topics.map((topic:any, index:number) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

