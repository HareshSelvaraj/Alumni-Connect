"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AlumniBatchSelector from "@/components/alumni/batch-selector"
import { DashboardNotificationPopup } from "@/components/notification-popup"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ProfileModal } from "@/components/profile-modal"
import { CommunitySection } from "@/components/alumni/community-section"
import { EnhancedProjectsSection } from "@/components/enhanced-projects-section"
import { MessageSquare, Users, Calendar, Inbox, Star, ArrowRight, Clock, CheckCircle, UserPlus, X } from "lucide-react"
import { alumniData, DataService, ReferralRequest, Alumni } from "@/lib/data-service"
import { useUser } from "@/contexts/user-context"

export default function AlumniDashboard() {
  const [batchOpen, setBatchOpen] = useState(false)
  useEffect(() => {
    const has = sessionStorage.getItem("alumni_batch_set")
    if (!has) setBatchOpen(true)
  }, [])
  function saveBatch(b: { startYear: number; endYear: number }) {
    localStorage.setItem("alumni_batch", JSON.stringify(b))
    sessionStorage.setItem("alumni_batch_set", "1")
    setBatchOpen(false)
  }
  const { user } = useUser()
  const [currentAlumni, setCurrentAlumni] = useState<Alumni>({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@google.com",
    phone: "+1 (555) 987-6543",
    alumniId: "AL2020001",
    graduationYear: "2020",
    department: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    rating: 4.9,
    studentsMentored: 28,
    successfulReferrals: 12,
    totalReferrals: 18,
    pendingRequests: 5,
    referralPoints: 450,
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    interests: ["Web Development", "AI", "Cloud Computing"],
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    githubUrl: "https://github.com/sarahjohnson",
    profilePhoto: "",
    batchStart: 2016,
    batchEnd: 2020,
    isVerified: true,
    createdAt: "2020-06-15",
    lastActive: "2024-12-10"
  })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load alumni data and referral requests on client side only to avoid hydration issues
  useEffect(() => {
    if (alumniData.length > 0) {
      const alumni = user || alumniData[0]
      setCurrentAlumni(alumni)
      
      console.log("Dashboard: Using alumni ID:", alumni.id, "Name:", alumni.name)
      
      const loadReferralRequests = () => {
        // Use consistent alumni ID "1" for Sarah Johnson
        const alumniId = "1"
        const requests = DataService.getReferralRequests(alumniId)
        console.log("Dashboard: Loaded", requests.length, "referrals for alumni", alumniId)
        
        setReferralRequests(requests)
        setPendingCount(DataService.getPendingReferralCount(alumniId))
        setApprovedCount(DataService.getApprovedReferralCount(alumniId))
      }
      
      // Initialize data only once on mount
      if (!isInitialized) {
        DataService.initializeTestReferrals()
        setIsInitialized(true)
      }
      loadReferralRequests()
      
      loadReferralRequests()
      
      // Listen for storage changes to sync across tabs
      const handleStorageChange = (e) => {
        const alumniId = "1"
        console.log("Dashboard: Storage event received:", e.key, "for alumni:", alumniId)
        if (e.key === `referralRequests_${alumniId}`) {
          console.log("Dashboard: Storage changed, reloading referrals")
          setTimeout(() => loadReferralRequests(), 100) // Small delay to ensure data is written
        }
      }
      
      // Listen for custom events from referrals page
      const handleReferralUpdate = (e) => {
        const alumniId = "1"
        console.log("Dashboard: Custom event received:", e.detail, "for alumni:", alumniId)
        if (e.detail.alumniId === alumniId) {
          console.log("Dashboard: Custom event matched, reloading referrals")
          setTimeout(() => loadReferralRequests(), 100) // Small delay to ensure data is written
        }
      }
      
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('referralUpdated', handleReferralUpdate)
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('referralUpdated', handleReferralUpdate)
      }
    }
  }, [user])

  const handleApproveReferral = (requestId: string) => {
    console.log("Dashboard: Approve button clicked for request:", requestId)
    
    const alumniId = "1"
    console.log("Dashboard: Approving referral:", requestId, "for alumni:", alumniId)
    
    // Update localStorage immediately
    DataService.updateReferralRequestStatus(requestId, alumniId, "approved")
    
    // Update state immediately for real-time response
    setReferralRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => 
        String(request.id) === String(requestId)
          ? { ...request, status: "approved" as const }
          : request
      )
      console.log("Dashboard: Immediately updated requests:", updatedRequests.length)
      return updatedRequests
    })
    
    // Update counts immediately
    setPendingCount(prev => prev - 1)
    setApprovedCount(prev => prev + 1)
    
    // Dispatch custom event to sync with referrals page
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('referralUpdated', {
        detail: { alumniId, action: 'approved', requestId }
      }))
    }, 50) // Small delay to ensure localStorage is updated first
  }

  const handleRejectReferral = (requestId: string) => {
    const alumniId = "1"
    console.log("Dashboard: Rejecting referral:", requestId, "for alumni:", alumniId)
    
    // Update localStorage immediately
    DataService.updateReferralRequestStatus(requestId, alumniId, "rejected")
    
    // Update state immediately for real-time response
    setReferralRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => 
        String(request.id) === String(requestId)
          ? { ...request, status: "rejected" as const }
          : request
      )
      console.log("Dashboard: Immediately updated requests:", updatedRequests.length)
      return updatedRequests
    })
    
    // Update counts immediately
    setPendingCount(prev => prev - 1)
    
    // Dispatch custom event to sync with referrals page
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('referralUpdated', {
        detail: { alumniId, action: 'rejected', requestId }
      }))
    }, 50) // Small delay to ensure localStorage is updated first
  }

  const pendingRequests = referralRequests.filter(request => request.status === "pending")
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardNotificationPopup
        enabled
        notifications={[
          { id: "a1", type: "events", title: "Alumni Meetup", description: "This Friday 6pm campus auditorium" },
          { id: "a2", type: "projects", title: "New student submission", description: "Data Dashboard by Alex Thompson" },
        ]}
        sessionKey="alumni_dashboard_popup"
      />
      <AlumniBatchSelector open={batchOpen} onClose={()=>setBatchOpen(false)} onSave={saveBatch} />
      {/* Navigation Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back, {currentAlumni.name.split(' ')[0]}! 👋</h1>
            <p className="text-gray-600">Here's your mentorship and networking activity overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Badge variant="secondary" className="text-sm">
                {currentAlumni.position} @ {currentAlumni.company}
              </Badge>
            </div>
            <NotificationsDropdown userType="alumni" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentAlumni.profilePhoto} />
                <AvatarFallback className="text-sm">
                  {currentAlumni.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{currentAlumni.name}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover-lift hover-glow-purple border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mentorship Rating</p>
              <p className="text-2xl font-bold text-purple-600">{currentAlumni.rating}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Mentored</p>
              <p className="text-2xl font-bold text-blue-600">{currentAlumni.studentsMentored}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow-green border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Referrals</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{approvedCount > 0 ? `${approvedCount} approved` : "No approved referrals"}</p>
          </CardContent>
        </Card>

        <Card className="hover-lift hover-glow-orange border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Inbox className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{pendingCount > 0 ? `${pendingCount} pending` : "No pending requests"}</p>
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
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Alex Johnson got hired at Google!</p>
                    <p className="text-sm text-gray-500">1 hour ago • Your referral was successful</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Answered question in "System Design" discussion</p>
                    <p className="text-sm text-gray-500">3 hours ago • 15 upvotes received</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New mentorship request from {alumniData[7]?.name || 'Maria Garcia'}</p>
                    <p className="text-sm text-gray-500">1 day ago • Data Science student</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg hover-lift">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Scheduled career guidance session</p>
                    <p className="text-sm text-gray-500">2 days ago • With {alumniData[5]?.name || 'James Wilson'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Referral Requests */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Inbox className="h-5 w-5" />
                  <span>Pending Referral Requests</span>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg hover-lift hover-glow">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 avatar-glow">
                          <AvatarImage src={request.studentAvatar} alt={request.studentName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {request.studentName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{request.studentName}</h4>
                        <Badge variant="outline" className="text-green-600">
                              ATS: {request.studentAtsScore}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                            {request.studentDepartment} • {request.studentYearOfStudy} • Looking for {request.requestedPosition} role at {request.requestedCompany}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                            "{request.message.substring(0, 100)}..."
                      </p>
                      <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="hover-lift btn-glow"
                              onClick={() => {
                                console.log("Dashboard: Button clicked for request:", request.id)
                                handleApproveReferral(request.id)
                              }}
                            >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="hover-lift bg-transparent"
                              onClick={() => handleRejectReferral(request.id)}
                            >
                              <X className="mr-1 h-3 w-3" />
                              Reject
                            </Button>
                        <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-sm text-gray-500">
                      All referral requests have been processed.
                    </p>
                  </div>
                )}
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
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <Inbox className="mr-2 h-4 w-4" />
                Review Referrals
              </Button>
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Discussion
              </Button>
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Event
              </Button>
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Find Students
              </Button>
            </CardContent>
          </Card>

          {/* Recent Connections */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Recent Connections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover-lift cursor-pointer">
                  <Avatar className="h-10 w-10 avatar-glow">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Alex Johnson" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      AJ
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Alex Johnson</p>
                    <p className="text-xs text-gray-500">CS • Got hired at Google</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Success
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 hover-lift cursor-pointer">
                  <Avatar className="h-10 w-10 avatar-glow-green">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=SC" alt="Sophie Chen" />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Sophie Chen</p>
                    <p className="text-xs text-gray-500">Design • Active mentee</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 hover-lift cursor-pointer">
                  <Avatar className="h-10 w-10 avatar-glow-purple">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=RD" alt="Robert Davis" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      RD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Robert Davis</p>
                    <p className="text-xs text-gray-500">Mech Eng • New connection</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    New
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Your Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Career Guidance Session</h4>
                  <p className="text-xs text-gray-600">1-on-1 with Maria Garcia</p>
                  <p className="text-xs text-blue-600 mt-1">Today, 3:00 PM</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Alumni Panel Discussion</h4>
                  <p className="text-xs text-gray-600">Tech industry insights</p>
                  <p className="text-xs text-purple-600 mt-1">Tomorrow, 6:00 PM</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg hover-lift">
                  <h4 className="font-medium text-sm">Networking Mixer</h4>
                  <p className="text-xs text-gray-600">CS Department event</p>
                  <p className="text-xs text-green-600 mt-1">Dec 18, 7:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Section */}
      <div className="mt-8">
        <CommunitySection />
      </div>

      {/* Enhanced Projects Section */}
      <div className="mt-8">
        <EnhancedProjectsSection />
      </div>
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userType="alumni"
        profile={currentAlumni}
        onProfileUpdate={setCurrentAlumni}
      />
    </div>
  )
}
