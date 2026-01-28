"use client"

import { DataService, studentsData, alumniData } from "@/lib/data-service"

export default function TestDataPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Data Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Students Data</h2>
          <p className="text-lg">Total Students: <span className="font-bold text-blue-600">{studentsData.length}</span></p>
          <p className="text-sm text-gray-600">Expected: 15 students</p>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">First 5 Students:</h3>
            <ul className="text-sm space-y-1">
              {studentsData.slice(0, 5).map(student => (
                <li key={student.id}>• {student.name} ({student.department})</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Alumni Data</h2>
          <p className="text-lg">Total Alumni: <span className="font-bold text-green-600">{alumniData.length}</span></p>
          <p className="text-sm text-gray-600">Expected: 15 alumni</p>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">First 5 Alumni:</h3>
            <ul className="text-sm space-y-1">
              {alumniData.slice(0, 5).map(alumni => (
                <li key={alumni.id}>• {alumni.name} at {alumni.company}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-bold">{DataService.getPlatformStats().totalStudents}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Alumni</p>
            <p className="text-2xl font-bold">{DataService.getPlatformStats().totalAlumni}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Connections</p>
            <p className="text-2xl font-bold">{DataService.getPlatformStats().totalConnections}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Referrals</p>
            <p className="text-2xl font-bold">{DataService.getPlatformStats().totalReferrals}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 