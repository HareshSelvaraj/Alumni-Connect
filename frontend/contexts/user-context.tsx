"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Student, Alumni } from "@/lib/data-service"
import { authService, LoginCredentials, RegisterCredentials, AuthResponse } from "@/lib/auth-service"

interface UserContextType {
  user: Student | Alumni | null
  userType: "student" | "alumni" | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: Student | Alumni, type: "student" | "alumni") => void
  loginWithCredentials: (credentials: LoginCredentials, userType: "student" | "alumni") => Promise<AuthResponse>
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | Alumni | null>(null)
  const [userType, setUserType] = useState<"student" | "alumni" | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = () => {
      setIsLoading(true)
      
      // Check if user is authenticated using auth service
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser()
        const currentUserType = authService.getCurrentUserType()
        
        if (currentUser && currentUserType) {
          setUser(currentUser)
          setUserType(currentUserType)
          setIsAuthenticated(true)
        } else {
          // Clear invalid session
          authService.logout()
        }
      }
      
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = (userData: Student | Alumni, type: "student" | "alumni") => {
    setUser(userData)
    setUserType(type)
    setIsAuthenticated(true)
    
    // Save to localStorage (legacy support)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("userType", type)
  }

  const loginWithCredentials = async (credentials: LoginCredentials, userType: "student" | "alumni"): Promise<AuthResponse> => {
    setIsLoading(true)
    
    try {
      const response = await authService.login(credentials, userType)
      
      if (response.success && response.user) {
        setUser(response.user)
        setUserType(userType)
        setIsAuthenticated(true)
      }
      
      return response
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "An unexpected error occurred during login"
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setIsLoading(true)
    
    try {
      const response = await authService.register(credentials)
      
      if (response.success && response.user) {
        setUser(response.user)
        setUserType(credentials.userType)
        setIsAuthenticated(true)
      }
      
      return response
    } catch (error) {
      console.error("Registration error:", error)
      return {
        success: false,
        message: "An unexpected error occurred during registration"
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    setIsAuthenticated(false)
    
    // Clear auth service
    authService.logout()
    
    // Clear localStorage (legacy support)
    localStorage.removeItem("user")
    localStorage.removeItem("userType")
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      userType, 
      isAuthenticated, 
      isLoading,
      login, 
      loginWithCredentials,
      register,
      logout 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 