"use client"

import { DataService, studentsData, alumniData } from "@/lib/data-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DataComparison() {
  // Static data (what was used before)
  const staticData = {
    student: {
      name: "John Smith",
      department: "Computer Science",
      atsScore: 85,
      points: 1250,
      connections: 24
    },
    alumni: [
      { name: "Sarah Johnson", company: "Google", position: "Senior SWE", rating: 4.9 },
      { name: "Michael Chen", company: "Microsoft", position: "PM", rating: 4.8 },
      { name: "Emily Rodriguez", company: "Amazon", position: "Data Scientist", rating: 4.7 }
    ]
  }

  // Real data (what we're using now)
  const realData = {
    student: studentsData[0],
    alumni: DataService.getTopRatedAlumni(3),
    stats: DataService.getPlatformStats()
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Static vs Real Data Comparison</h1>
        <p className="text-gray-600 mb-8">See the difference between static and real data</p>
      </div>

      {/* Student Data Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Static Data (Before)</span>
              <Badge variant="outline">Hardcoded</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {staticData.student.name}</p>
              <p><strong>Department:</strong> {staticData.student.department}</p>
              <p><strong>ATS Score:</strong> {staticData.student.atsScore}%</p>
              <p><strong>Points:</strong> {staticData.student.points.toLocaleString()}</p>
              <p><strong>Connections:</strong> {staticData.student.connections}</p>
              <p className="text-gray-500 mt-4">❌ Limited data</p>
              <p className="text-gray-500">❌ No real profile</p>
              <p className="text-gray-500">❌ No skills/interests</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Real Data (Now)</span>
              <Badge variant="secondary">From CSV</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {realData.student.name}</p>
              <p><strong>Email:</strong> {realData.student.email}</p>
              <p><strong>Department:</strong> {realData.student.department}</p>
              <p><strong>Year:</strong> {realData.student.yearOfStudy}</p>
              <p><strong>ATS Score:</strong> {realData.student.atsScore}%</p>
              <p><strong>Points:</strong> {realData.student.points.toLocaleString()}</p>
              <p><strong>Connections:</strong> {realData.student.connections}</p>
              <p><strong>Location:</strong> {realData.student.location}</p>
              <p className="text-green-600 mt-4">✅ Complete profile</p>
              <p className="text-green-600">✅ Real skills & interests</p>
              <p className="text-green-600">✅ From your CSV data</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Data Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Static Alumni (Before)</span>
              <Badge variant="outline">Hardcoded</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticData.alumni.map((alumni, index) => (
                <div key={index} className="border rounded p-3">
                  <p><strong>{alumni.name}</strong></p>
                  <p className="text-sm">{alumni.company} • {alumni.position}</p>
                  <p className="text-sm">Rating: {alumni.rating}</p>
                </div>
              ))}
              <p className="text-gray-500 mt-4">❌ Only 3 alumni</p>
              <p className="text-gray-500">❌ Limited information</p>
              <p className="text-gray-500">❌ No real stats</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Real Alumni (Now)</span>
              <Badge variant="secondary">From CSV</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realData.alumni.map((alumni, index) => (
                <div key={alumni.id} className="border rounded p-3">
                  <p><strong>{alumni.name}</strong></p>
                  <p className="text-sm">{alumni.company} • {alumni.position}</p>
                  <p className="text-sm">{alumni.location} • {alumni.graduationYear}</p>
                  <p className="text-sm">Rating: {alumni.rating} • {alumni.studentsMentored} mentored</p>
                  <p className="text-sm">{alumni.successfulReferrals} referrals • {alumni.pendingRequests} pending</p>
                </div>
              ))}
              <p className="text-green-600 mt-4">✅ {alumniData.length} total alumni</p>
              <p className="text-green-600">✅ Complete profiles</p>
              <p className="text-green-600">✅ Real statistics</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Platform Statistics (Real Data)</span>
            <Badge variant="secondary">Calculated from CSV</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{realData.stats.totalStudents}</p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{realData.stats.totalAlumni}</p>
              <p className="text-sm text-gray-600">Alumni</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{realData.stats.totalConnections}</p>
              <p className="text-sm text-gray-600">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{realData.stats.totalReferrals}</p>
              <p className="text-sm text-gray-600">Referrals</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Average Student Points: <span className="font-semibold">{realData.stats.averageStudentPoints}</span> • 
              Average Alumni Rating: <span className="font-semibold">{realData.stats.averageAlumniRating}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Verification Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Verification Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm"><strong>✅ Real Data:</strong> All data comes from your CSV files</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm"><strong>✅ Dynamic:</strong> Data is loaded through DataService</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm"><strong>✅ Complete:</strong> Full profiles with skills, interests, stats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm"><strong>✅ Searchable:</strong> Advanced search and filter capabilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm"><strong>✅ Integrated:</strong> Seamlessly integrated into dashboard</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 