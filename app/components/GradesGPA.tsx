"use client"

import { TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

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

async function getGrades() {
  // This would be replaced with an actual API call
  return {
    grades: [
      { id: 1, course: "Math 201", grade: "A", percentage: 95 },
      { id: 2, course: "History 302", grade: "B+", percentage: 88 },
      { id: 3, course: "Computer Science 401", grade: "A-", percentage: 92 },
    ],
    gpa: 3.67,
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function GradesGPA() {
  const [gradesData, setGradesData] = useState<any>()

  useEffect(() => {
    getGrades().then(setGradesData)
  }, [])

  if (!gradesData) return <div>Loading...</div>

  const { grades, gpa } = gradesData

  const pieData = grades.map((grade:any) => ({
    name: grade.course,
    value: grade.percentage,
  }))

  return (
    <div className="space-y-4">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-4">
        <Image
          src="/images/logos/academic-achievement.jpg"
          alt="Academic achievement icon"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="text-2xl font-bold">Grades & GPA</h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-between p-6 bg-primary text-primary-foreground rounded-lg"
      >
        <div className="flex items-center gap-4">
          <Award className="h-12 w-12" />
          <div>
            <h3 className="text-lg font-semibold">Overall GPA</h3>
            <p className="text-sm opacity-90">Academic Year 2023-2024</p>
          </div>
        </div>
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          <span className="text-4xl font-bold">{gpa.toFixed(2)}</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {pieData.map((entry:any, index:number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Grade Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={grades}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#8884d8" animationBegin={0} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-2"
      >
        {grades.map((grade:any, index:number) => (
          <motion.div
            key={grade.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex justify-between items-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden">
                <Image
                  src={getClassImage(grade.course) || "/placeholder.svg"}
                  alt={`${grade.course} image`}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{grade.course}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-lg font-bold">{grade.grade}</span>
                <span className="text-sm text-muted-foreground ml-2">({grade.percentage}%)</span>
              </div>
              <div
                className="w-2 h-8 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

