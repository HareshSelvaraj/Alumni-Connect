"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, User, GraduationCap, MapPin, Calendar, BookOpen, MessageSquare } from "lucide-react"
import { mongoDBService } from "@/lib/mongodb-service"

interface StudentResult {
  id: string
  name: string
  email: string
  department: string
  graduationYear: number
  skills: string[]
  location: string
  avatar: string
  gpa?: number
  interests?: string[]
  linkedinUrl?: string
  githubUrl?: string
}

interface StudentFilters {
  departments: string[]
  graduationYears: number[]
  skills: string[]
  locations: string[]
}

export function StudentSearch() {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StudentResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchFilters, setSearchFilters] = useState<StudentFilters>({
    departments: [],
    graduationYears: [],
    skills: [],
    locations: []
  })
  const [activeFilters, setActiveFilters] = useState({
    department: "all",
    graduationYear: "all",
    skills: "all",
    location: "all"
  })
  const [error, setError] = useState<string>("")

  // Load search filters on component mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        console.log('Loading student search filters...')
        const filters = await mongoDBService.getSearchFilters()
        console.log('Student filters loaded:', filters)
        setSearchFilters({
          departments: filters.departments || [],
          graduationYears: filters.graduationYears || [],
          skills: filters.skills || [],
          locations: ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA', 'Chicago, IL']
        })
        setError("")
      } catch (error) {
        console.error('Error loading student filters:', error)
        setError("Failed to load search filters")
        // Use fallback data
        setSearchFilters({
          departments: ['Computer Science', 'Data Science', 'Engineering', 'Business', 'Arts'],
          graduationYears: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'Swift', 'Machine Learning'],
          locations: ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA', 'Chicago, IL']
        })
      }
    }

    loadFilters()
  }, [])

  // Search function
  const performSearch = async () => {
    if (!query.trim()) {
      setSearchResults([])
      setError("")
      return
    }

    setIsLoading(true)
    setError("")
    
    try {
      console.log('Performing student search with query:', query, 'filters:', activeFilters)
      
      // Search for students only
      const students = await mongoDBService.searchStudents(query, activeFilters)

      console.log('Student search results:', students)

      // Transform results to match StudentResult interface
      const transformedStudents: StudentResult[] = students.map((student: any) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
        graduationYear: student.graduationYear,
        skills: student.skills || [],
        location: student.location,
        avatar: student.avatar || '/placeholder-user.jpg',
        gpa: student.gpa,
        interests: student.interests,
        linkedinUrl: student.linkedinUrl,
        githubUrl: student.githubUrl
      }))

      console.log('Final student search results:', transformedStudents)
      setSearchResults(transformedStudents)
    } catch (error) {
      console.error('Student search error:', error)
      setError("Failed to perform search. Please try again.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Perform search when query or filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, activeFilters])

  const clearFilters = () => {
    setActiveFilters({
      department: "all",
      graduationYear: "all",
      skills: "all",
      location: "all"
    })
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== "all")

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for students to mentor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 h-12"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={activeFilters.department}
              onValueChange={(value) => setActiveFilters(prev => ({ ...prev, department: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {searchFilters.departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={activeFilters.graduationYear}
              onValueChange={(value) => setActiveFilters(prev => ({ ...prev, graduationYear: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {searchFilters.graduationYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={activeFilters.skills}
              onValueChange={(value) => setActiveFilters(prev => ({ ...prev, skills: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {searchFilters.skills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={activeFilters.location}
              onValueChange={(value) => setActiveFilters(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {searchFilters.locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                <X className="h-3 w-3 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (value && value !== "all") {
              return (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key}: {value}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setActiveFilters(prev => ({ ...prev, [key]: "all" }))}
                  />
                </Badge>
              )
            }
            return null
          })}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching students...</p>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Found {searchResults.length} student{searchResults.length !== 1 ? 's' : ''}
          </h3>
          <div className="grid gap-4">
            {searchResults.map((student) => (
              <div
                key={student.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{student.name}</h4>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Student
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{student.email}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Department:</span> {student.department}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Graduation Year:</span> {student.graduationYear}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {student.location}
                      </p>
                      {student.gpa && (
                        <p className="text-sm">
                          <span className="font-medium">GPA:</span> {student.gpa}
                        </p>
                      )}
                    </div>
                    {student.skills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {student.interests && student.interests.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.interests.map((interest) => (
                            <Badge key={interest} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <User className="h-3 w-3 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && query.trim() && searchResults.length === 0 && (
        <div className="text-center py-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No students found matching your search criteria.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
} 