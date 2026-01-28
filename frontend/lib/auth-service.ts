// Authentication Service - Unified login system for students and alumni
import { Student, Alumni } from "@/lib/data-service";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  userType: 'student' | 'alumni';
  // Student specific fields
  yearOfStudy?: string;
  department?: string;
  // Alumni specific fields
  companyName?: string;
  batchStart?: number;
  batchEnd?: number;
}

export interface AuthResponse {
  success: boolean;
  user?: Student | Alumni;
  token?: string;
  message?: string;
}

// API endpoints for different backend features
const AUTH_ENDPOINTS = {
  student: 'http://localhost:3002/api/auth',
  alumni: 'http://localhost:3002/api/auth', // Using the main search-api server
  unified: 'http://localhost:3002/api/auth' // Using the main search-api server
};

class AuthService {
  private token: string | null = null;
  private user: Student | Alumni | null = null;
  private userType: 'student' | 'alumni' | null = null;

  constructor() {
    this.loadFromStorage();
  }

  // Load authentication data from localStorage
  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('auth_user');
      this.userType = localStorage.getItem('auth_user_type') as 'student' | 'alumni' | null;
      
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.clearStorage();
        }
      }
    }
  }

  // Save authentication data to localStorage
  private saveToStorage(token: string, user: Student | Alumni, userType: 'student' | 'alumni') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_user_type', userType);
    }
  }

  // Clear authentication data from localStorage
  private clearStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_user_type');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.token && this.user && this.userType);
  }

  // Get current user
  getCurrentUser(): Student | Alumni | null {
    return this.user;
  }

  // Get current user type
  getCurrentUserType(): 'student' | 'alumni' | null {
    return this.userType;
  }

  // Get auth token
  getToken(): string | null {
    return this.token;
  }

  // Student registration
  async registerStudent(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_ENDPOINTS.student}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          yearOfStudy: credentials.yearOfStudy,
          department: credentials.department,
          userType: 'student'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Create a student object from the response
        const student: Student = {
          id: data.id || data._id,
          name: credentials.name,
          email: credentials.email,
          department: credentials.department || '',
          yearOfStudy: credentials.yearOfStudy || '',
          gpa: 0,
          atsScore: 0,
          points: 0,
          connections: 0,
          isVerified: false
        };

        return {
          success: true,
          user: student,
          message: 'Student registered successfully'
        };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Student registration error:', error);
      return {
        success: false,
        message: 'Network error during registration'
      };
    }
  }

  // Alumni registration
  async registerAlumni(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_ENDPOINTS.alumni}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          companyName: credentials.companyName,
          batchStart: credentials.batchStart,
          batchEnd: credentials.batchEnd,
          userType: 'alumni'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Create an alumni object from the response
        const alumni: Alumni = {
          id: data.id || data._id,
          name: credentials.name,
          email: credentials.email,
          department: 'Computer Science', // Default, can be updated later
          graduationYear: credentials.batchEnd || new Date().getFullYear(),
          currentCompany: credentials.companyName || '',
          position: '',
          location: '',
          packageLPA: 0,
          linkedinURL: '',
          skillsNotes: '',
          isVerified: false,
          rating: 0,
          studentsMentored: 0,
          successfulReferrals: 0,
          pendingRequests: 0
        };

        return {
          success: true,
          user: alumni,
          message: 'Alumni registered successfully'
        };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Alumni registration error:', error);
      return {
        success: false,
        message: 'Network error during registration'
      };
    }
  }

  // Student login
  async loginStudent(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_ENDPOINTS.student}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credentials,
          userType: 'student'
        }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Fetch student profile
        const profileResponse = await fetch(`${AUTH_ENDPOINTS.student}/profile`, {
          headers: {
            'Authorization': `Bearer ${data.accessToken}`,
          },
        });

        let student: Student;
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          student = {
            id: profileData.id || profileData._id,
            name: profileData.name || credentials.email.split('@')[0],
            email: credentials.email,
            department: profileData.department || 'Computer Science',
            yearOfStudy: profileData.yearOfStudy || 'Final Year',
            gpa: profileData.gpa || 0,
            atsScore: profileData.atsScore || 0,
            points: profileData.points || 0,
            connections: profileData.connections || 0,
            isVerified: profileData.isVerified || false
          };
        } else {
          // Fallback student object
          student = {
            id: data.id || 'temp-id',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            department: 'Computer Science',
            yearOfStudy: 'Final Year',
            gpa: 0,
            atsScore: 0,
            points: 0,
            connections: 0,
            isVerified: false
          };
        }

        this.token = data.accessToken;
        this.user = student;
        this.userType = 'student';
        this.saveToStorage(data.accessToken, student, 'student');

        return {
          success: true,
          user: student,
          token: data.accessToken,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Student login error:', error);
      return {
        success: false,
        message: 'Network error during login'
      };
    }
  }

  // Alumni login
  async loginAlumni(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_ENDPOINTS.alumni}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credentials,
          userType: 'alumni'
        }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Create alumni object from response or fetch profile
        const alumni: Alumni = {
          id: data.id || data._id || 'temp-id',
          name: data.name || credentials.email.split('@')[0],
          email: credentials.email,
          department: 'Computer Science',
          graduationYear: data.graduationYear || new Date().getFullYear(),
          currentCompany: data.company || '',
          position: data.position || '',
          location: data.location || '',
          packageLPA: data.packageLPA || 0,
          linkedinURL: data.linkedinURL || '',
          skillsNotes: data.skillsNotes || '',
          isVerified: data.isVerified || false,
          rating: data.rating || 0,
          studentsMentored: data.studentsMentored || 0,
          successfulReferrals: data.successfulReferrals || 0,
          pendingRequests: data.pendingRequests || 0
        };

        this.token = data.accessToken;
        this.user = alumni;
        this.userType = 'alumni';
        this.saveToStorage(data.accessToken, alumni, 'alumni');

        return {
          success: true,
          user: alumni,
          token: data.accessToken,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Alumni login error:', error);
      return {
        success: false,
        message: 'Network error during login'
      };
    }
  }

  // Unified login (tries both student and alumni endpoints)
  async login(credentials: LoginCredentials, userType: 'student' | 'alumni'): Promise<AuthResponse> {
    if (userType === 'student') {
      return this.loginStudent(credentials);
    } else {
      return this.loginAlumni(credentials);
    }
  }

  // Unified registration
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    if (credentials.userType === 'student') {
      return this.registerStudent(credentials);
    } else {
      return this.registerAlumni(credentials);
    }
  }

  // Logout
  logout() {
    this.token = null;
    this.user = null;
    this.userType = null;
    this.clearStorage();
  }

  // Refresh token (if needed)
  async refreshToken(): Promise<boolean> {
    if (!this.token) return false;

    try {
      const response = await fetch(`${AUTH_ENDPOINTS.unified}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.accessToken;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', data.accessToken);
        }
        return true;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    // If refresh fails, logout user
    this.logout();
    return false;
  }

  // Get headers for authenticated requests
  getAuthHeaders(): Record<string, string> {
    if (this.token) {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  }
}

// Create and export a singleton instance
export const authService = new AuthService();
