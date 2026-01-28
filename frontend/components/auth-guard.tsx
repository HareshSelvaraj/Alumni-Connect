"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredUserType?: "student" | "alumni"
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requiredUserType, 
  redirectTo = "/" 
}: AuthGuardProps) {
  const { isAuthenticated, userType, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to home page
        router.push(redirectTo)
        return
      }

      if (requiredUserType && userType !== requiredUserType) {
        // User is authenticated but wrong type, redirect to appropriate dashboard
        const correctDashboard = userType === "student" ? "/student/dashboard" : "/alumni/dashboard"
        router.push(correctDashboard)
        return
      }
    }
  }, [isAuthenticated, userType, isLoading, requiredUserType, redirectTo, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Don't render children if not authenticated or wrong user type
  if (!isAuthenticated || (requiredUserType && userType !== requiredUserType)) {
    return null
  }

  return <>{children}</>
}

// Higher-order component for protecting pages
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredUserType?: "student" | "alumni"
) {
  return function AuthGuardedComponent(props: P) {
    return (
      <AuthGuard requiredUserType={requiredUserType}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}
