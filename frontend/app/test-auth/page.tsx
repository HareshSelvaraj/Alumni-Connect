"use client"

import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, Mail, Building, GraduationCap } from "lucide-react"

export default function TestAuthPage() {
  const { user, userType, isAuthenticated, logout, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Not Authenticated</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">You need to be logged in to view this page.</p>
            <Button onClick={() => window.location.href = "/"}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Authentication Test Page
                </CardTitle>
                <Button variant="outline" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Type Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">User Type:</span>
                <Badge variant={userType === "student" ? "default" : "secondary"}>
                  {userType === "student" ? "Student" : "Alumni"}
                </Badge>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User Information</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-gray-600">{user?.name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">{user?.email || "N/A"}</p>
                    </div>
                  </div>

                  {userType === "student" && (
                    <>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Department</p>
                          <p className="text-sm text-gray-600">{(user as any)?.department || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Year of Study</p>
                          <p className="text-sm text-gray-600">{(user as any)?.yearOfStudy || "N/A"}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {userType === "alumni" && (
                    <>
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Company</p>
                          <p className="text-sm text-gray-600">{(user as any)?.currentCompany || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Graduation Year</p>
                          <p className="text-sm text-gray-600">{(user as any)?.graduationYear || "N/A"}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Authentication Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Authentication Status</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Authenticated:</p>
                    <Badge variant={isAuthenticated ? "default" : "destructive"}>
                      {isAuthenticated ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">User ID:</p>
                    <p className="text-gray-600">{user?.id || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = "/"}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = userType === "student" ? "/student/dashboard" : "/alumni/dashboard"}
                  >
                    Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
