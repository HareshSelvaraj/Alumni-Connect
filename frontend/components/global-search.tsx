"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mongoDBService } from "@/lib/mongodb-service";

interface SearchResult {
  id: string;
  name: string;
  email: string;
  department: string;
  company?: string;
  position?: string;
  graduationYear: number;
  skills: string[];
  location: string;
  avatar: string;
  type: 'student' | 'alumni';
}

interface SearchFilters {
  departments: string[];
  companies: string[];
  graduationYears: number[];
  skills: string[];
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    departments: [],
    companies: [],
    graduationYears: [],
    skills: []
  });
  const [activeFilters, setActiveFilters] = useState({
    department: "all",
    company: "all",
    graduationYear: "all",
    skills: "all"
  });
  const [error, setError] = useState<string>("");

  // Load search filters on component mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        console.log('Loading search filters...');
        const filters = await mongoDBService.getSearchFilters();
        console.log('Filters loaded:', filters);
        setSearchFilters(filters);
        setError("");
      } catch (error) {
        console.error('Error loading filters:', error);
        
        // Handle specific error types for filter loading
        if (error.message.includes('timeout')) {
          console.log('Filter loading timed out, using fallback data');
        } else if (error.message.includes('Network error')) {
          console.log('Network error loading filters, using fallback data');
        } else {
          console.log('Unknown error loading filters, using fallback data');
        }
        
        // Don't set error state for filter loading failures - just use fallback
        // Use fallback data
        setSearchFilters({
          departments: ['Computer Science', 'Data Science', 'Engineering'],
          companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Netflix'],
          graduationYears: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'Swift', 'Machine Learning']
        });
      }
    };

    loadFilters();
  }, []);

  // Search function
  const performSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      console.log('Performing search with query:', query, 'filters:', activeFilters);
      
      // Search both students and alumni
      const [students, alumni] = await Promise.all([
        mongoDBService.searchStudents(query, activeFilters),
        mongoDBService.searchAlumni(query, activeFilters)
      ]);

      console.log('Search results - students:', students, 'alumni:', alumni);

      // Transform results to match SearchResult interface
      const transformedStudents: SearchResult[] = students.map((student: any) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
        graduationYear: student.graduationYear,
        skills: student.skills || [],
        location: student.location,
        avatar: student.avatar || '/placeholder-user.jpg',
        type: 'student' as const
      }));

      const transformedAlumni: SearchResult[] = alumni.map((alumni: any) => ({
        id: alumni.id,
        name: alumni.name,
        email: alumni.email,
        department: alumni.department,
        company: alumni.company,
        position: alumni.position,
        graduationYear: alumni.graduationYear,
        skills: alumni.skills || [],
        location: alumni.location,
        avatar: alumni.avatar || '/placeholder-user.jpg',
        type: 'alumni' as const
      }));

      const allResults = [...transformedStudents, ...transformedAlumni];
      console.log('Final search results:', allResults);
      setSearchResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      
      // Handle specific error types
      if (error.message.includes('timeout')) {
        setError("Search request timed out. Please check your connection and try again.");
      } else if (error.message.includes('Network error')) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Failed to perform search. Please try again.");
      }
      
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search on query change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, activeFilters]);

  const clearFilters = () => {
    setActiveFilters({
      department: "all",
      company: "all",
      graduationYear: "all",
      skills: "all"
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== "all");

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search students and alumni..."
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
              value={activeFilters.company}
              onValueChange={(value) => setActiveFilters(prev => ({ ...prev, company: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {searchFilters.companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
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
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </h3>
          <div className="grid gap-4">
            {searchResults.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={result.avatar}
                    alt={result.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{result.name}</h4>
                      <Badge variant={result.type === 'alumni' ? 'default' : 'secondary'}>
                        {result.type === 'alumni' ? 'Alumni' : 'Student'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{result.email}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Department:</span> {result.department}
                      </p>
                      {result.company && (
                        <p className="text-sm">
                          <span className="font-medium">Company:</span> {result.company}
                        </p>
                      )}
                      {result.position && (
                        <p className="text-sm">
                          <span className="font-medium">Position:</span> {result.position}
                        </p>
                      )}
                      <p className="text-sm">
                        <span className="font-medium">Graduation Year:</span> {result.graduationYear}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {result.location}
                      </p>
                    </div>
                    {result.skills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && query && searchResults.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No results found for "{query}"</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
