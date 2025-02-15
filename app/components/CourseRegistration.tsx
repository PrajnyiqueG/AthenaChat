"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, Book, ShuffleIcon, GraduationCap, Zap } from "lucide-react"
import Image from "next/image"

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

function CourseRegistration() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])
  const [requirements, setRequirements] = useState([])
  const [exams, setExams] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [swapCourse, setSwapCourse] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const initialData = {
          enrolledCourses: [
            {
              id: 1,
              code: "CS101",
              name: "Introduction to Computer Science",
              schedule: "MWF 9:00 AM - 10:30 AM",
              credits: 3,
            },
            { id: 2, code: "MATH201", name: "Calculus II", schedule: "TTh 11:00 AM - 12:30 PM", credits: 4 },
            { id: 3, code: "ENG102", name: "English Composition", schedule: "MWF 1:00 PM - 2:30 PM", credits: 3 },
          ],
          availableCourses: [
            { id: 4, code: "PHYS101", name: "Introduction to Physics", schedule: "TTh 2:00 PM - 3:30 PM", credits: 4 },
            { id: 5, code: "CHEM101", name: "General Chemistry", schedule: "MWF 10:00 AM - 11:30 AM", credits: 4 },
          ],
          requirements: [
            {
              id: 1,
              code: "CS201",
              name: "Data Structures",
              description: "Essential for your Computer Science major",
              interest: "Aligns with your love for problem-solving and algorithms",
              credits: 3,
            },
            {
              id: 2,
              code: "MATH301",
              name: "Linear Algebra",
              description: "Recommended for your Computer Science major",
              interest: "Matches your interest in AI and machine learning applications",
              credits: 3,
            },
            {
              id: 3,
              code: "CS250",
              name: "Introduction to Web Development",
              description: "Elective for Computer Science majors",
              interest: "Perfect for your passion in creating interactive web applications",
              credits: 3,
            },
          ],
          exams: [
            { id: 1, course: "CS101", date: "2023-06-20", time: "10:00 AM - 12:00 PM", location: "Room 101" },
            { id: 2, course: "MATH201", date: "2023-06-22", time: "2:00 PM - 4:00 PM", location: "Room 205" },
            { id: 3, course: "ENG102", date: "2023-06-24", time: "9:00 AM - 11:00 AM", location: "Room 303" },
          ],
        }

        setData(initialData)
        setEnrolledCourses(initialData.enrolledCourses)
        setAvailableCourses(initialData.availableCourses)
        setRequirements(initialData.requirements)
        setExams(initialData.exams)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching course data:", error)
        setLoading(false)
        toast({
          title: "Error",
          description: "Failed to load course data. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-4 text-center">
        <p>Failed to load course data. Please try again.</p>
      </div>
    )
  }

  const handleEnroll = (course) => {
    setEnrolledCourses([...enrolledCourses, course])
    setAvailableCourses(availableCourses.filter((c) => c.id !== course.id))
    toast({
      title: "Enrolled",
      description: `You have successfully enrolled in ${course.name}`,
    })
  }

  const handleDrop = (courseId) => {
    const droppedCourse = enrolledCourses.find((course) => course.id === courseId)
    setEnrolledCourses(enrolledCourses.filter((course) => course.id !== courseId))
    setAvailableCourses([...availableCourses, droppedCourse])
    toast({
      title: "Dropped",
      description: `You have successfully dropped ${droppedCourse.name}`,
    })
  }

  const handleSwap = () => {
    if (!selectedCourse || !swapCourse) {
      toast({
        title: "Error",
        description: "Please select both courses to swap",
        variant: "destructive",
      })
      return
    }

    const courseToAdd = availableCourses.find((course) => course.id === Number.parseInt(swapCourse))
    const courseToRemove = enrolledCourses.find((course) => course.id === selectedCourse)

    setEnrolledCourses(enrolledCourses.map((course) => (course.id === selectedCourse ? courseToAdd : course)))
    setAvailableCourses(
      availableCourses.map((course) => (course.id === Number.parseInt(swapCourse) ? courseToRemove : course)),
    )

    setSelectedCourse(null)
    setSwapCourse("")

    toast({
      title: "Swapped",
      description: `You have successfully swapped ${courseToRemove.name} with ${courseToAdd.name}`,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Course Registration</h2>
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="update">Update Classes</TabsTrigger>
          <TabsTrigger value="swap">Swap Classes</TabsTrigger>
          <TabsTrigger value="requirements">Enroll by Requirements</TabsTrigger>
          <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <Image
                          src={getClassImage(course.code) || "/placeholder.svg"}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.code} | {course.schedule}
                        </p>
                        <p className="text-sm text-muted-foreground">Credits: {course.credits}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDrop(course.id)}>
                      Drop
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableCourses.map((course) => (
                  <div key={course.id} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <div>
                      <p className="font-semibold">{course.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.code} | {course.schedule}
                      </p>
                      <p className="text-sm text-muted-foreground">Credits: {course.credits}</p>
                    </div>
                    <Button size="sm" onClick={() => handleEnroll(course)}>
                      Enroll
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swap">
          <Card>
            <CardHeader>
              <CardTitle>Swap Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Select course to swap out:</label>
                  <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {enrolledCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Select course to swap in:</label>
                  <Select onValueChange={setSwapCourse} value={swapCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSwap} className="w-full">
                  <ShuffleIcon className="mr-2 h-4 w-4" />
                  Swap Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Enroll by Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((course) => (
                  <div key={course.id} className="p-4 bg-secondary rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.code} | Credits: {course.credits}
                        </p>
                      </div>
                      <Button size="sm" onClick={() => handleEnroll(course)}>
                        Enroll
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>{course.description}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span>{course.interest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle>Exam Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exams.map((exam) => (
                  <div key={exam.id} className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">{exam.course}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Book className="h-4 w-4" />
                      <span>{exam.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CourseRegistration

