"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Award,
  Building,
  Mail,
  Lock,
  Github,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
  User,
  BookOpen,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { studentsData, alumniData } from "@/lib/data-service"

const testimonials = [
  {
    name: "Alex Chen",
    role: "Software Engineer at Google",
    batch: "2020",
    image: "/placeholder.svg?height=64&width=64",
    content:
      "This platform helped me connect with amazing alumni who guided me through my career transition. Got 3 referrals and landed my dream job!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Data Scientist at Microsoft",
    batch: "2019",
    image: "/placeholder.svg?height=64&width=64",
    content:
      "As an alumni, I love being able to give back to the community. The platform makes it easy to mentor students and share opportunities.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Full Stack Developer at Netflix",
    batch: "2021",
    image: "/placeholder.svg?height=64&width=64",
    content:
      "The resume ATS checker was a game-changer! Improved my score from 65% to 92% and got multiple interview calls.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Product Manager at Amazon",
    batch: "2018",
    image: "/placeholder.svg?height=64&width=64",
    content:
      "The discussion groups are incredibly valuable. Real-time help from industry professionals made all the difference in my preparation.",
    rating: 5,
  },
]

const features = [
  {
    icon: Users,
    title: "Connect with Alumni",
    description: "Build meaningful relationships with successful graduates from your institution",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Group Discussions",
    description: "Join domain-specific discussions and get real-time help from industry experts",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: TrendingUp,
    title: "Resume ATS Checker",
    description: "Optimize your resume with our AI-powered ATS scoring system",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Award,
    title: "Get Referrals",
    description: "Receive job referrals from alumni working at top companies",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
]

const stats = [
  { label: "Active Students", value: "2,500+", icon: GraduationCap },
  { label: "Alumni Network", value: "1,200+", icon: Users },
  { label: "Successful Referrals", value: "850+", icon: CheckCircle },
  { label: "Job Placements", value: "650+", icon: Building },
]

export default function LandingPage() {
  const router = useRouter()
  const { login, loginWithCredentials, register, isLoading: authLoading } = useUser()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [loginType, setLoginType] = useState<"student" | "alumni">("student")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  // Form states
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    yearOfStudy: "",
    department: "",
  })

  const [alumniForm, setAlumniForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  })
  // Alumni batch selection
  const availableBatchYears = Array.from(new Set(alumniData.map(a => parseInt(a.graduationYear, 10)).filter(Boolean)))
    .map(end => ({ startYear: end - 4, endYear: end }))
    .sort((a,b) => b.endYear - a.endYear)
  const [batchMode, setBatchMode] = useState<"select"|"manual">("select")
  const [batchSelect, setBatchSelect] = useState("__NONE__")
  const [batchStart, setBatchStart] = useState("")
  const [batchEnd, setBatchEnd] = useState("")
  const [batchError, setBatchError] = useState("")

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleLogin = (type: "student" | "alumni") => {
    setLoginType(type)
    setIsLoginOpen(true)
  }

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isRegisterMode) {
        // Register new student
        const response = await register({
          name: studentForm.name,
          email: studentForm.email,
          password: studentForm.password,
          userType: "student",
          yearOfStudy: studentForm.yearOfStudy,
          department: studentForm.department
        })

        if (response.success) {
          setIsLoginOpen(false)
          router.push("/student/dashboard")
        } else {
          setError(response.message || "Registration failed")
        }
      } else {
        // Login existing student
        const response = await loginWithCredentials({
          email: studentForm.email,
          password: studentForm.password
        }, "student")

        if (response.success) {
          setIsLoginOpen(false)
          router.push("/student/dashboard")
        } else {
          setError(response.message || "Login failed")
        }
      }
    } catch (error) {
      console.error("Student form error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate batch
      setBatchError("")
      let startYear: number | null = null
      let endYear: number | null = null
      
      if (isRegisterMode) {
        if (batchMode === "select") {
          if (!batchSelect || batchSelect === "__NONE__") {
            setBatchError("Please select your batch.")
            setIsLoading(false)
            return
          }
          const parts = batchSelect.split("-")
          startYear = parseInt(parts[0], 10)
          endYear = parseInt(parts[1], 10)
        } else {
          startYear = parseInt(batchStart, 10)
          endYear = parseInt(batchEnd, 10)
          if (isNaN(startYear) || isNaN(endYear) || startYear >= endYear || endYear - startYear !== 4) {
            setBatchError("Enter a valid 4-year range (e.g., 2019–2023).")
            setIsLoading(false)
            return
          }
        }
      }

      if (isRegisterMode) {
        // Register new alumni
        const response = await register({
          name: alumniForm.name,
          email: alumniForm.email,
          password: alumniForm.password,
          userType: "alumni",
          companyName: alumniForm.companyName,
          batchStart: startYear || undefined,
          batchEnd: endYear || undefined
        })

        if (response.success) {
          // Persist batch selection
          if (startYear && endYear) {
            localStorage.setItem("alumni_batch", JSON.stringify({ startYear, endYear }))
            sessionStorage.setItem("alumni_batch_set", "1")
          }
          setIsLoginOpen(false)
          router.push("/alumni/dashboard")
        } else {
          setError(response.message || "Registration failed")
        }
      } else {
        // Login existing alumni
        const response = await loginWithCredentials({
          email: alumniForm.email,
          password: alumniForm.password
        }, "alumni")

        if (response.success) {
          setIsLoginOpen(false)
          router.push("/alumni/dashboard")
        } else {
          setError(response.message || "Login failed")
        }
      }
    } catch (error) {
      console.error("Alumni form error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForms = () => {
    setStudentForm({
      name: "",
      email: "",
      password: "",
      yearOfStudy: "",
      department: "",
    })
    setAlumniForm({
      name: "",
      email: "",
      password: "",
      companyName: "",
    })
    setError("")
    setBatchError("")
    setBatchSelect("__NONE__")
    setBatchStart("")
    setBatchEnd("")
  }

  const handleDialogClose = () => {
    setIsLoginOpen(false)
    setIsRegisterMode(false)
    resetForms()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">PIXIL</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </a>
              <a href="#stats" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => handleLogin("student")}>
                Login
              </Button>
              <Button onClick={() => handleLogin("student")}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              🎉 Join 3,700+ students and alumni
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Bridge the Gap Between{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Students & Alumni
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with successful graduates, get career guidance, receive job referrals, and accelerate your
              professional journey with our trusted alumni network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 group" onClick={() => handleLogin("student")}>
                <GraduationCap className="mr-2 h-5 w-5" />
                Join as Student
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 group bg-transparent"
                onClick={() => handleLogin("alumni")}
              >
                <Users className="mr-2 h-5 w-5" />
                Join as Alumni
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PIXIL?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to connect with alumni, advance your career, and build meaningful professional
              relationships.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover-lift text-center">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">
              Real stories from students and alumni who found success through our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="ghost" size="icon" onClick={prevTestimonial} className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" onClick={nextTestimonial} className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                    />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-lg italic mb-4 text-gray-600">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div>
                    <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
                    <Badge variant="secondary" className="mt-2">
                      Batch of {testimonials[currentTestimonial].batch}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and alumni who are already building meaningful connections and advancing their
            careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={() => handleLogin("student")}>
              Start as Student
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => handleLogin("alumni")}
            >
              Join as Alumni
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">PIXIL</span>
              </div>
              <p className="text-gray-600 text-sm">
                Connecting students with alumni for career growth and professional development.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    For Students
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    For Alumni
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">© 2024 PIXIL. All rights reserved.</div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {loginType === "student" ? (
                <>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  {isRegisterMode ? "Student Registration" : "Student Login"}
                </>
              ) : (
                <>
                  <Users className="mr-2 h-5 w-5" />
                  {isRegisterMode ? "Alumni Registration" : "Alumni Login"}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {isRegisterMode 
                ? `Create your ${loginType} account to get started` 
                : `Sign in to your ${loginType} account`
              }
            </DialogDescription>
          </DialogHeader>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {loginType === "student" ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              {isRegisterMode && (
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="student-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      required={isRegisterMode}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="student-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    className="pl-10"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="student-password"
                    type="password"
                    className="pl-10"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {isRegisterMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="year-of-study">Year of Study</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="year-of-study"
                        type="text"
                        placeholder="e.g., Final Year, 3rd Year"
                        className="pl-10"
                        value={studentForm.yearOfStudy}
                        onChange={(e) => setStudentForm({ ...studentForm, yearOfStudy: e.target.value })}
                        required={isRegisterMode}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="department"
                        type="text"
                        placeholder="e.g., Computer Science, Mechanical Engineering"
                        className="pl-10"
                        value={studentForm.department}
                        onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                        required={isRegisterMode}
                      />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || authLoading}>
                {isLoading || authLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegisterMode ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    {isRegisterMode ? "Create Student Account" : "Sign In"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => alert('Redirect to LinkedIn OAuth')}>
                <Linkedin className="mr-2 h-4 w-4" /> Login with LinkedIn
              </Button>
            </form>
          ) : (
            <form onSubmit={handleAlumniSubmit} className="space-y-4">
              {isRegisterMode && (
                <div className="space-y-2">
                  <Label htmlFor="alumni-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="alumni-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={alumniForm.name}
                      onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                      required={isRegisterMode}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="alumni-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="alumni-email"
                    type="email"
                    placeholder="alumni@company.com"
                    className="pl-10"
                    value={alumniForm.email}
                    onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alumni-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="alumni-password"
                    type="password"
                    className="pl-10"
                    value={alumniForm.password}
                    onChange={(e) => setAlumniForm({ ...alumniForm, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {isRegisterMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company-name"
                        type="text"
                        placeholder="e.g., Google, Microsoft, Amazon"
                        className="pl-10"
                        value={alumniForm.companyName}
                        onChange={(e) => setAlumniForm({ ...alumniForm, companyName: e.target.value })}
                        required={isRegisterMode}
                      />
                    </div>
                  </div>

                  {/* Batch Selection */}
                  <div className="space-y-2">
                    <Label>Batch (Joining – Graduation)</Label>
                    <div className="flex gap-2">
                      <Button type="button" variant={batchMode === "select" ? "default" : "outline"} onClick={()=>setBatchMode("select")}>Choose</Button>
                      <Button type="button" variant={batchMode === "manual" ? "default" : "outline"} onClick={()=>setBatchMode("manual")}>Enter manually</Button>
                    </div>
                    {batchMode === "select" ? (
                      <Select value={batchSelect} onValueChange={setBatchSelect}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Select your batch" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__NONE__">Select batch</SelectItem>
                          {availableBatchYears.map(b => (
                            <SelectItem key={`${b.startYear}-${b.endYear}`} value={`${b.startYear}-${b.endYear}`}>{b.startYear} - {b.endYear}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Start year (e.g., 2019)" value={batchStart} onChange={e=>setBatchStart(e.target.value)} required={batchMode==='manual'} />
                        <Input placeholder="End year (e.g., 2023)" value={batchEnd} onChange={e=>setBatchEnd(e.target.value)} required={batchMode==='manual'} />
                      </div>
                    )}
                    {batchError && <div className="text-xs text-red-600">{batchError}</div>}
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || authLoading}>
                {isLoading || authLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegisterMode ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    {isRegisterMode ? "Create Alumni Account" : "Sign In"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => alert('Redirect to LinkedIn OAuth')}>
                <Linkedin className="mr-2 h-4 w-4" /> Login with LinkedIn
              </Button>
            </form>
          )}

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => setLoginType(loginType === "student" ? "alumni" : "student")}
            >
              Switch to {loginType === "student" ? "Alumni" : "Student"} {isRegisterMode ? "Registration" : "Login"}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {isRegisterMode ? (
              <>
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm"
                  onClick={() => setIsRegisterMode(false)}
                >
                  Sign in here
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm"
                  onClick={() => setIsRegisterMode(true)}
                >
                  Register here
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
