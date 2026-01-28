// API Service Layer - Connects to existing backend features

const API_BASE_URLS = {
  alumniSearch: 'http://localhost:5000/api/alumni',
  studentProfile: 'http://localhost:3000/api',
  trustVerification: 'http://localhost:4000/api',
  secureChat: 'http://localhost:6000/api',
  adminDashboard: 'http://localhost:7000/api'
}

// Feature 1: Alumni Directory Search API
export const alumniSearchAPI = {
  // Search alumni by company, graduation year, min package
  searchAlumni: async (params: { company?: string; graduationYear?: number; minPackage?: number }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params.company) queryParams.append('company', params.company)
      if (params.graduationYear) queryParams.append('graduationYear', params.graduationYear.toString())
      if (params.minPackage) queryParams.append('minPackage', params.minPackage.toString())

      const response = await fetch(`${API_BASE_URLS.alumniSearch}/search?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch alumni')
      return await response.json()
    } catch (error) {
      console.error('Alumni search error:', error)
      return []
    }
  }
}

// Feature 2: Student Profile & Referral System API
export const studentProfileAPI = {
  // Get student profile
  getStudentProfile: async (studentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URLS.studentProfile}/profile/${studentId}`, { credentials: 'include' })
      if (!response.ok) throw new Error('Failed to fetch student profile')
      return await response.json()
    } catch (error) {
      console.error('Student profile error:', error)
      return null
    }
  },

  // Create referral request
  createReferralRequest: async (data: { studentId: string; alumniId: string; message: string }) => {
    try {
      const response = await fetch(`${API_BASE_URLS.studentProfile}/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to create referral request')
      return await response.json()
    } catch (error) {
      console.error('Referral request error:', error)
      return null
    }
  },

  // Get referral requests for alumni
  getReferralRequests: async (alumniId: string) => {
    try {
      const response = await fetch(`${API_BASE_URLS.studentProfile}/referrals/alumni/${alumniId}`)
      if (!response.ok) throw new Error('Failed to fetch referral requests')
      return await response.json()
    } catch (error) {
      console.error('Referral requests error:', error)
      return []
    }
  }
}

// Feature 3: Trust Verification Layer API
export const trustVerificationAPI = {
  // Get verification status
  getVerificationStatus: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URLS.trustVerification}/verification/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch verification status')
      return await response.json()
    } catch (error) {
      console.error('Verification status error:', error)
      return { isVerified: false, level: 0 }
    }
  },

  // Submit verification documents
  submitVerification: async (data: { userId: string; documents: any }) => {
    try {
      const response = await fetch(`${API_BASE_URLS.trustVerification}/verification/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to submit verification')
      return await response.json()
    } catch (error) {
      console.error('Verification submission error:', error)
      return null
    }
  }
}

// Feature 4: Secure Messaging Chat API
export const secureChatAPI = {
  // Get chat conversations
  getConversations: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URLS.secureChat}/chat/conversations/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch conversations')
      return await response.json()
    } catch (error) {
      console.error('Chat conversations error:', error)
      return []
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URLS.secureChat}/chat/messages/${conversationId}`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      return await response.json()
    } catch (error) {
      console.error('Chat messages error:', error)
      return []
    }
  },

  // Send message
  sendMessage: async (data: { conversationId: string; senderId: string; content: string }) => {
    try {
      const response = await fetch(`${API_BASE_URLS.secureChat}/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to send message')
      return await response.json()
    } catch (error) {
      console.error('Send message error:', error)
      return null
    }
  }
}

// Feature 5: Admin Dashboard Oversight API
export const adminDashboardAPI = {
  // Get platform statistics
  getPlatformStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URLS.adminDashboard}/admin/stats`)
      if (!response.ok) throw new Error('Failed to fetch platform stats')
      return await response.json()
    } catch (error) {
      console.error('Platform stats error:', error)
      return {}
    }
  },

  // Get pending verifications
  getPendingVerifications: async () => {
    try {
      const response = await fetch(`${API_BASE_URLS.adminDashboard}/admin/verifications/pending`)
      if (!response.ok) throw new Error('Failed to fetch pending verifications')
      return await response.json()
    } catch (error) {
      console.error('Pending verifications error:', error)
      return []
    }
  },

  // Approve/reject verification
  updateVerification: async (verificationId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`${API_BASE_URLS.adminDashboard}/admin/verifications/${verificationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!response.ok) throw new Error('Failed to update verification')
      return await response.json()
    } catch (error) {
      console.error('Update verification error:', error)
      return null
    }
  }
}

// Feature 2 extensions: Projects, Submissions, Notifications, ATS
export const projectsAPI = {
  list: async (params: { q?: string; difficulty?: string; technology?: string; company?: string } = {}) => {
    const qs = new URLSearchParams()
    if (params.q) qs.append('q', params.q)
    if (params.difficulty) qs.append('difficulty', params.difficulty)
    if (params.technology) qs.append('technology', params.technology)
    if (params.company) qs.append('company', params.company)
    const res = await fetch(`${API_BASE_URLS.studentProfile}/projects?${qs}`)
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },
  submit: async (projectId: string, submission: { description: string; technologies: string[]; files: { filename: string; url: string; size: number; mimetype: string }[] }) => {
    const res = await fetch(`${API_BASE_URLS.studentProfile}/projects/${projectId}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to submit project')
    return res.json()
  },
  mySubmissions: async () => {
    const res = await fetch(`${API_BASE_URLS.studentProfile}/projects/me/submissions`, { credentials: 'include' })
    if (!res.ok) throw new Error('Failed to fetch submissions')
    return res.json()
  }
}

export const notificationsAPI = {
  getPrefs: async () => {
    const res = await fetch(`${API_BASE_URLS.studentProfile}/notifications/prefs`, { credentials: 'include' })
    if (!res.ok) throw new Error('Failed to fetch notification prefs')
    return res.json()
  },
  updatePrefs: async (prefs: any) => {
    const res = await fetch(`${API_BASE_URLS.studentProfile}/notifications/prefs`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prefs),
      credentials: 'include'
    })
    if (!res.ok) throw new Error('Failed to update notification prefs')
    return res.json()
  }
}

export const atsAPI = {
  analyze: async (file: File) => {
    const form = new FormData()
    form.append('resume', file)
    const res = await fetch(`${API_BASE_URLS.studentProfile}/ats/analyze`, {
      method: 'POST',
      body: form,
      credentials: 'include'
    })
    if (!res.ok) throw new Error('Failed to analyze resume')
    return res.json()
  },
  latest: async () => {
    const res = await fetch(`${API_BASE_URLS.studentProfile}/ats/me/latest`, { credentials: 'include' })
    if (!res.ok) throw new Error('Failed to fetch latest analysis')
    return res.json()
  }
}

// Mock data fallback for development - Using actual CSV data
export const mockData = {
  alumni: [
    {
      id: "1",
      name: "Sarah Johnson",
      graduationYear: 2019,
      department: "Computer Science",
      currentCompany: "Google",
      position: "Senior Software Engineer",
      location: "Mountain View, CA",
      packageLPA: 25,
      linkedinURL: "https://linkedin.com/in/sarahjohnson",
      email: "sarah.johnson@google.com",
      skillsNotes: "JavaScript,React,Node.js,Python",
      isVerified: true,
      rating: 4.9,
      studentsMentored: 28,
      successfulReferrals: 12,
      pendingRequests: 5
    },
    {
      id: "2",
      name: "Michael Chen",
      graduationYear: 2018,
      department: "Computer Science",
      currentCompany: "Microsoft",
      position: "Product Manager",
      location: "Redmond, WA",
      packageLPA: 22,
      linkedinURL: "https://linkedin.com/in/michaelchen",
      email: "michael.chen@microsoft.com",
      skillsNotes: "Product Management,Agile,User Research",
      isVerified: true,
      rating: 4.8,
      studentsMentored: 35,
      successfulReferrals: 18,
      pendingRequests: 3
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      graduationYear: 2020,
      department: "Data Science",
      currentCompany: "Amazon",
      position: "Data Scientist",
      location: "Seattle, WA",
      packageLPA: 20,
      linkedinURL: "https://linkedin.com/in/emilyrodriguez",
      email: "emily.rodriguez@amazon.com",
      skillsNotes: "Python,R,SQL,Machine Learning",
      isVerified: true,
      rating: 4.7,
      studentsMentored: 22,
      successfulReferrals: 8,
      pendingRequests: 2
    },
    {
      id: "4",
      name: "David Wilson",
      graduationYear: 2017,
      department: "Electrical Engineering",
      currentCompany: "Apple",
      position: "Hardware Engineer",
      location: "Cupertino, CA",
      packageLPA: 18,
      linkedinURL: "https://linkedin.com/in/davidwilson",
      email: "david.wilson@apple.com",
      skillsNotes: "PCB Design,VHDL,Embedded Systems",
      isVerified: true,
      rating: 4.6,
      studentsMentored: 15,
      successfulReferrals: 5,
      pendingRequests: 1
    },
    {
      id: "5",
      name: "Lisa Brown",
      graduationYear: 2019,
      department: "Business Administration",
      currentCompany: "Netflix",
      position: "Senior Product Manager",
      location: "Los Gatos, CA",
      packageLPA: 24,
      linkedinURL: "https://linkedin.com/in/lisabrown",
      email: "lisa.brown@netflix.com",
      skillsNotes: "Product Management,Data Analysis,Strategy",
      isVerified: true,
      rating: 4.8,
      studentsMentored: 30,
      successfulReferrals: 15,
      pendingRequests: 4
    },
    {
      id: "6",
      name: "James Taylor",
      graduationYear: 2018,
      department: "Computer Science",
      currentCompany: "Meta",
      position: "Software Engineer",
      location: "Menlo Park, CA",
      packageLPA: 21,
      linkedinURL: "https://linkedin.com/in/jamestaylor",
      email: "james.taylor@meta.com",
      skillsNotes: "React,GraphQL,PHP",
      isVerified: true,
      rating: 4.5,
      studentsMentored: 18,
      successfulReferrals: 7,
      pendingRequests: 2
    },
    {
      id: "7",
      name: "Maria Garcia",
      graduationYear: 2020,
      department: "Data Science",
      currentCompany: "LinkedIn",
      position: "Data Engineer",
      location: "Sunnyvale, CA",
      packageLPA: 19,
      linkedinURL: "https://linkedin.com/in/mariagarcia",
      email: "maria.garcia@linkedin.com",
      skillsNotes: "Python,Spark,Kafka",
      isVerified: true,
      rating: 4.7,
      studentsMentored: 25,
      successfulReferrals: 10,
      pendingRequests: 3
    },
    {
      id: "8",
      name: "Robert Davis",
      graduationYear: 2019,
      department: "Computer Science",
      currentCompany: "Salesforce",
      position: "Senior Developer",
      location: "San Francisco, CA",
      packageLPA: 23,
      linkedinURL: "https://linkedin.com/in/robertdavis",
      email: "robert.davis@salesforce.com",
      skillsNotes: "Java,Apex,Salesforce",
      isVerified: true,
      rating: 4.6,
      studentsMentored: 20,
      successfulReferrals: 9,
      pendingRequests: 2
    },
    {
      id: "9",
      name: "Amanda Lee",
      graduationYear: 2018,
      department: "Computer Science",
      currentCompany: "Adobe",
      position: "UX Engineer",
      location: "San Jose, CA",
      packageLPA: 20,
      linkedinURL: "https://linkedin.com/in/amandalee",
      email: "amanda.lee@adobe.com",
      skillsNotes: "JavaScript,React,Design Systems",
      isVerified: true,
      rating: 4.8,
      studentsMentored: 32,
      successfulReferrals: 14,
      pendingRequests: 5
    },
    {
      id: "10",
      name: "Thomas Anderson",
      graduationYear: 2017,
      department: "Computer Science",
      currentCompany: "NVIDIA",
      position: "AI Research Engineer",
      location: "Santa Clara, CA",
      packageLPA: 26,
      linkedinURL: "https://linkedin.com/in/thomasanderson",
      email: "thomas.anderson@nvidia.com",
      skillsNotes: "Python,TensorFlow,PyTorch",
      isVerified: true,
      rating: 4.9,
      studentsMentored: 40,
      successfulReferrals: 20,
      pendingRequests: 6
    }
  ],
  students: [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@university.edu",
      department: "Computer Science",
      yearOfStudy: "Final Year",
      gpa: 3.8,
      atsScore: 85,
      points: 1250,
      connections: 24,
      isVerified: true
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Data Science",
      yearOfStudy: "3rd Year",
      gpa: 3.9,
      atsScore: 92,
      points: 980,
      connections: 18,
      isVerified: true
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@university.edu",
      department: "Computer Science",
      yearOfStudy: "Final Year",
      gpa: 3.7,
      atsScore: 78,
      points: 890,
      connections: 15,
      isVerified: true
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      department: "Mechanical Engineering",
      yearOfStudy: "4th Year",
      gpa: 3.6,
      atsScore: 82,
      points: 750,
      connections: 12,
      isVerified: true
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      department: "Electrical Engineering",
      yearOfStudy: "3rd Year",
      gpa: 3.8,
      atsScore: 88,
      points: 1100,
      connections: 20,
      isVerified: true
    }
  ]
} 