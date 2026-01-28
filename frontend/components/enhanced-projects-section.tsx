"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  Star,
  Users,
  Loader2,
  Calendar,
  Clock,
  ExternalLink,
  Code,
  Target,
  TrendingUp,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  creator: {
    name: string
    photo?: string
    company: string
    position: string
  }
  status: 'open' | 'in-progress' | 'completed' | 'closed'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  participants: number
  maxParticipants: number
  deadline?: Date
  createdAt: Date
  tags: string[]
  requirements: string[]
  benefits: string[]
  isVerified: boolean
}

export function EnhancedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 6

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockProjects: Project[] = [
        {
          id: "1",
          title: "AI-Powered Resume Analyzer",
          description: "Build a machine learning system that analyzes resumes and provides ATS optimization suggestions. Help students improve their job application success rates.",
          technologies: ["Python", "TensorFlow", "NLP", "React", "Node.js"],
          creator: {
            name: "Sarah Johnson",
            photo: "/placeholder-user.jpg",
            company: "Google",
            position: "Senior Software Engineer"
          },
          status: "open",
          difficulty: "advanced",
          category: "AI/ML",
          participants: 3,
          maxParticipants: 5,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          tags: ["AI", "Resume", "Career", "NLP"],
          requirements: ["Python experience", "Machine Learning knowledge", "Web development skills"],
          benefits: ["Real-world AI project", "Portfolio piece", "Mentorship from Google engineer"],
          isVerified: true
        },
        {
          id: "2",
          title: "Campus Event Management System",
          description: "Create a comprehensive platform for managing campus events, including registration, notifications, and feedback collection.",
          technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
          creator: {
            name: "Michael Chen",
            photo: "/placeholder-user.jpg",
            company: "Microsoft",
            position: "Product Manager"
          },
          status: "in-progress",
          difficulty: "intermediate",
          category: "Web Development",
          participants: 4,
          maxParticipants: 6,
          deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          tags: ["Events", "Management", "Campus", "Full-stack"],
          requirements: ["React/TypeScript", "Database design", "UI/UX skills"],
          benefits: ["Full-stack development", "Product management insights", "Campus impact"],
          isVerified: true
        },
        {
          id: "3",
          title: "Alumni Network Mobile App",
          description: "Develop a mobile application to connect current students with alumni for mentorship and career guidance.",
          technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
          creator: {
            name: "David Kim",
            photo: "/placeholder-user.jpg",
            company: "Netflix",
            position: "Mobile Developer"
          },
          status: "open",
          difficulty: "intermediate",
          category: "Mobile Development",
          participants: 2,
          maxParticipants: 4,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          tags: ["Mobile", "Networking", "Mentorship", "Real-time"],
          requirements: ["React Native", "Backend development", "Real-time communication"],
          benefits: ["Mobile development", "Networking features", "Real-world impact"],
          isVerified: true
        },
        {
          id: "4",
          title: "Data Visualization Dashboard",
          description: "Create interactive dashboards for visualizing student performance, alumni success metrics, and platform analytics.",
          technologies: ["D3.js", "Python", "Flask", "PostgreSQL"],
          creator: {
            name: "Emily Rodriguez",
            photo: "/placeholder-user.jpg",
            company: "Meta",
            position: "Data Engineer"
          },
          status: "open",
          difficulty: "beginner",
          category: "Data Science",
          participants: 5,
          maxParticipants: 8,
          deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          tags: ["Data", "Visualization", "Analytics", "Dashboard"],
          requirements: ["Basic Python", "Data analysis", "Frontend development"],
          benefits: ["Data visualization skills", "Analytics experience", "Portfolio project"],
          isVerified: true
        },
        {
          id: "5",
          title: "Blockchain Certificate System",
          description: "Implement a blockchain-based system for issuing and verifying academic certificates and achievements.",
          technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
          creator: {
            name: "James Wilson",
            photo: "/placeholder-user.jpg",
            company: "Amazon",
            position: "Blockchain Engineer"
          },
          status: "completed",
          difficulty: "advanced",
          category: "Blockchain",
          participants: 3,
          maxParticipants: 4,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          tags: ["Blockchain", "Certificates", "Verification", "Smart Contracts"],
          requirements: ["Blockchain knowledge", "Smart contracts", "Web3 development"],
          benefits: ["Blockchain expertise", "Innovation project", "Industry recognition"],
          isVerified: true
        },
        {
          id: "6",
          title: "Sustainable Campus Initiative",
          description: "Develop a platform to track and promote sustainable practices across campus, including carbon footprint monitoring.",
          technologies: ["Vue.js", "Node.js", "IoT", "Machine Learning"],
          creator: {
            name: "Lisa Wang",
            photo: "/placeholder-user.jpg",
            company: "Apple",
            position: "Environmental Engineer"
          },
          status: "open",
          difficulty: "intermediate",
          category: "Sustainability",
          participants: 6,
          maxParticipants: 10,
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          tags: ["Sustainability", "IoT", "Environment", "Campus"],
          requirements: ["Web development", "IoT basics", "Environmental awareness"],
          benefits: ["Environmental impact", "IoT experience", "Community service"],
          isVerified: true
        }
      ]
      
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
      setIsLoading(false)
    }
    
    loadProjects()
  }, [])

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(project => project.status === selectedStatus)
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [projects, searchQuery, selectedStatus, selectedDifficulty, selectedCategory])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-purple-100 text-purple-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  const categories = Array.from(new Set(projects.map(p => p.category)))

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading projects...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Code className="h-4 w-4" />
          <span>{projects.length} total projects</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, description, technologies, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getDifficultyColor(project.difficulty)}>
                      {project.difficulty}
                    </Badge>
                    {project.isVerified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>

              {/* Creator Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={project.creator.photo} />
                  <AvatarFallback className="text-xs">
                    {getInitials(project.creator.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.creator.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {project.creator.position} @ {project.creator.company}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{project.participants}/{project.maxParticipants}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                </div>
                {project.deadline && (
                  <div className="flex items-center text-orange-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(project.deadline)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  {project.status === 'open' ? 'Apply' : 'View Details'}
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {currentProjects.length === 0 && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-muted-foreground">
              <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No projects found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

