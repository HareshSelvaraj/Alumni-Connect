"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  MapPin, 
  Building, 
  Star, 
  Users, 
  CheckCircle, 
  ExternalLink,
  Linkedin,
  Github,
  MessageSquare,
  X
} from "lucide-react"
import { alumniSearchAPI, mockData } from "@/lib/api-service"
import { DataService, alumniData } from "@/lib/data-service"

interface AlumniSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AlumniSearchModal({ isOpen, onClose }: AlumniSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const companies = DataService.getCompanies()
  const years = DataService.getGraduationYears().map(year => year.toString())

  const handleSearch = async () => {
    setIsSearching(true)
    
    try {
      // Use local data service for immediate results
      let results = alumniData
      
      // Apply filters
      if (searchQuery) {
        results = DataService.searchAlumni(searchQuery)
      }
      
      if (selectedCompany) {
        results = DataService.getAlumniByCompany(selectedCompany)
      }
      
      if (selectedYear) {
        results = DataService.getAlumniByGraduationYear(parseInt(selectedYear))
      }
      
      // If multiple filters, find intersection
      if (searchQuery && selectedCompany) {
        const searchResults = DataService.searchAlumni(searchQuery)
        const companyResults = DataService.getAlumniByCompany(selectedCompany)
        results = searchResults.filter(alumni => 
          companyResults.some(companyAlumni => companyAlumni.id === alumni.id)
        )
      }
      
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults(alumniData)
    } finally {
      setIsSearching(false)
    }
  }

  // Load all alumni when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchResults(alumniData)
    }
  }, [isOpen])

  const handleConnect = (alumniId: string) => {
    const alumni = alumniData.find(a => a.id === alumniId)
    if (alumni) {
      alert(`Connection request sent to ${alumni.name} at ${alumni.company}`)
      // In a real app, this would make an API call to backend Feature 2
    }
  }

  const handleMessage = (alumniId: string) => {
    const alumni = alumniData.find(a => a.id === alumniId)
    if (alumni) {
      alert(`Opening chat with ${alumni.name}`)
      // In a real app, this would open chat interface (Feature 4)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Find Alumni</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, company, position, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Graduation year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={handleSearch} disabled={isSearching} className="w-full md:w-auto">
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Alumni
                </>
              )}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Found {searchResults.length} alumni
                </h3>
                <Badge variant="secondary">
                  {searchResults.length} results
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((alumni) => (
                  <div key={alumni.id} className="border rounded-lg p-4 hover-lift hover-glow">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${alumni.name.split(' ').map(n => n[0]).join('')}`} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{alumni.name}</h4>
                            <p className="text-xs text-gray-600">{alumni.position}</p>
                          </div>
                          {alumni.isVerified && (
                            <Badge variant="outline" className="text-green-600 text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                                                 <div className="flex items-center space-x-2 mb-2">
                           <Building className="h-3 w-3 text-gray-400" />
                           <span className="text-xs text-gray-600">{alumni.company}</span>
                         </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{alumni.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-medium">4.8</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-gray-600">28 mentored</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleConnect(alumni.id)}
                            className="flex-1"
                          >
                            <Users className="mr-1 h-3 w-3" />
                            Connect
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMessage(alumni.id)}
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <a href={alumni.linkedinURL} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-3 w-3" />
                            </a>
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
          {searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No alumni found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 