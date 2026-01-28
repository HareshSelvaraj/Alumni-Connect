 "use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Trophy,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Star,
  ArrowRight,
  Target,
  Clock,
  Search,
  MapPin,
  Building,
} from "lucide-react"
import { DataService, studentsData, alumniData, Student } from "@/lib/data-service"
import AlumniSearchModal from "@/components/alumni-search-modal"
import { DashboardNotificationPopup } from "@/components/notification-popup"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ProfileModal } from "@/components/profile-modal"
import { EnhancedBatchListings } from "@/components/student/enhanced-batch-listings"
import { EnhancedProjectsSection } from "@/components/enhanced-projects-section"

export default function StudentDashboard() {
  const [topAlumni, setTopAlumni] = useState(DataService.getTopRatedAlumni(3))
  const [isLoadingAlumni, setIsLoadingAlumni] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student>({
    id: "0",
    name: "Haresh Selvaraj",
    email: "haresh.selvaraj@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "CS2024001",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    currentSemester: "Fall 2024",
    gpa: 3.8,
    atsScore: 85,
    points: 1250,
    connections: 24,
    resumeUrl: "https://resume.com/haresh-selvaraj",
    resumeFileName: "Haresh_Selvaraj_Resume.pdf",
    resumeUploadDate: "2024-11-15",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    interests: ["Web Development", "AI", "Cloud Computing"],
    location: "New York, NY",
    linkedinUrl: "https://linkedin.com/in/hareshselvaraj",
    githubUrl: "https://github.com/hareshselvaraj",
    personalWebsite: "https://hareshselvaraj.dev",
    profilePhoto: "",
    createdAt: "2024-01-15",
    lastActive: "2024-12-10",
    isVerified: true
  })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Load data on client side only to avoid hydration issues
  useEffect(() => {
    // Load current student data
    if (studentsData.length > 0) {
      setCurrentStudent(studentsData[4])
    }

    // Load top alumni data
    const loadTopAlumni = async () => {
      setIsLoadingAlumni(true)
      try {
        const topAlumniData = DataService.getTopRatedAlumni(3)
        setTopAlumni(topAlumniData)
      } catch (error) {
        console.log('Using local alumni data')
        setTopAlumni(DataService.getTopRatedAlumni(3))
      } finally {
        setIsLoadingAlumni(false)
      }
    }

    loadTopAlumni()
  }, [])

  const handleFindAlumni = () => {
    setIsSearchModalOpen(true)
  }

  // Get platform statistics for dynamic data
  const platformStats = DataService.getPlatformStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardNotificationPopup
        enabled
        notifications={[
          { id: "n1", type: "events", title: "Webinar: Cracking System Design", description: "Tomorrow 6pm with Google SDEs", meta: "Add to Calendar" },
          { id: "n2", type: "jobs", title: "NVIDIA hiring update", description: "New Graduate roles open in AI Platforms", meta: "Deadline: Sep 30" },
          { id: "n3", type: "referrals", title: "Referral update", description: "Michael Chen accepted your referral request", meta: "Check status" },
          { id: "n4", type: "projects", title: "New project posted", description: "Build internal metrics dashboard (Medium)", meta: "Microsoft" },
          { id: "n5", type: "achievements", title: "Badge earned", description: "1000 Points — Rising Star", meta: "View profile" },
        ]}
      />
      {/* Navigation Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back, {currentStudent.name}! 👋</h1>
            <p className="text-gray-600">Here's what's happening with your career journey today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Badge variant="secondary" className="text-sm">
                {currentStudent.department} • {currentStudent.yearOfStudy}
              </Badge>
            </div>
            <NotificationsDropdown userType="student" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentStudent.profilePhoto} />
                <AvatarFallback className="text-sm">
                  {currentStudent.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{currentStudent.name}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover-lift hover-glow border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ATS Score</p>
                <p className="text-2xl font-bold text-green-600">{currentStudent.atsScore}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={currentStudent.atsScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leaderboard Rank</p>
                <p className="text-2xl font-bold text-blue-600">#{DataService.getTopStudents().findIndex(s => s.id === currentStudent.id) + 1 || 1}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">↑ 3 positions this week</p>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alumni Connections</p>
                <p className="text-2xl font-bold text-purple-600">{topAlumni.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{topAlumni.length > 0 ? `${topAlumni.length} available` : 'No connections yet'}</p>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discussion Points</p>
                <p className="text-2xl font-bold text-orange-600">{currentStudent.points.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+150 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Participated in "AI in Healthcare" discussion</p>
                    <p className="text-sm text-gray-500">2 hours ago • +50 points</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Resume ATS score improved to 85%</p>
                    <p className="text-sm text-gray-500">1 day ago • +5% improvement</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Connected with Sarah Johnson (Google)</p>
                    <p className="text-sm text-gray-500">2 days ago • New connection</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Moved up 3 positions in leaderboard</p>
                    <p className="text-sm text-gray-500">3 days ago • Rank #12</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Discussions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Discussions</span>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover-lift hover-glow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Remote Work Best Practices</h4>
                    <Badge variant="secondary">Hot 🔥</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Discussion about effective remote work strategies and tools...
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>142 replies • 1.2k views</span>
                    <span>2 hours ago</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover-lift hover-glow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Interview Preparation Tips</h4>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Alumni sharing their interview experiences and tips...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>89 replies • 856 views</span>
                    <span>5 hours ago</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover-lift hover-glow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Career Transition Stories</h4>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Alumni sharing their career change experiences...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>34 replies • 423 views</span>
                    <span>1 day ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start hover-lift btn-glow bg-transparent" 
                variant="outline"
                onClick={() => alert(`Your current ATS Score is ${currentStudent.atsScore}%`)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Check Resume ATS Score
              </Button>
              <Button 
                className="w-full justify-start hover-lift btn-glow bg-transparent" 
                variant="outline"
                onClick={() => alert('Opening group discussion forum...')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Discussion
              </Button>
              <Button 
                className="w-full justify-start hover-lift btn-glow bg-transparent" 
                variant="outline"
                onClick={handleFindAlumni}
              >
                <Users className="mr-2 h-4 w-4" />
                Find Alumni
              </Button>
              <Button 
                className="w-full justify-start hover-lift btn-glow bg-transparent" 
                variant="outline"
                onClick={() => alert(`You are ranked #${DataService.getTopStudents().findIndex(s => s.id === currentStudent.id) + 1 || 1} out of ${studentsData.length} students`)}
              >
                <Trophy className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </CardContent>
          </Card>

          {/* Top Alumni */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Top Rated Alumni</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAlumni ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                                     {topAlumni.map((alumni, index) => (
                     <div 
                       key={alumni.id} 
                       className="flex items-center space-x-3 hover-lift cursor-pointer"
                       onClick={() => alert(`${alumni.name} - ${alumni.position} at ${alumni.company}\nRating: ${alumni.rating}/5.0\nStudents Mentored: ${alumni.studentsMentored}`)}
                     >
                      <Avatar className={`h-10 w-10 ${index === 0 ? 'avatar-glow' : index === 1 ? 'avatar-glow-purple' : 'avatar-glow-green'}`}>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${alumni.name.split(' ').map(n => n[0]).join('')}`} alt={alumni.name} />
                        <AvatarFallback className={`bg-gradient-to-r ${
                          index === 0 ? 'from-blue-500 to-purple-500' : 
                          index === 1 ? 'from-purple-500 to-pink-500' : 
                          'from-green-500 to-blue-500'
                        } text-white`}>
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alumni.name}</p>
                        <p className="text-xs text-gray-500">{alumni.company} • {alumni.position}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{alumni.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">4.{9 - index}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Tech Career Fair</h4>
                  <p className="text-xs text-gray-600">Virtual networking event</p>
                  <p className="text-xs text-blue-600 mt-1">Tomorrow, 2:00 PM</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Resume Workshop</h4>
                  <p className="text-xs text-gray-600">ATS optimization tips</p>
                  <p className="text-xs text-green-600 mt-1">Dec 15, 4:00 PM</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Alumni Meetup</h4>
                  <p className="text-xs text-gray-600">CS Department gathering</p>
                  <p className="text-xs text-purple-600 mt-1">Dec 20, 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Batch Listings */}
      <div className="mt-8">
        <EnhancedBatchListings />
      </div>

      {/* Enhanced Projects Section */}
      <div className="mt-8">
        <EnhancedProjectsSection />
      </div>
      
      {/* Alumni Search Modal */}
      <AlumniSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userType="student"
        profile={currentStudent}
        onProfileUpdate={setCurrentStudent}
      />
    </div>
  )
}
