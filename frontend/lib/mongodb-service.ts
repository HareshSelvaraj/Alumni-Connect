// Import removed - not needed for MongoDB service

export interface SearchResult {
  id: string
  name: string
  role: string
  department?: string
  company?: string
  batch?: string
  location?: string
  skills?: string[]
  experience?: string
  atsScore?: number
  rating?: number
  avatar: string
  type: "student" | "alumni"
  email?: string
  phone?: string
  linkedin?: string
  achievements?: string[]
  studentsMentored?: number
  successfulReferrals?: number
  pendingRequests?: number
}

class MongoDBService {
  private baseUrl: string;

  constructor() {
    const envBaseUrl = process.env.NEXT_PUBLIC_SEARCH_API_URL;
    // Default to search-api backend on port 3002 if env is not set
    this.baseUrl = envBaseUrl && envBaseUrl.trim().length > 0
      ? envBaseUrl
      : 'http://localhost:3002/api';
    console.log('MongoDBService initialized with baseUrl:', this.baseUrl);
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}, retries: number = 2): Promise<any> {
    const fullUrl = `${this.baseUrl}${endpoint}`;
    console.log('Making request to:', fullUrl, `(attempt ${3 - retries}/3)`);
    
    let timeoutId: NodeJS.Timeout | null = null;
    
    try {
      const controller = new AbortController();
      timeoutId = setTimeout(() => {
        console.log('Request timeout, aborting...');
        controller.abort();
      }, 5000);

      const response = await fetch(fullUrl, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      // Clean up timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      console.error(`Error making request to ${fullUrl}:`, error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      // Handle AbortError specifically
      if (error.name === 'AbortError') {
        console.log('Request was aborted (likely due to timeout)');
        if (retries > 0) {
          console.log(`Retrying request... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
          return this.makeRequest(endpoint, options, retries - 1);
        }
        throw new Error('Request timeout - please check your connection and try again');
      }
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.log('Network error detected');
        if (retries > 0) {
          console.log(`Retrying request... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
          return this.makeRequest(endpoint, options, retries - 1);
        }
        throw new Error('Network error - please check your connection and try again');
      }
      
      // For other errors, don't retry
      throw error;
    }
  }

  async searchStudents(query: string = '', filters: any = {}): Promise<any[]> {
    console.log('Searching students with query:', query, 'filters:', filters);
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters.department && filters.department !== 'all') params.append('department', filters.department);
    if (filters.graduationYear && filters.graduationYear !== 'all') params.append('graduationYear', filters.graduationYear);
    if (filters.location && filters.location !== 'all') params.append('location', filters.location);

    return this.makeRequest(`/search/students?${params.toString()}`);
  }

  async searchAlumni(query: string = '', filters: any = {}): Promise<any[]> {
    console.log('Searching alumni with query:', query, 'filters:', filters);
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters.department && filters.department !== 'all') params.append('department', filters.department);
    if (filters.company && filters.company !== 'all') params.append('company', filters.company);
    if (filters.graduationYear && filters.graduationYear !== 'all') params.append('graduationYear', filters.graduationYear);
    if (filters.skills && filters.skills !== 'all') params.append('skills', filters.skills);

    return this.makeRequest(`/search/alumni?${params.toString()}`);
  }

  async getSearchFilters(): Promise<any> {
    console.log('Getting search filters...');
    try {
      const result = await this.makeRequest('/search/filters');
      console.log('Search filters result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching search filters:', error);
      // Return fallback data if server is not available
      const fallback = {
        departments: ['Computer Science', 'Data Science', 'Engineering'],
        companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Netflix'],
        graduationYears: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'Swift', 'Machine Learning']
      };
      console.log('Using fallback data:', fallback);
      return fallback;
    }
  }

  async getStudentById(id: string): Promise<any> {
    return this.makeRequest(`/students/${id}`);
  }

  async getAlumniById(id: string): Promise<any> {
    return this.makeRequest(`/alumni/${id}`);
  }
}

export const mongoDBService = new MongoDBService(); 