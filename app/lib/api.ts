export async function getCourseData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
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
}

