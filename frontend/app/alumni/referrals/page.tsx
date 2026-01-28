"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DataService, ReferralRequest, alumniData } from "@/lib/data-service"
import { useUser } from "@/contexts/user-context"

import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  FileText,
  MessageSquare,
  User,
  Mail,
  Building,
  Calendar,
  Star,
} from "lucide-react"

export default function AlumniReferrals() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<ReferralRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>([])
  const [isClient, setIsClient] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Debug: Monitor referralRequests state changes
  useEffect(() => {
    if (referralRequests.length > 0) {
      console.log("Referrals: State updated - Total:", referralRequests.length, "Pending:", referralRequests.filter(r => r.status === "pending").length)
    }
  }, [referralRequests])

  useEffect(() => {
    if (!isClient) return

    const loadReferralRequests = () => {
      // Use consistent alumni ID "1" for Sarah Johnson
      const alumniId = "1"
      const requests = DataService.getReferralRequests(alumniId)
      console.log("Referrals: Loaded", requests.length, "referrals")
      setReferralRequests(requests)
    }

    // Initialize data only once on mount
    if (!isInitialized) {
      DataService.initializeTestReferrals()
      setIsInitialized(true)
    }
    loadReferralRequests()

    const handleStorageChange = (e: StorageEvent) => {
      const alumniId = "1"
      if (e.key === `referralRequests_${alumniId}`) {
        console.log("Referrals: Storage changed, reloading")
        setTimeout(() => loadReferralRequests(), 100) // Small delay to ensure data is written
      }
    }

    const handleReferralUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      const alumniId = "1"
      if (customEvent.detail?.alumniId === alumniId) {
        console.log("Referrals: Custom event received, reloading")
        setTimeout(() => loadReferralRequests(), 100) // Small delay to ensure data is written
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("referralUpdated", handleReferralUpdate)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("referralUpdated", handleReferralUpdate)
    }
  }, [user, isClient])

  const handleApprove = (requestId: string) => {
    console.log("Referrals: Approve clicked for request:", requestId)
    const alumniId = "1"
    DataService.updateReferralRequestStatus(requestId, alumniId, "approved")

    setReferralRequests(prev => {
      const updated = prev.map(request => {
        if (String(request.id) === String(requestId)) {
          console.log("Referrals: Updating request", request.id, "to approved")
          return { ...request, status: "approved" as const }
        }
        return request
      })
      return updated
    })

    // Force re-render
    setForceUpdate(prev => prev + 1)

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("referralUpdated", {
          detail: { alumniId, action: "approved", requestId },
        })
      )
    }, 50) // Small delay to ensure localStorage is updated first
  }

  const handleDecline = (requestId: string) => {
    console.log("Referrals: Decline clicked for request:", requestId)
    const alumniId = "1"
    DataService.updateReferralRequestStatus(requestId, alumniId, "rejected")

    setReferralRequests(prev =>
      prev.map(request => {
        if (String(request.id) === String(requestId)) {
          console.log("Referrals: Updating request", request.id, "to rejected")
          return { ...request, status: "rejected" as const }
        }
        return request
      })
    )

    // Force re-render
    setForceUpdate(prev => prev + 1)

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("referralUpdated", {
          detail: { alumniId, action: "rejected", requestId },
        })
      )
    }, 50) // Small delay to ensure localStorage is updated first
  }

  const openRequestDetails = (request: ReferralRequest) => {
    setSelectedRequest(request)
    setIsDetailDialogOpen(true)
  }

  const filteredRequests = referralRequests.filter(request => {
    const query = searchQuery.toLowerCase()
    return (
      request.studentName.toLowerCase().includes(query) ||
      request.requestedPosition.toLowerCase().includes(query) ||
      request.requestedCompany.toLowerCase().includes(query)
    )
  })

  const pendingRequests = filteredRequests.filter(r => r.status === "pending")
  const approvedRequests = filteredRequests.filter(r => r.status === "approved")
  const rejectedRequests = filteredRequests.filter(r => r.status === "rejected")

  // Debug: Monitor filtered requests changes
  useEffect(() => {
    if (referralRequests.length > 0) {
      console.log("Referrals: Filtered requests - Pending:", pendingRequests.length, "Approved:", approvedRequests.length, "Rejected:", rejectedRequests.length)
    }
  }, [pendingRequests, approvedRequests, rejectedRequests])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Referral Requests</h1>
          <p className="text-gray-600">Review and manage referral requests from students</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="text-sm bg-secondary text-secondary-foreground">
            {pendingRequests.length} Pending
          </Badge>
          <Badge className="text-sm border border-input">
            {approvedRequests.length + rejectedRequests.length} Processed
          </Badge>
        </div>
      </div>

      <Card className="border-0 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by student name, position, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="hover-lift bg-transparent border border-input">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-6" key={`referrals-${forceUpdate}-${referralRequests.length}-${JSON.stringify(referralRequests.map(r => r.status))}`}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Declined ({rejectedRequests.length})</TabsTrigger>
        </TabsList>

        {/* PENDING */}
        <TabsContent value="pending" className="space-y-6">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="hover-lift hover-glow border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 avatar-glow">
                    <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                    <AvatarFallback>
                      {request.studentName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{request.studentName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>{request.studentDepartment}</span>
                          <span>•</span>
                          <span>{request.studentYearOfStudy}</span>
                          <span>•</span>
                          <span>ATS: {request.studentAtsScore}%</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className="text-green-600 border-green-200 border">
                            ATS Score: {request.studentAtsScore}%
                          </Badge>
                          <Badge className="bg-secondary text-secondary-foreground">
                            {request.requestedPosition} @ {request.requestedCompany}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">{new Date(request.createdAt).toLocaleDateString()}</div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Message:</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{request.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button
                          className="hover-lift bg-transparent text-gray-700 border border-input hover:bg-gray-50"
                          onClick={() => openRequestDetails(request)}
                        >
                          <FileText className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                        <Button className="hover-lift bg-transparent text-gray-700 border border-input hover:bg-gray-50">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Message
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleApprove(request.id)} 
                          className="hover-lift btn-glow"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleDecline(request.id)}
                          className="hover-lift bg-transparent text-red-600 border-red-200 hover:bg-red-50 border"
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* APPROVED */}
        <TabsContent value="approved" className="space-y-6">
          {approvedRequests.map((request) => (
            <Card key={request.id} className="hover-lift hover-glow-green border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 avatar-glow-green">
                    <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      {request.studentName
                          .split(" ")
                        .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                        <h3 className="font-semibold text-lg mb-1">{request.studentName}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                          {request.requestedPosition} @ {request.requestedCompany}
                          </p>
                        <p className="text-sm text-green-600 font-medium">Successfully referred - Interview scheduled</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        <div className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* REJECTED */}
        <TabsContent value="rejected" className="space-y-6">
          {rejectedRequests.map((request) => (
              <Card key={request.id} className="hover-lift hover-glow border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 avatar-glow">
                    <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                      <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      {request.studentName
                          .split(" ")
                        .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                        <h3 className="font-semibold text-lg mb-1">{request.studentName}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                          {request.requestedPosition} @ {request.requestedCompany}
                          </p>
                        <p className="text-sm text-red-600">Position requirements didn't match profile</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-red-100 text-red-800 mb-2">
                            <XCircle className="h-3 w-3 mr-1" />
                            Declined
                          </Badge>
                        <div className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {/* Request Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-xl font-bold">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Referral Request Details</span>
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Complete information about {selectedRequest.studentName}'s referral request
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Student Info */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 avatar-glow">
                    <AvatarImage
                      src={selectedRequest.studentAvatar || "/placeholder.svg"}
                      alt={selectedRequest.studentName}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {selectedRequest.studentName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{selectedRequest.studentName}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700">{selectedRequest.studentEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Building className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{selectedRequest.studentDepartment}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700">{selectedRequest.studentYearOfStudy}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-gray-700">ATS: {selectedRequest.studentAtsScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Position Details */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Position Applied For</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg text-blue-900">{selectedRequest.requestedPosition}</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">{selectedRequest.requestedCompany}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-blue-700">
                      <span className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>ATS Score: {selectedRequest.studentAtsScore}%</span>
                      </span>
                      <span>•</span>
                      <span>Applied {new Date(selectedRequest.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedRequest.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button
                    onClick={() => setIsDetailDialogOpen(false)}
                    className="hover-lift bg-transparent border border-input"
                  >
                    Close
                  </Button>
                  <Button
                    className="hover-lift bg-transparent text-red-600 border-red-200 hover:bg-red-50 border"
                    onClick={() => {
                      handleDecline(selectedRequest.id)
                      setIsDetailDialogOpen(false)
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                  <Button
                    className="hover-lift btn-glow bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      handleApprove(selectedRequest.id)
                      setIsDetailDialogOpen(false)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Referral
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
