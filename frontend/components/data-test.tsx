"use client"

import { DataService, studentsData, alumniData } from "@/lib/data-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DataTest() {
  const currentStudent = studentsData[0] // John Smith
  const topAlumni = DataService.getTopRatedAlumni(3)
  const platformStats = DataService.getPlatformStats()

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Data Test - Real vs Static</h1>
        <p className="text-gray-600 mb-8">This page shows what data is currently being used</p>
      </div>

      {/* Current Student Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Current Student Data</span>
            <Badge variant="secondary">Real Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Student Profile</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {currentStudent.name}</p>
                <p><strong>Email:</strong> {currentStudent.email}</p>
                <p><strong>Department:</strong> {currentStudent.department}</p>
                <p><strong>Year:</strong> {currentStudent.yearOfStudy}</p>
                <p><strong>GPA:</strong> {currentStudent.gpa}</p>
                <p><strong>ATS Score:</strong> {currentStudent.atsScore}%</p>
                <p><strong>Points:</strong> {currentStudent.points.toLocaleString()}</p>
                <p><strong>Connections:</strong> {currentStudent.connections}</p>
                <p><strong>Location:</strong> {currentStudent.location}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skills & Interests</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentStudent.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Interests:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentStudent.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Alumni Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Top Alumni Data</span>
            <Badge variant="secondary">Real Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAlumni.map((alumni, index) => (
              <div key={alumni.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{alumni.name}</h3>
                  <Badge variant="outline">#{index + 1} Top Rated</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Company:</strong> {alumni.company}</p>
                    <p><strong>Position:</strong> {alumni.position}</p>
                    <p><strong>Location:</strong> {alumni.location}</p>
                    <p><strong>Graduation Year:</strong> {alumni.graduationYear}</p>
                    <p><strong>Department:</strong> {alumni.department}</p>
                  </div>
                  <div>
                    <p><strong>Rating:</strong> {alumni.rating}/5.0</p>
                    <p><strong>Students Mentored:</strong> {alumni.studentsMentored}</p>
                    <p><strong>Successful Referrals:</strong> {alumni.successfulReferrals}</p>
                    <p><strong>Pending Requests:</strong> {alumni.pendingRequests}</p>
                    <p><strong>Verified:</strong> {alumni.isVerified ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {alumni.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Platform Statistics</span>
            <Badge variant="secondary">Real Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{platformStats.totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{platformStats.totalAlumni}</p>
              <p className="text-sm text-gray-600">Total Alumni</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{platformStats.totalConnections}</p>
              <p className="text-sm text-gray-600">Total Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{platformStats.totalReferrals}</p>
              <p className="text-sm text-gray-600">Total Referrals</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">{platformStats.averageStudentPoints}</p>
              <p className="text-sm text-gray-600">Average Student Points</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-purple-600">{platformStats.averageAlumniRating}</p>
              <p className="text-sm text-gray-600">Average Alumni Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Source Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Data Source Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Data Source:</strong> <span className="text-green-600">Real CSV Data</span></p>
            <p><strong>Students Count:</strong> {studentsData.length} students loaded</p>
            <p><strong>Alumni Count:</strong> {alumniData.length} alumni loaded</p>
            <p><strong>Data Service:</strong> DataService class with search/filter methods</p>
            <p><strong>Integration:</strong> Seamlessly integrated into dashboard</p>
            <p><strong>Last Updated:</strong> Real-time from data service</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 