import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Book, Calendar, FileText, Users, MessageCircle, Paperclip, BarChart2, MessageSquare } from "lucide-react"

// Mock data for each class
const classDashboardData = {
  "Math 201": {
    title: "Math 201: Linear Algebra",
    items: [
      {
        title: "Course Overview",
        description: "An introduction to linear algebra and its applications.",
        icon: <Book className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Upcoming Classes",
        description: "Next class: Monday, 10:00 AM - Vector Spaces",
        icon: <Calendar className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Assignments",
        description: "2 assignments due this week",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Study Groups",
        description: "3 active study groups",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Discussion Forum",
        description: "15 new posts in the class forum",
        icon: <MessageCircle className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Resources",
        description: "Access course materials and supplementary resources",
        icon: <Paperclip className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Grade Overview",
        description: "Your current grade: 88% (B+)",
        icon: <BarChart2 className="h-4 w-4 text-neutral-500" />,
      },
    ],
  },
  "History 302": {
    title: "History 302: World War II",
    items: [
      {
        title: "Course Overview",
        description: "An in-depth study of World War II and its global impact.",
        icon: <Book className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Upcoming Classes",
        description: "Next class: Tuesday, 2:00 PM - The Pacific Theater",
        icon: <Calendar className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Assignments",
        description: "1 essay due in 2 weeks",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Study Groups",
        description: "2 active study groups",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Discussion Forum",
        description: "10 new posts in the class forum",
        icon: <MessageCircle className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Resources",
        description: "Access primary sources and historical documents",
        icon: <Paperclip className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Grade Overview",
        description: "Your current grade: 92% (A-)",
        icon: <BarChart2 className="h-4 w-4 text-neutral-500" />,
      },
    ],
  },
  "Computer Science 401": {
    title: "Computer Science 401: Advanced Algorithms",
    items: [
      {
        title: "Course Overview",
        description: "Study of advanced algorithmic techniques and problem-solving.",
        icon: <Book className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Upcoming Classes",
        description: "Next class: Wednesday, 1:00 PM - Dynamic Programming",
        icon: <Calendar className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Assignments",
        description: "1 programming assignment due this week",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Study Groups",
        description: "4 active study groups",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Discussion Forum",
        description: "20 new posts in the class forum",
        icon: <MessageCircle className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Resources",
        description: "Access coding examples and algorithm visualizations",
        icon: <Paperclip className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Grade Overview",
        description: "Your current grade: 95% (A)",
        icon: <BarChart2 className="h-4 w-4 text-neutral-500" />,
      },
    ],
  },
  "Biology 101": {
    title: "Biology 101: Introduction to Cell Biology",
    items: [
      {
        title: "Course Overview",
        description: "Fundamentals of cell structure and function.",
        icon: <Book className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Upcoming Classes",
        description: "Next class: Thursday, 11:00 AM - Cellular Respiration",
        icon: <Calendar className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Assignments",
        description: "1 lab report due next week",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Study Groups",
        description: "3 active study groups",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Discussion Forum",
        description: "12 new posts in the class forum",
        icon: <MessageCircle className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Resources",
        description: "Access microscope images and cell diagrams",
        icon: <Paperclip className="h-4 w-4 text-neutral-500" />,
      },
      {
        title: "Grade Overview",
        description: "Your current grade: 89% (B+)",
        icon: <BarChart2 className="h-4 w-4 text-neutral-500" />,
      },
    ],
  },
}

interface ClassDashboardProps {
  className: string
  onBackToChat: () => void
}

export function ClassDashboard({ className, onBackToChat }: ClassDashboardProps) {
  const classData = classDashboardData[className]

  if (!classData) {
    return <div>Class not found</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{classData.title}</h1>
      <BentoGrid className="max-w-4xl mx-auto">
        {classData.items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
      <button
        onClick={onBackToChat}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"
      >
        <MessageSquare className="h-5 w-5" />
        Back to Chat
      </button>
    </div>
  )
}

