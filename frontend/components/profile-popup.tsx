"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  Building, 
  Calendar, 
  GraduationCap, 
  Star, 
  Briefcase, 
  Mail, 
  Phone,
  Linkedin,
  X,
  Award,
  Users
} from "lucide-react"

interface ProfileData {
  id: string
  name: string
  role: string
  department?: string
  company?: string
  batch?: string
  location?: string
  skills?: string[]
  experience?: string
  atsScore?: number
  rating?: number
  avatar: string
  type: "student" | "alumni"
  email?: string
  phone?: string
  linkedin?: string
  achievements?: string[]
  studentsMentored?: number
  successfulReferrals?: number
  pendingRequests?: number
}

interface ProfilePopupProps {
  isOpen: boolean
  onClose: () => void
  profile: ProfileData | null
}

export function ProfilePopup({ isOpen, onClose, profile }: ProfilePopupProps) {
  if (!profile) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {profile.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
              <p className="text-lg text-gray-600 mb-2">{profile.role}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {profile.department && (
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{profile.department}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Rating for Alumni */}
              {profile.type === "alumni" && profile.rating && (
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-gray-500">/ 5.0</span>
                </div>
              )}

              {/* ATS Score for Students */}
              {profile.type === "student" && profile.atsScore && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    ATS Score: {profile.atsScore}%
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          {(profile.email || profile.phone || profile.linkedin) && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {profile.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                  )}
                  {profile.linkedin && (
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profile.linkedin}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.experience && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Experience</span>
                  </h3>
                  <p className="text-sm text-gray-600">{profile.experience}</p>
                </CardContent>
              </Card>
            )}

            {profile.batch && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Education</span>
                  </h3>
                  <p className="text-sm text-gray-600">Batch {profile.batch}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Alumni-specific stats */}
          {profile.type === "alumni" && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Mentorship Stats</span>
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {profile.studentsMentored || 0}
                    </div>
                    <div className="text-xs text-gray-500">Students Mentored</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {profile.successfulReferrals || 0}
                    </div>
                    <div className="text-xs text-gray-500">Successful Referrals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {profile.pendingRequests || 0}
                    </div>
                    <div className="text-xs text-gray-500">Pending Requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          {profile.achievements && profile.achievements.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
                <ul className="space-y-2">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Award className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="btn-glow">
            {profile.type === "student" ? "Connect" : "Request Mentorship"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 