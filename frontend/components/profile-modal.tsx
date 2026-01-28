"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Award,
  Download,
  ExternalLink,
  Edit,
  Save,
  X,
  QrCode,
  Star,
  Users,
  FileText,
  Linkedin,
  Github,
  Globe,
} from "lucide-react"
import { ProfilePhotoUpload } from "./profile-photo-upload"
import { ResumeUpload } from "./student/resume-upload"

interface StudentProfile {
  id: string
  name: string
  email: string
  phone?: string
  studentId: string
  department: string
  yearOfStudy: string
  currentSemester: string
  gpa: number
  atsScore: number
  points: number
  connections: number
  location: string
  linkedinUrl?: string
  githubUrl?: string
  personalWebsite?: string
  resumeUrl?: string
  resumeFileName?: string
  resumeUploadDate?: string
  skills: string[]
  interests: string[]
  profilePhoto?: string
}

interface AlumniProfile {
  id: string
  name: string
  email: string
  phone?: string
  alumniId: string
  graduationYear: string
  department: string
  company: string
  position: string
  location: string
  linkedinUrl?: string
  referralPoints: number
  totalReferrals: number
  successfulReferrals: number
  profilePhoto?: string
  batchStart: number
  batchEnd: number
}

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userType: 'student' | 'alumni'
  profile: StudentProfile | AlumniProfile
  onProfileUpdate: (updatedProfile: any) => void
}

export function ProfileModal({ 
  isOpen, 
  onClose, 
  userType, 
  profile, 
  onProfileUpdate 
}: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    onProfileUpdate(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handlePhotoChange = (photoUrl: string) => {
    setEditedProfile(prev => ({ ...prev, profilePhoto: photoUrl }))
  }

  const generateQRCode = () => {
    // In a real app, this would generate a QR code
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg=="
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Profile Information</span>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="contact">Contact & Links</TabsTrigger>
            {userType === 'student' ? (
              <TabsTrigger value="academic">Academic & Resume</TabsTrigger>
            ) : (
              <TabsTrigger value="professional">Professional & ID</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProfilePhotoUpload
                  currentPhoto={editedProfile.profilePhoto}
                  userName={editedProfile.name}
                  onPhotoChange={handlePhotoChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm font-medium">{editedProfile.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm font-medium">{editedProfile.email}</p>
                    )}
                  </div>

                  {userType === 'student' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <p className="text-sm font-medium">#{editedProfile.studentId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <p className="text-sm font-medium">{editedProfile.department}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearOfStudy">Year of Study</Label>
                        <p className="text-sm font-medium">{editedProfile.yearOfStudy}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentSemester">Current Semester</Label>
                        <p className="text-sm font-medium">{editedProfile.currentSemester}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="alumniId">Alumni ID</Label>
                        <p className="text-sm font-medium">#{editedProfile.alumniId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <p className="text-sm font-medium">{editedProfile.graduationYear}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <p className="text-sm font-medium">{editedProfile.department}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch</Label>
                        <p className="text-sm font-medium">
                          {editedProfile.batchStart} - {editedProfile.batchEnd}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information & Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone || ""}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm font-medium">{editedProfile.phone || "Not provided"}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm font-medium">{editedProfile.location}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Social Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      {isEditing ? (
                        <Input
                          id="linkedin"
                          value={editedProfile.linkedinUrl || ""}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                          placeholder="https://linkedin.com/in/username"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          {editedProfile.linkedinUrl ? (
                            <a
                              href={editedProfile.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center"
                            >
                              <Linkedin className="h-4 w-4 mr-1" />
                              View Profile
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not provided</p>
                          )}
                        </div>
                      )}
                    </div>

                    {userType === 'student' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          {isEditing ? (
                            <Input
                              id="github"
                              value={editedProfile.githubUrl || ""}
                              onChange={(e) => setEditedProfile(prev => ({ ...prev, githubUrl: e.target.value }))}
                              placeholder="https://github.com/username"
                            />
                          ) : (
                            <div className="flex items-center space-x-2">
                              {editedProfile.githubUrl ? (
                                <a
                                  href={editedProfile.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline flex items-center"
                                >
                                  <Github className="h-4 w-4 mr-1" />
                                  View Profile
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              ) : (
                                <p className="text-sm text-muted-foreground">Not provided</p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Personal Website</Label>
                          {isEditing ? (
                            <Input
                              id="website"
                              value={editedProfile.personalWebsite || ""}
                              onChange={(e) => setEditedProfile(prev => ({ ...prev, personalWebsite: e.target.value }))}
                              placeholder="https://yourwebsite.com"
                            />
                          ) : (
                            <div className="flex items-center space-x-2">
                              {editedProfile.personalWebsite ? (
                                <a
                                  href={editedProfile.personalWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline flex items-center"
                                >
                                  <Globe className="h-4 w-4 mr-1" />
                                  Visit Website
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              ) : (
                                <p className="text-sm text-muted-foreground">Not provided</p>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userType === 'student' ? (
            <TabsContent value="academic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>GPA</Label>
                      <p className="text-sm font-medium">{editedProfile.gpa}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>ATS Score</Label>
                      <p className="text-sm font-medium">{editedProfile.atsScore}%</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Points</Label>
                      <p className="text-sm font-medium">{editedProfile.points}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ResumeUpload
                currentResume={editedProfile.resumeUrl ? {
                  fileName: editedProfile.resumeFileName || "Resume.pdf",
                  uploadDate: editedProfile.resumeUploadDate || new Date().toLocaleDateString(),
                  atsScore: editedProfile.atsScore || 0,
                  url: editedProfile.resumeUrl
                } : undefined}
                onResumeUpdate={(resume) => {
                  setEditedProfile(prev => ({
                    ...prev,
                    resumeUrl: resume.url,
                    resumeFileName: resume.fileName,
                    resumeUploadDate: resume.uploadDate,
                    atsScore: resume.atsScore
                  }))
                }}
              />
            </TabsContent>
          ) : (
            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Current Company</Label>
                      <p className="text-sm font-medium">{editedProfile.company}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <p className="text-sm font-medium">{editedProfile.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Referral Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{editedProfile.successfulReferrals}</p>
                      <p className="text-sm text-muted-foreground">Successful Referrals</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{editedProfile.totalReferrals}</p>
                      <p className="text-sm text-muted-foreground">Total Referrals</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{editedProfile.referralPoints}</p>
                      <p className="text-sm text-muted-foreground">Referral Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Alumni ID Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-sm mx-auto">
                    <div className="border-2 border-primary rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={editedProfile.profilePhoto} />
                            <AvatarFallback className="text-lg">
                              {getInitials(editedProfile.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{editedProfile.name}</h3>
                          <p className="text-sm text-muted-foreground">Alumni ID: #{editedProfile.alumniId}</p>
                          <p className="text-sm text-muted-foreground">
                            Batch: {editedProfile.batchStart} - {editedProfile.batchEnd}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <img 
                            src={generateQRCode()} 
                            alt="QR Code" 
                            className="h-16 w-16 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
