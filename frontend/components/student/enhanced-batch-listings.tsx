"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  Star,
  Users,
  Loader2,
} from "lucide-react"

interface AlumniMember {
  id: string
  name: string
  photo?: string
  company: string
  position: string
  location: string
  rating: number
  studentsMentored: number
  successfulReferrals: number
  skills: string[]
  linkedinUrl?: string
  isVerified: boolean
}

interface BatchData {
  year: string
  alumni: AlumniMember[]
  totalCount: number
}

export function EnhancedBatchListings() {
  const [batches, setBatches] = useState<BatchData[]>([])
  const [filteredBatches, setFilteredBatches] = useState<BatchData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedBatch, setSelectedBatch] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const loadBatches = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockBatches: BatchData[] = [
        {
          year: "2025",
          totalCount: 45,
          alumni: [
            {
              id: "1",
              name: "Alex Thompson",
              photo: "/placeholder-user.jpg",
              company: "Google",
              position: "Software Engineer",
              location: "Mountain View, CA",
              rating: 4.8,
              studentsMentored: 15,
              successfulReferrals: 8,
              skills: ["JavaScript", "React", "Node.js"],
              linkedinUrl: "https://linkedin.com/in/alexthompson",
              isVerified: true
            },
            {
              id: "2",
              name: "Maria Garcia",
              photo: "/placeholder-user.jpg",
              company: "Microsoft",
              position: "Product Manager",
              location: "Seattle, WA",
              rating: 4.7,
              studentsMentored: 12,
              successfulReferrals: 6,
              skills: ["Product Management", "Strategy", "Analytics"],
              linkedinUrl: "https://linkedin.com/in/mariagarcia",
              isVerified: true
            }
          ]
        },
        {
          year: "2024",
          totalCount: 52,
          alumni: [
            {
              id: "3",
              name: "David Kim",
              photo: "/placeholder-user.jpg",
              company: "Netflix",
              position: "Data Scientist",
              location: "Los Gatos, CA",
              rating: 4.9,
              studentsMentored: 20,
              successfulReferrals: 12,
              skills: ["Python", "Machine Learning", "Data Analysis"],
              linkedinUrl: "https://linkedin.com/in/davidkim",
              isVerified: true
            },
            {
              id: "4",
              name: "Sarah Chen",
              photo: "/placeholder-user.jpg",
              company: "Apple",
              position: "iOS Developer",
              location: "Cupertino, CA",
              rating: 4.6,
              studentsMentored: 18,
              successfulReferrals: 10,
              skills: ["Swift", "iOS", "Mobile Development"],
              linkedinUrl: "https://linkedin.com/in/sarahchen",
              isVerified: true
            }
          ]
        },
        {
          year: "2023",
          totalCount: 38,
          alumni: [
            {
              id: "5",
              name: "James Wilson",
              photo: "/placeholder-user.jpg",
              company: "Amazon",
              position: "Backend Engineer",
              location: "Seattle, WA",
              rating: 4.5,
              studentsMentored: 14,
              successfulReferrals: 7,
              skills: ["Java", "Spring Boot", "AWS"],
              linkedinUrl: "https://linkedin.com/in/jameswilson",
              isVerified: true
            }
          ]
        },
        {
          year: "2022",
          totalCount: 41,
          alumni: [
            {
              id: "6",
              name: "Emily Rodriguez",
              photo: "/placeholder-user.jpg",
              company: "Meta",
              position: "Frontend Engineer",
              location: "Menlo Park, CA",
              rating: 4.8,
              studentsMentored: 16,
              successfulReferrals: 9,
              skills: ["React", "TypeScript", "GraphQL"],
              linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
              isVerified: true
            }
          ]
        },
        {
          year: "2021",
          totalCount: 35,
          alumni: [
            {
              id: "7",
              name: "Michael Brown",
              photo: "/placeholder-user.jpg",
              company: "Tesla",
              position: "Software Engineer",
              location: "Austin, TX",
              rating: 4.7,
              studentsMentored: 13,
              successfulReferrals: 8,
              skills: ["Python", "C++", "Embedded Systems"],
              linkedinUrl: "https://linkedin.com/in/michaelbrown",
              isVerified: true
            }
          ]
        }
      ]
      
      setBatches(mockBatches)
      setFilteredBatches(mockBatches)
      setIsLoading(false)
    }
    
    loadBatches()
  }, [])

  // Filter batches based on search and filters
  useEffect(() => {
    let filtered = batches

    // Filter by batch year
    if (selectedBatch !== "all") {
      filtered = filtered.filter(batch => batch.year === selectedBatch)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.map(batch => ({
        ...batch,
        alumni: batch.alumni.filter(alumni =>
          alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      })).filter(batch => batch.alumni.length > 0)
    }

    setFilteredBatches(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [batches, searchQuery, selectedBatch])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBatches = filteredBatches.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading alumni batches...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Alumni Batches</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{batches.reduce((total, batch) => total + batch.totalCount, 0)} total alumni</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alumni by name, company, position, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedBatch} onValueChange={setSelectedBatch}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            {batches.map(batch => (
              <SelectItem key={batch.year} value={batch.year}>
                Batch {batch.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Batch Listings */}
      <div className="space-y-6">
        {currentBatches.length > 0 ? (
          currentBatches.map((batch) => (
            <Card key={batch.year}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold">Batch {batch.year}</h3>
                    <Badge variant="secondary">
                      {batch.alumni.length} alumni shown
                    </Badge>
                    <Badge variant="outline">
                      {batch.totalCount} total
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {batch.alumni.map((alumni) => (
                    <div key={alumni.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={alumni.photo} />
                          <AvatarFallback className="text-sm">
                            {getInitials(alumni.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold truncate">{alumni.name}</h4>
                            {alumni.isVerified && (
                              <Badge variant="default" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {alumni.position}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {alumni.company}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alumni.location}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-xs font-medium">{alumni.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 text-blue-500 mr-1" />
                                <span className="text-xs">{alumni.studentsMentored}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {alumni.successfulReferrals} referrals
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {alumni.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {alumni.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{alumni.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {batch.alumni.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No alumni found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No alumni batches found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredBatches.length)} of {filteredBatches.length} batches
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
