// Data Service for Static Website - Loads and manages CSV data

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  studentId: string;
  department: string;
  yearOfStudy: string;
  currentSemester: string;
  gpa: number;
  atsScore: number;
  points: number;
  connections: number;
  resumeUrl: string;
  resumeFileName?: string;
  resumeUploadDate?: string;
  skills: string[];
  interests: string[];
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  personalWebsite?: string;
  profilePhoto?: string;
  createdAt: string;
  lastActive: string;
  isVerified: boolean;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone?: string;
  alumniId: string;
  graduationYear: string;
  department: string;
  company: string;
  position: string;
  location: string;
  rating: number;
  studentsMentored: number;
  successfulReferrals: number;
  totalReferrals: number;
  pendingRequests: number;
  referralPoints: number;
  skills: string[];
  interests: string[];
  linkedinUrl: string;
  githubUrl: string;
  profilePhoto?: string;
  batchStart: number;
  batchEnd: number;
  isVerified: boolean;
  createdAt: string;
  lastActive: string;
}

export interface Comment {
  id: string;
  discussionId: number;
  author: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  isAlumni: boolean;
  createdAt: string;
}

export interface Discussion {
  id: number;
  title: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  timeAgo: string;
  isPinned: boolean;
  isHot: boolean;
  preview: string;
  tags: string[];
}

export interface ReferralRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentDepartment: string;
  studentYearOfStudy: string;
  studentAtsScore: number;
  studentAvatar: string;
  requestedPosition: string;
  requestedCompany: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  alumniId: string;
}

// Real data from CSV files
export const studentsData: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "CS2024001",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    currentSemester: "Fall 2024",
    gpa: 3.8,
    atsScore: 85,
    points: 1250,
    connections: 24,
    resumeUrl: "https://resume.com/john-smith",
    resumeFileName: "John_Smith_Resume.pdf",
    resumeUploadDate: "2024-11-15",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    interests: ["Web Development", "AI", "Cloud Computing"],
    location: "New York, NY",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    personalWebsite: "https://johnsmith.dev",
    profilePhoto: "",
    githubUrl: "https://github.com/johnsmith",
    createdAt: "2024-01-15",
    lastActive: "2024-12-10",
    isVerified: true
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 234-5678",
    studentId: "DS2024002",
    department: "Data Science",
    yearOfStudy: "3rd Year",
    currentSemester: "Fall 2024",
    gpa: 3.9,
    atsScore: 92,
    points: 980,
    connections: 18,
    resumeUrl: "https://resume.com/sarah-johnson",
    resumeFileName: "Sarah_Johnson_Resume.pdf",
    resumeUploadDate: "2024-11-10",
    skills: ["Python", "R", "SQL", "Machine Learning"],
    interests: ["Data Analysis", "ML", "Statistics"],
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    githubUrl: "https://github.com/sarahjohnson",
    personalWebsite: "https://sarahjohnson.dev",
    profilePhoto: "",
    createdAt: "2024-01-20",
    lastActive: "2024-12-09",
    isVerified: true
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 345-6789",
    studentId: "CS2024003",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    currentSemester: "Fall 2024",
    gpa: 3.7,
    atsScore: 78,
    points: 890,
    connections: 15,
    resumeUrl: "https://resume.com/michael-chen",
    resumeFileName: "Michael_Chen_Resume.pdf",
    resumeUploadDate: "2024-11-05",
    skills: ["Java", "Spring Boot", "MySQL"],
    interests: ["Backend Development", "System Design"],
    location: "Seattle, WA",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    githubUrl: "https://github.com/michaelchen",
    personalWebsite: "https://michaelchen.dev",
    profilePhoto: "",
    createdAt: "2024-02-01",
    lastActive: "2024-12-08",
    isVerified: true
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    phone: "+1 (555) 456-7890",
    studentId: "ME2024004",
    department: "Mechanical Engineering",
    yearOfStudy: "4th Year",
    currentSemester: "Fall 2024",
    gpa: 3.6,
    atsScore: 82,
    points: 750,
    connections: 12,
    resumeUrl: "https://resume.com/emily-davis",
    resumeFileName: "Emily_Davis_Resume.pdf",
    resumeUploadDate: "2024-11-01",
    skills: ["CAD", "SolidWorks", "MATLAB"],
    interests: ["Product Design", "Manufacturing"],
    location: "Austin, TX",
    linkedinUrl: "https://linkedin.com/in/emilydavis",
    githubUrl: "https://github.com/emilydavis",
    personalWebsite: "https://emilydavis.dev",
    profilePhoto: "",
    createdAt: "2024-02-05",
    lastActive: "2024-12-07",
    isVerified: true
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@university.edu",
    phone: "+1 (555) 567-8901",
    studentId: "EE2024005",
    department: "Electrical Engineering",
    yearOfStudy: "3rd Year",
    currentSemester: "Fall 2024",
    gpa: 3.8,
    atsScore: 88,
    points: 1100,
    connections: 20,
    resumeUrl: "https://resume.com/david-wilson",
    resumeFileName: "David_Wilson_Resume.pdf",
    resumeUploadDate: "2024-10-28",
    skills: ["C++", "VHDL", "PCB Design"],
    interests: ["Embedded Systems", "Robotics"],
    location: "Boston, MA",
    linkedinUrl: "https://linkedin.com/in/davidwilson",
    githubUrl: "https://github.com/davidwilson",
    personalWebsite: "https://davidwilson.dev",
    profilePhoto: "",
    createdAt: "2024-02-10",
    lastActive: "2024-12-10",
    isVerified: true
  },
  {
    id: "6",
    name: "Lisa Brown",
    email: "lisa.brown@university.edu",
    department: "Business Administration",
    yearOfStudy: "Final Year",
    gpa: 3.9,
    atsScore: 90,
    points: 1350,
    connections: 22,
    resumeUrl: "https://resume.com/lisa-brown",
    skills: ["Excel", "PowerPoint", "Project Management"],
    interests: ["Business Strategy", "Marketing"],
    location: "Chicago, IL",
    linkedinUrl: "https://linkedin.com/in/lisabrown",
    githubUrl: "https://github.com/lisabrown",
    createdAt: "2024-02-15",
    lastActive: "2024-12-09",
    isVerified: true
  },
  {
    id: "7",
    name: "James Rodriguez",
    email: "james.rodriguez@university.edu",
    department: "Computer Science",
    yearOfStudy: "2nd Year",
    gpa: 3.5,
    atsScore: 75,
    points: 650,
    connections: 8,
    resumeUrl: "https://resume.com/james-rodriguez",
    skills: ["Python", "HTML", "CSS"],
    interests: ["Web Development", "Game Dev"],
    location: "Los Angeles, CA",
    linkedinUrl: "https://linkedin.com/in/jamesrodriguez",
    githubUrl: "https://github.com/jamesrodriguez",
    createdAt: "2024-03-01",
    lastActive: "2024-12-08",
    isVerified: true
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria.garcia@university.edu",
    department: "Data Science",
    yearOfStudy: "Final Year",
    gpa: 3.8,
    atsScore: 89,
    points: 1200,
    connections: 19,
    resumeUrl: "https://resume.com/maria-garcia",
    skills: ["Python", "Pandas", "Scikit-learn"],
    interests: ["Data Science", "ML", "Analytics"],
    location: "Miami, FL",
    linkedinUrl: "https://linkedin.com/in/mariagarcia",
    githubUrl: "https://github.com/mariagarcia",
    createdAt: "2024-03-05",
    lastActive: "2024-12-10",
    isVerified: true
  },
  {
    id: "9",
    name: "Robert Taylor",
    email: "robert.taylor@university.edu",
    department: "Civil Engineering",
    yearOfStudy: "4th Year",
    gpa: 3.7,
    atsScore: 84,
    points: 920,
    connections: 14,
    resumeUrl: "https://resume.com/robert-taylor",
    skills: ["AutoCAD", "Revit", "Structural Analysis"],
    interests: ["Construction", "Infrastructure"],
    location: "Denver, CO",
    linkedinUrl: "https://linkedin.com/in/roberttaylor",
    githubUrl: "https://github.com/roberttaylor",
    createdAt: "2024-03-10",
    lastActive: "2024-12-07",
    isVerified: true
  },
  {
    id: "10",
    name: "Amanda Lee",
    email: "amanda.lee@university.edu",
    department: "Computer Science",
    yearOfStudy: "3rd Year",
    gpa: 3.9,
    atsScore: 91,
    points: 1050,
    connections: 16,
    resumeUrl: "https://resume.com/amanda-lee",
    skills: ["Java", "Android", "Kotlin"],
    interests: ["Mobile Development", "UI/UX"],
    location: "Portland, OR",
    linkedinUrl: "https://linkedin.com/in/amandalee",
    githubUrl: "https://github.com/amandalee",
    createdAt: "2024-03-15",
    lastActive: "2024-12-09",
    isVerified: true
  },
  {
    id: "11",
    name: "Thomas Anderson",
    email: "thomas.anderson@university.edu",
    department: "Physics",
    yearOfStudy: "Final Year",
    gpa: 3.8,
    atsScore: 86,
    points: 880,
    connections: 11,
    resumeUrl: "https://resume.com/thomas-anderson",
    skills: ["Python", "MATLAB", "Quantum Computing"],
    interests: ["Research", "Quantum Physics"],
    location: "Berkeley, CA",
    linkedinUrl: "https://linkedin.com/in/thomasanderson",
    githubUrl: "https://github.com/thomasanderson",
    createdAt: "2024-04-01",
    lastActive: "2024-12-08",
    isVerified: true
  },
  {
    id: "12",
    name: "Jennifer White",
    email: "jennifer.white@university.edu",
    department: "Chemical Engineering",
    yearOfStudy: "3rd Year",
    gpa: 3.6,
    atsScore: 79,
    points: 720,
    connections: 9,
    resumeUrl: "https://resume.com/jennifer-white",
    skills: ["Aspen Plus", "MATLAB", "Lab Techniques"],
    interests: ["Process Design", "Research"],
    location: "Houston, TX",
    linkedinUrl: "https://linkedin.com/in/jenniferwhite",
    githubUrl: "https://github.com/jenniferwhite",
    createdAt: "2024-04-05",
    lastActive: "2024-12-07",
    isVerified: true
  },
  {
    id: "13",
    name: "Christopher Martinez",
    email: "christopher.martinez@university.edu",
    department: "Computer Science",
    yearOfStudy: "2nd Year",
    gpa: 3.7,
    atsScore: 83,
    points: 680,
    connections: 7,
    resumeUrl: "https://resume.com/christopher-martinez",
    skills: ["C++", "Python", "Linux"],
    interests: ["Systems Programming", "DevOps"],
    location: "Phoenix, AZ",
    linkedinUrl: "https://linkedin.com/in/christophermartinez",
    githubUrl: "https://github.com/christophermartinez",
    createdAt: "2024-04-10",
    lastActive: "2024-12-09",
    isVerified: true
  },
  {
    id: "14",
    name: "Jessica Thompson",
    email: "jessica.thompson@university.edu",
    department: "Psychology",
    yearOfStudy: "Final Year",
    gpa: 3.8,
    atsScore: 87,
    points: 950,
    connections: 13,
    resumeUrl: "https://resume.com/jessica-thompson",
    skills: ["SPSS", "R", "Research Methods"],
    interests: ["Clinical Psychology", "Research"],
    location: "Philadelphia, PA",
    linkedinUrl: "https://linkedin.com/in/jessicathompson",
    githubUrl: "https://github.com/jessicathompson",
    createdAt: "2024-04-15",
    lastActive: "2024-12-10",
    isVerified: true
  },
  {
    id: "15",
    name: "Daniel Clark",
    email: "daniel.clark@university.edu",
    department: "Computer Science",
    yearOfStudy: "4th Year",
    gpa: 3.9,
    atsScore: 93,
    points: 1400,
    connections: 25,
    resumeUrl: "https://resume.com/daniel-clark",
    skills: ["Python", "TensorFlow", "PyTorch"],
    interests: ["AI", "Deep Learning", "Computer Vision"],
    location: "San Diego, CA",
    linkedinUrl: "https://linkedin.com/in/danielclark",
    githubUrl: "https://github.com/danielclark",
    createdAt: "2024-05-01",
    lastActive: "2024-12-10",
    isVerified: true
  }
];

export const alumniData: Alumni[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@google.com",
    phone: "+1 (555) 987-6543",
    alumniId: "AL2020001",
    graduationYear: "2020",
    department: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    rating: 4.9,
    studentsMentored: 28,
    successfulReferrals: 12,
    totalReferrals: 18,
    pendingRequests: 5,
    referralPoints: 450,
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    interests: ["Web Development", "AI", "Cloud Computing"],
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    githubUrl: "https://github.com/sarahjohnson",
    profilePhoto: "",
    batchStart: 2016,
    batchEnd: 2020,
    isVerified: true,
    createdAt: "2020-06-15",
    lastActive: "2024-12-10"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@microsoft.com",
    phone: "+1 (555) 876-5432",
    alumniId: "AL2018002",
    graduationYear: "2018",
    department: "Computer Science",
    company: "Microsoft",
    position: "Product Manager",
    location: "Redmond, WA",
    rating: 4.8,
    studentsMentored: 35,
    successfulReferrals: 18,
    totalReferrals: 25,
    pendingRequests: 3,
    referralPoints: 380,
    skills: ["Product Management", "Agile", "User Research"],
    interests: ["Product Strategy", "UX Design"],
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    githubUrl: "https://github.com/michaelchen",
    profilePhoto: "",
    batchStart: 2014,
    batchEnd: 2018,
    isVerified: true,
    createdAt: "2020-02-01",
    lastActive: "2024-12-09"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@amazon.com",
    graduationYear: "2020",
    department: "Data Science",
    company: "Amazon",
    position: "Data Scientist",
    location: "Seattle, WA",
    rating: 4.7,
    studentsMentored: 22,
    successfulReferrals: 8,
    pendingRequests: 2,
    skills: ["Python", "R", "SQL", "Machine Learning"],
    interests: ["Data Analysis", "ML", "Statistics"],
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    githubUrl: "https://github.com/emilyrodriguez",
    isVerified: true,
    createdAt: "2020-03-01",
    lastActive: "2024-12-08"
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@apple.com",
    graduationYear: "2017",
    department: "Electrical Engineering",
    company: "Apple",
    position: "Hardware Engineer",
    location: "Cupertino, CA",
    rating: 4.6,
    studentsMentored: 15,
    successfulReferrals: 5,
    pendingRequests: 1,
    skills: ["PCB Design", "VHDL", "Embedded Systems"],
    interests: ["Hardware Design", "Robotics"],
    linkedinUrl: "https://linkedin.com/in/davidwilson",
    githubUrl: "https://github.com/davidwilson",
    isVerified: true,
    createdAt: "2020-03-15",
    lastActive: "2024-12-07"
  },
  {
    id: "5",
    name: "Lisa Brown",
    email: "lisa.brown@netflix.com",
    graduationYear: "2019",
    department: "Business Administration",
    company: "Netflix",
    position: "Senior Product Manager",
    location: "Los Gatos, CA",
    rating: 4.8,
    studentsMentored: 30,
    successfulReferrals: 15,
    pendingRequests: 4,
    skills: ["Product Management", "Data Analysis", "Strategy"],
    interests: ["Business Strategy", "Entertainment"],
    linkedinUrl: "https://linkedin.com/in/lisabrown",
    githubUrl: "https://github.com/lisabrown",
    isVerified: true,
    createdAt: "2020-04-01",
    lastActive: "2024-12-10"
  },
  {
    id: "6",
    name: "James Taylor",
    email: "james.taylor@meta.com",
    graduationYear: "2018",
    department: "Computer Science",
    company: "Meta",
    position: "Software Engineer",
    location: "Menlo Park, CA",
    rating: 4.5,
    studentsMentored: 18,
    successfulReferrals: 7,
    pendingRequests: 2,
    skills: ["React", "GraphQL", "PHP"],
    interests: ["Social Media", "Web Development"],
    linkedinUrl: "https://linkedin.com/in/jamestaylor",
    githubUrl: "https://github.com/jamestaylor",
    isVerified: true,
    createdAt: "2020-04-15",
    lastActive: "2024-12-09"
  },
  {
    id: "7",
    name: "Maria Garcia",
    email: "maria.garcia@linkedin.com",
    graduationYear: "2020",
    department: "Data Science",
    company: "LinkedIn",
    position: "Data Engineer",
    location: "Sunnyvale, CA",
    rating: 4.7,
    studentsMentored: 25,
    successfulReferrals: 10,
    pendingRequests: 3,
    skills: ["Python", "Spark", "Kafka"],
    interests: ["Big Data", "Analytics"],
    linkedinUrl: "https://linkedin.com/in/mariagarcia",
    githubUrl: "https://github.com/mariagarcia",
    isVerified: true,
    createdAt: "2020-05-01",
    lastActive: "2024-12-08"
  },
  {
    id: "8",
    name: "Robert Davis",
    email: "robert.davis@salesforce.com",
    graduationYear: "2019",
    department: "Computer Science",
    company: "Salesforce",
    position: "Senior Developer",
    location: "San Francisco, CA",
    rating: 4.6,
    studentsMentored: 20,
    successfulReferrals: 9,
    pendingRequests: 2,
    skills: ["Java", "Apex", "Salesforce"],
    interests: ["CRM", "Cloud Computing"],
    linkedinUrl: "https://linkedin.com/in/robertdavis",
    githubUrl: "https://github.com/robertdavis",
    isVerified: true,
    createdAt: "2020-05-15",
    lastActive: "2024-12-07"
  },
  {
    id: "9",
    name: "Amanda Lee",
    email: "amanda.lee@adobe.com",
    graduationYear: "2018",
    department: "Computer Science",
    company: "Adobe",
    position: "UX Engineer",
    location: "San Jose, CA",
    rating: 4.8,
    studentsMentored: 32,
    successfulReferrals: 14,
    pendingRequests: 5,
    skills: ["JavaScript", "React", "Design Systems"],
    interests: ["UI/UX", "Design"],
    linkedinUrl: "https://linkedin.com/in/amandalee",
    githubUrl: "https://github.com/amandalee",
    isVerified: true,
    createdAt: "2020-06-01",
    lastActive: "2024-12-10"
  },
  {
    id: "10",
    name: "Thomas Anderson",
    email: "thomas.anderson@nvidia.com",
    graduationYear: "2017",
    department: "Computer Science",
    company: "NVIDIA",
    position: "AI Research Engineer",
    location: "Santa Clara, CA",
    rating: 4.9,
    studentsMentored: 40,
    successfulReferrals: 20,
    pendingRequests: 6,
    skills: ["Python", "TensorFlow", "PyTorch"],
    interests: ["AI", "Deep Learning", "Computer Vision"],
    linkedinUrl: "https://linkedin.com/in/thomasanderson",
    githubUrl: "https://github.com/thomasanderson",
    isVerified: true,
    createdAt: "2020-06-15",
    lastActive: "2024-12-09"
  },
  {
    id: "11",
    name: "Jennifer White",
    email: "jennifer.white@intel.com",
    graduationYear: "2019",
    department: "Electrical Engineering",
    company: "Intel",
    position: "Hardware Engineer",
    location: "Santa Clara, CA",
    rating: 4.5,
    studentsMentored: 16,
    successfulReferrals: 6,
    pendingRequests: 1,
    skills: ["VHDL", "PCB Design", "ASIC"],
    interests: ["Hardware Design", "Semiconductors"],
    linkedinUrl: "https://linkedin.com/in/jenniferwhite",
    githubUrl: "https://github.com/jenniferwhite",
    isVerified: true,
    createdAt: "2020-07-01",
    lastActive: "2024-12-08"
  },
  {
    id: "12",
    name: "Christopher Martinez",
    email: "christopher.martinez@oracle.com",
    graduationYear: "2018",
    department: "Computer Science",
    company: "Oracle",
    position: "Database Administrator",
    location: "Austin, TX",
    rating: 4.4,
    studentsMentored: 12,
    successfulReferrals: 4,
    pendingRequests: 1,
    skills: ["SQL", "Oracle", "Database Design"],
    interests: ["Database Management", "Cloud"],
    linkedinUrl: "https://linkedin.com/in/christophermartinez",
    githubUrl: "https://github.com/christophermartinez",
    isVerified: true,
    createdAt: "2020-07-15",
    lastActive: "2024-12-07"
  },
  {
    id: "13",
    name: "Jessica Thompson",
    email: "jessica.thompson@ibm.com",
    graduationYear: "2020",
    department: "Computer Science",
    company: "IBM",
    position: "Cloud Solutions Architect",
    location: "Armonk, NY",
    rating: 4.7,
    studentsMentored: 28,
    successfulReferrals: 12,
    pendingRequests: 3,
    skills: ["AWS", "Azure", "Cloud Architecture"],
    interests: ["Cloud Computing", "DevOps"],
    linkedinUrl: "https://linkedin.com/in/jessicathompson",
    githubUrl: "https://github.com/jessicathompson",
    isVerified: true,
    createdAt: "2020-08-01",
    lastActive: "2024-12-10"
  },
  {
    id: "14",
    name: "Daniel Clark",
    email: "daniel.clark@cisco.com",
    graduationYear: "2019",
    department: "Computer Science",
    company: "Cisco",
    position: "Network Engineer",
    location: "San Jose, CA",
    rating: 4.3,
    studentsMentored: 14,
    successfulReferrals: 5,
    pendingRequests: 1,
    skills: ["Networking", "CCNA", "Python"],
    interests: ["Network Security", "Infrastructure"],
    linkedinUrl: "https://linkedin.com/in/danielclark",
    githubUrl: "https://github.com/danielclark",
    isVerified: true,
    createdAt: "2020-08-15",
    lastActive: "2024-12-09"
  },
  {
    id: "15",
    name: "Sophie Chen",
    email: "sophie.chen@spotify.com",
    graduationYear: "2020",
    department: "Data Science",
    company: "Spotify",
    position: "Data Scientist",
    location: "Stockholm, Sweden",
    rating: 4.8,
    studentsMentored: 26,
    successfulReferrals: 11,
    pendingRequests: 4,
    skills: ["Python", "R", "SQL", "Machine Learning"],
    interests: ["Music Analytics", "Recommendation Systems"],
    linkedinUrl: "https://linkedin.com/in/sophiechen",
    githubUrl: "https://github.com/sophiechen",
    isVerified: true,
    createdAt: "2020-09-01",
    lastActive: "2024-12-08"
  }
];

// Data Service Class
export class DataService {
  // Student methods
  static getStudents(): Student[] {
    return studentsData;
  }

  static getStudentById(id: string): Student | undefined {
    return studentsData.find(student => student.id === id);
  }

  static searchStudents(query: string): Student[] {
    const lowercaseQuery = query.toLowerCase();
    return studentsData.filter(student =>
      student.name.toLowerCase().includes(lowercaseQuery) ||
      student.department.toLowerCase().includes(lowercaseQuery) ||
      student.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      student.interests.some(interest => interest.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getStudentsByDepartment(department: string): Student[] {
    return studentsData.filter(student => 
      student.department.toLowerCase() === department.toLowerCase()
    );
  }

  static getTopStudents(limit: number = 5): Student[] {
    return studentsData
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }

  // Alumni methods
  static getAlumni(): Alumni[] {
    return alumniData;
  }

  static getAlumniById(id: string): Alumni | undefined {
    return alumniData.find(alumni => alumni.id === id);
  }

  static searchAlumni(query: string): Alumni[] {
    const lowercaseQuery = query.toLowerCase();
    return alumniData.filter(alumni =>
      alumni.name.toLowerCase().includes(lowercaseQuery) ||
      alumni.company.toLowerCase().includes(lowercaseQuery) ||
      alumni.position.toLowerCase().includes(lowercaseQuery) ||
      alumni.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      alumni.interests.some(interest => interest.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getAlumniByCompany(company: string): Alumni[] {
    return alumniData.filter(alumni => 
      alumni.company.toLowerCase() === company.toLowerCase()
    );
  }

  static getAlumniByDepartment(department: string): Alumni[] {
    return alumniData.filter(alumni => 
      alumni.department.toLowerCase() === department.toLowerCase()
    );
  }

  static getTopRatedAlumni(limit: number = 5): Alumni[] {
    return alumniData
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  static getAlumniByGraduationYear(year: number): Alumni[] {
    return alumniData.filter(alumni => 
      parseInt(alumni.graduationYear) === year
    );
  }

  // Statistics methods
  static getPlatformStats() {
    return {
      totalStudents: studentsData.length,
      totalAlumni: alumniData.length,
      totalConnections: studentsData.reduce((sum, student) => sum + student.connections, 0),
      totalReferrals: alumniData.reduce((sum, alumni) => sum + alumni.successfulReferrals, 0),
      averageStudentPoints: Math.round(studentsData.reduce((sum, student) => sum + student.points, 0) / studentsData.length),
      averageAlumniRating: Math.round((alumniData.reduce((sum, alumni) => sum + alumni.rating, 0) / alumniData.length) * 10) / 10
    };
  }

  // Search and filter methods
  static searchAll(query: string) {
    return {
      students: this.searchStudents(query),
      alumni: this.searchAlumni(query)
    };
  }

  static getDepartments() {
    const studentDepts = [...new Set(studentsData.map(s => s.department))];
    const alumniDepts = [...new Set(alumniData.map(a => a.department))];
    return [...new Set([...studentDepts, ...alumniDepts])];
  }

  static getCompanies() {
    return [...new Set(alumniData.map(a => a.company))];
  }

  static getGraduationYears() {
    return [...new Set(alumniData.map(a => parseInt(a.graduationYear)))].sort((a, b) => b - a);
  }

  // Discussion data
  static getUnifiedDiscussions(): Discussion[] {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      // Return default discussions for SSR
      return [
        {
          id: 1,
          title: "How to prepare for Google interviews?",
          author: "Alex Johnson",
          authorRole: "Final Year Student",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=AJ",
          category: "Interview Prep",
          replies: 12,
          likes: 24,
          views: 156,
          timeAgo: "2 hours ago",
          isPinned: true,
          isHot: true,
          preview: "I have an upcoming interview at Google for a Software Engineer position. What should I focus on?",
          tags: ["Google", "Interview", "Software Engineer"]
        },
        {
          id: 2,
          title: "Best practices for building a portfolio",
          author: "Sarah Chen",
          authorRole: "Final Year Student",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=SC",
          category: "Portfolio",
          replies: 8,
          likes: 18,
          views: 89,
          timeAgo: "5 hours ago",
          isPinned: false,
          isHot: false,
          preview: "What projects should I include in my portfolio to stand out?",
          tags: ["Portfolio", "Projects", "GitHub"]
        },
        {
          id: 3,
          title: "Transitioning from CS to Product Management",
          author: "Michael Brown",
          authorRole: "Final Year Student",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=MB",
          category: "Career Transition",
          replies: 15,
          likes: 32,
          views: 203,
          timeAgo: "1 day ago",
          isPinned: false,
          isHot: true,
          preview: "I'm a CS student but interested in PM roles. How can I make this transition?",
          tags: ["Product Management", "Career Change", "PM"]
        },
        {
          id: 4,
          title: "Salary negotiation tips for new grads",
          author: "Emily Davis",
          authorRole: "Final Year Student",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=ED",
          category: "Compensation",
          replies: 6,
          likes: 14,
          views: 67,
          timeAgo: "2 days ago",
          isPinned: false,
          isHot: false,
          preview: "What's the best way to negotiate salary as a new graduate?",
          tags: ["Salary", "Negotiation", "New Grad"]
        },
        {
          id: 5,
          title: "Networking strategies for introverts",
          author: "David Wilson",
          authorRole: "Final Year Student",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=DW",
          category: "Networking",
          replies: 10,
          likes: 22,
          views: 134,
          timeAgo: "3 days ago",
          isPinned: false,
          isHot: false,
          preview: "How can introverts effectively network in the tech industry?",
          tags: ["Networking", "Introvert", "Career"]
        },
        {
          id: 6,
          title: "Industry insights from Google Senior Engineer",
          author: "Sarah Johnson",
          authorRole: "Senior Software Engineer @ Google",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
          category: "Industry Insights",
          replies: 18,
          likes: 45,
          views: 289,
          timeAgo: "4 hours ago",
          isPinned: true,
          isHot: true,
          preview: "Sharing my experience working at Google and tips for aspiring engineers.",
          tags: ["Google", "Industry", "Career Advice"]
        },
        {
          id: 7,
          title: "Product Management career path",
          author: "Michael Chen",
          authorRole: "Product Manager @ Microsoft",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=MC",
          category: "Career Guidance",
          replies: 9,
          likes: 21,
          views: 145,
          timeAgo: "1 day ago",
          isPinned: false,
          isHot: false,
          preview: "AMA about transitioning to Product Management and what it's like at Microsoft.",
          tags: ["Product Management", "Microsoft", "Career Transition"]
        }
      ]
    }

    // Get from localStorage or return default data
    const savedDiscussions = localStorage.getItem("unifiedDiscussions")
    if (savedDiscussions) {
      return JSON.parse(savedDiscussions)
    }

    // Default unified discussions (students + alumni)
    const defaultDiscussions: Discussion[] = [
      {
        id: 1,
        title: "How to prepare for Google interviews?",
        author: "Alex Johnson",
        authorRole: "Final Year Student",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=AJ",
        category: "Interview Prep",
        replies: 12,
        likes: 24,
        views: 156,
        timeAgo: "2 hours ago",
        isPinned: true,
        isHot: true,
        preview: "I have an upcoming interview at Google for a Software Engineer position. What should I focus on?",
        tags: ["Google", "Interview", "Software Engineer"]
      },
      {
        id: 2,
        title: "Best practices for building a portfolio",
        author: "Sarah Chen",
        authorRole: "Final Year Student",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=SC",
        category: "Portfolio",
        replies: 8,
        likes: 18,
        views: 89,
        timeAgo: "5 hours ago",
        isPinned: false,
        isHot: false,
        preview: "What projects should I include in my portfolio to stand out?",
        tags: ["Portfolio", "Projects", "GitHub"]
      },
      {
        id: 3,
        title: "Transitioning from CS to Product Management",
        author: "Michael Brown",
        authorRole: "Final Year Student",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=MB",
        category: "Career Transition",
        replies: 15,
        likes: 32,
        views: 203,
        timeAgo: "1 day ago",
        isPinned: false,
        isHot: true,
        preview: "I'm a CS student but interested in PM roles. How can I make this transition?",
        tags: ["Product Management", "Career Change", "PM"]
      },
      {
        id: 4,
        title: "Salary negotiation tips for new grads",
        author: "Emily Davis",
        authorRole: "Final Year Student",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=ED",
        category: "Compensation",
        replies: 6,
        likes: 14,
        views: 67,
        timeAgo: "2 days ago",
        isPinned: false,
        isHot: false,
        preview: "What's the best way to negotiate salary as a new graduate?",
        tags: ["Salary", "Negotiation", "New Grad"]
      },
      {
        id: 5,
        title: "Networking strategies for introverts",
        author: "David Wilson",
        authorRole: "Final Year Student",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=DW",
        category: "Networking",
        replies: 10,
        likes: 22,
        views: 134,
        timeAgo: "3 days ago",
        isPinned: false,
        isHot: false,
        preview: "How can introverts effectively network in the tech industry?",
        tags: ["Networking", "Introvert", "Career"]
      },
      {
        id: 6,
        title: "Industry insights from Google Senior Engineer",
        author: "Sarah Johnson",
        authorRole: "Senior Software Engineer @ Google",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
        category: "Industry Insights",
        replies: 18,
        likes: 45,
        views: 289,
        timeAgo: "4 hours ago",
        isPinned: true,
        isHot: true,
        preview: "Sharing my experience working at Google and tips for aspiring engineers.",
        tags: ["Google", "Industry", "Career Advice"]
      },
      {
        id: 7,
        title: "Product Management career path",
        author: "Michael Chen",
        authorRole: "Product Manager @ Microsoft",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=MC",
        category: "Career Guidance",
        replies: 9,
        likes: 21,
        views: 145,
        timeAgo: "1 day ago",
        isPinned: false,
        isHot: false,
        preview: "AMA about transitioning to Product Management and what it's like at Microsoft.",
        tags: ["Product Management", "Microsoft", "Career Transition"]
      }
    ]

    // Save default discussions to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("unifiedDiscussions", JSON.stringify(defaultDiscussions))
    }

    return defaultDiscussions
  }

  static getStudentDiscussions(): Discussion[] {
    // Use unified discussions for both students and alumni
    return this.getUnifiedDiscussions()
  }

  static getAlumniDiscussions(): Discussion[] {
    // Use unified discussions for both students and alumni
    return this.getUnifiedDiscussions()
  }

  // Discussion category methods
  static getDiscussionCategories(userType: "student" | "alumni") {
    const discussions = this.getUnifiedDiscussions();
    
    // Get all unique categories
    const allCategories = [...new Set(discussions.map(d => d.category))];
    
    // Calculate counts for each category
    const categoryCounts = allCategories.map(category => ({
      name: category,
      count: discussions.filter(d => d.category === category).length
    }));
    
    // Add "All" category with total count
    const totalCount = discussions.length;
    
    return [
      { name: "All", count: totalCount },
      ...categoryCounts.sort((a, b) => b.count - a.count) // Sort by count descending
    ];
  }

  static getDiscussionsByCategory(category: string, userType: "student" | "alumni") {
    const discussions = this.getUnifiedDiscussions();
    
    if (category === "All") {
      return discussions;
    }
    
    return discussions.filter(d => d.category === category);
  }

  // Live discussion management
  static createDiscussion(
    title: string,
    category: string,
    content: string,
    tags: string[],
    userType: "student" | "alumni",
    currentUser?: Student | Alumni
  ): Discussion {
    const user = currentUser || (userType === "student" ? studentsData[0] : alumniData[0]);
    const discussions = this.getUnifiedDiscussions();
    
    const authorRole = userType === "student" 
      ? `${(user as Student).yearOfStudy} Student` 
      : `${(user as Alumni).position} @ ${(user as Alumni).company}`;
    
    const newDiscussion: Discussion = {
      id: Math.max(...discussions.map(d => d.id)) + 1,
      title,
      author: user.name,
      authorRole,
      authorAvatar: `/placeholder.svg?height=40&width=40&text=${user.name.split(' ').map(n => n[0]).join('')}`,
      category,
      replies: 0,
      likes: 0,
      views: 0,
      timeAgo: "Just now",
      isPinned: false,
      isHot: false,
      preview: content.length > 200 ? content.substring(0, 200) + "..." : content,
      tags
    };

    // Add the new discussion to unified discussions and save to localStorage
    const updatedDiscussions = [...discussions, newDiscussion];
    
    // Only save to localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem("unifiedDiscussions", JSON.stringify(updatedDiscussions));
      console.log("Created unified discussion:", newDiscussion);
    }

    return newDiscussion;
  }

  // Update discussion reply count
  static updateDiscussionReplyCount(discussionId: number, userType: "student" | "alumni"): void {
    // Only update localStorage in browser environment
    if (typeof window === 'undefined') {
      return
    }
    
    const commentCount = this.getCommentCount(discussionId)
    const discussions = this.getUnifiedDiscussions()
    
    const updatedDiscussions = discussions.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, replies: commentCount }
        : discussion
    )
    
    localStorage.setItem("unifiedDiscussions", JSON.stringify(updatedDiscussions))
  }

  static getAlumniParticipants(): { name: string; role: string; avatar: string; isAlumni: boolean }[] {
    return alumniData.slice(0, 5).map(alumni => ({
      name: alumni.name,
      role: `${alumni.position} @ ${alumni.company}`,
      avatar: `/placeholder.svg?height=40&width=40&text=${alumni.name.split(' ').map(n => n[0]).join('')}`,
      isAlumni: true
    }));
  }

  static getStudentParticipants(): { name: string; role: string; avatar: string; isAlumni: boolean }[] {
    return studentsData.slice(0, 5).map(student => ({
      name: student.name,
      role: `${student.yearOfStudy} Student`,
      avatar: `/placeholder.svg?height=40&width=40&text=${student.name.split(' ').map(n => n[0]).join('')}`,
      isAlumni: false
    }));
  }

  // Referral Request Management
  static getReferralRequests(alumniId: string): ReferralRequest[] {
    console.log("Getting referrals for alumniId:", alumniId)
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log("SSR mode, returning default requests")
      // Return default requests for SSR
      return [
        {
          id: "1",
          studentId: "2",
          studentName: "Maria Garcia",
          studentEmail: "maria.garcia@university.edu",
          studentDepartment: "Data Science",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 92,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=MG",
          requestedPosition: "Data Scientist",
          requestedCompany: "Google",
          message: "Hi Sarah, I'm very interested in the Data Scientist position at Google. I have strong experience in ML and would love your referral. I've been working on several ML projects and have a strong foundation in Python, R, and SQL.",
          status: "pending",
          createdAt: "2024-12-10T10:30:00Z",
          alumniId: alumniId
        },
        {
          id: "2",
          studentId: "3",
          studentName: "James Wilson",
          studentEmail: "james.wilson@university.edu",
          studentDepartment: "Business Administration",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 78,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=JW",
          requestedPosition: "Product Manager",
          requestedCompany: "Google",
          message: "Hello Sarah, I'm interested in transitioning to a Product Manager role at Google. My background in business analysis and user research makes me a strong candidate. I'd appreciate your referral.",
          status: "pending",
          createdAt: "2024-12-09T14:20:00Z",
          alumniId: alumniId
        },
        {
          id: "3",
          studentId: "4",
          studentName: "Emily Rodriguez",
          studentEmail: "emily.rodriguez@university.edu",
          studentDepartment: "Computer Science",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 85,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=ER",
          requestedPosition: "Software Engineer",
          requestedCompany: "Google",
          message: "Hi Sarah, I'm a CS student with strong programming skills in Java, Python, and JavaScript. I'm looking for a Software Engineer role at Google and would be grateful for your referral.",
          status: "pending",
          createdAt: "2024-12-08T09:15:00Z",
          alumniId: alumniId
        },
        {
          id: "4",
          studentId: "5",
          studentName: "Alex Johnson",
          studentEmail: "alex.johnson@university.edu",
          studentDepartment: "Computer Science",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 88,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=AJ",
          requestedPosition: "Software Engineer",
          requestedCompany: "Google",
          message: "Hi Sarah, I'm a CS student with experience in React, Node.js, and system design. I'm looking for a Software Engineer role at Google and would appreciate your referral.",
          status: "approved",
          createdAt: "2024-12-07T11:30:00Z",
          alumniId: alumniId
        },
        {
          id: "5",
          studentId: "6",
          studentName: "Sophie Chen",
          studentEmail: "sophie.chen@university.edu",
          studentDepartment: "Design",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 82,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=SC",
          requestedPosition: "UX Designer",
          requestedCompany: "Google",
          message: "Hello Sarah, I'm a design student with strong UX/UI skills. I'm interested in the UX Designer position at Google and would love your referral.",
          status: "approved",
          createdAt: "2024-12-06T15:45:00Z",
          alumniId: alumniId
        },
        {
          id: "6",
          studentId: "7",
          studentName: "Robert Davis",
          studentEmail: "robert.davis@university.edu",
          studentDepartment: "Mechanical Engineering",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 75,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=RD",
          requestedPosition: "Hardware Engineer",
          requestedCompany: "Google",
          message: "Hi Sarah, I'm a mechanical engineering student interested in hardware engineering. I have experience with CAD and prototyping.",
          status: "rejected",
          createdAt: "2024-12-05T13:20:00Z",
          alumniId: alumniId
        },
        {
          id: "7",
          studentId: "8",
          studentName: "David Kim",
          studentEmail: "david.kim@university.edu",
          studentDepartment: "Computer Science",
          studentYearOfStudy: "3rd Year",
          studentAtsScore: 89,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=DK",
          requestedPosition: "Frontend Developer",
          requestedCompany: "Microsoft",
          message: "Hi Sarah, I'm a CS student specializing in frontend development with React and TypeScript. I'm looking for a Frontend Developer role at Microsoft and would appreciate your referral.",
          status: "pending",
          createdAt: "2024-12-11T08:45:00Z",
          alumniId: alumniId
        },
        {
          id: "8",
          studentId: "9",
          studentName: "Lisa Wang",
          studentEmail: "lisa.wang@university.edu",
          studentDepartment: "Marketing",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 76,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=LW",
          requestedPosition: "Marketing Specialist",
          requestedCompany: "Apple",
          message: "Hello Sarah, I'm a marketing student with experience in digital marketing and brand management. I'm interested in the Marketing Specialist position at Apple and would love your referral.",
          status: "pending",
          createdAt: "2024-12-10T16:20:00Z",
          alumniId: alumniId
        },
        {
          id: "9",
          studentId: "10",
          studentName: "Michael Brown",
          studentEmail: "michael.brown@university.edu",
          studentDepartment: "Electrical Engineering",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 81,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=MB",
          requestedPosition: "Electrical Engineer",
          requestedCompany: "Tesla",
          message: "Hi Sarah, I'm an electrical engineering student with a passion for renewable energy and electric vehicles. I'm looking for an Electrical Engineer role at Tesla and would appreciate your referral.",
          status: "pending",
          createdAt: "2024-12-09T12:30:00Z",
          alumniId: alumniId
        },
        {
          id: "10",
          studentId: "11",
          studentName: "Jennifer Lee",
          studentEmail: "jennifer.lee@university.edu",
          studentDepartment: "Data Science",
          studentYearOfStudy: "2nd Year",
          studentAtsScore: 94,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=JL",
          requestedPosition: "Data Analyst",
          requestedCompany: "Netflix",
          message: "Hello Sarah, I'm a data science student with strong analytical skills and experience with Python and SQL. I'm interested in the Data Analyst position at Netflix and would love your referral.",
          status: "approved",
          createdAt: "2024-12-08T14:15:00Z",
          alumniId: alumniId
        },
        {
          id: "11",
          studentId: "12",
          studentName: "Christopher Martinez",
          studentEmail: "christopher.martinez@university.edu",
          studentDepartment: "Mechanical Engineering",
          studentYearOfStudy: "Final Year",
          studentAtsScore: 73,
          studentAvatar: "/placeholder.svg?height=48&width=48&text=CM",
          requestedPosition: "Mechanical Engineer",
          requestedCompany: "SpaceX",
          message: "Hi Sarah, I'm a mechanical engineering student with interest in aerospace and robotics. I'm looking for a Mechanical Engineer role at SpaceX and would appreciate your referral.",
          status: "rejected",
          createdAt: "2024-12-07T10:45:00Z",
          alumniId: alumniId
        }
      ]
    }

    // Get from localStorage or return default data
    const savedRequests = localStorage.getItem(`referralRequests_${alumniId}`)
    console.log("Saved requests from localStorage:", savedRequests ? JSON.parse(savedRequests).length : "none")
    if (savedRequests) {
      return JSON.parse(savedRequests)
    }

    // Default referral requests for the first alumni
    const defaultRequests: ReferralRequest[] = [
      {
        id: "1",
        studentId: "2",
        studentName: "Maria Garcia",
        studentEmail: "maria.garcia@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 92,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=MG",
        requestedPosition: "Data Scientist",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm very interested in the Data Scientist position at Google. I have strong experience in ML and would love your referral. I've been working on several ML projects and have a strong foundation in Python, R, and SQL.",
        status: "pending",
        createdAt: "2024-12-10T10:30:00Z",
        alumniId: alumniId
      },
      {
        id: "2",
        studentId: "3",
        studentName: "James Wilson",
        studentEmail: "james.wilson@university.edu",
        studentDepartment: "Business Administration",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 78,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=JW",
        requestedPosition: "Product Manager",
        requestedCompany: "Google",
        message: "Hello Sarah, I'm interested in transitioning to a Product Manager role at Google. My background in business analysis and user research makes me a strong candidate. I'd appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-09T14:20:00Z",
        alumniId: alumniId
      },
      {
        id: "3",
        studentId: "4",
        studentName: "Emily Rodriguez",
        studentEmail: "emily.rodriguez@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 85,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=ER",
        requestedPosition: "Software Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a CS student with strong programming skills in Java, Python, and JavaScript. I'm looking for a Software Engineer role at Google and would be grateful for your referral.",
        status: "pending",
        createdAt: "2024-12-08T09:15:00Z",
        alumniId: alumniId
      },
      {
        id: "4",
        studentId: "5",
        studentName: "Alex Johnson",
        studentEmail: "alex.johnson@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 88,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=AJ",
        requestedPosition: "Software Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a CS student with experience in React, Node.js, and system design. I'm looking for a Software Engineer role at Google and would appreciate your referral.",
        status: "approved",
        createdAt: "2024-12-07T11:30:00Z",
        alumniId: alumniId
      },
      {
        id: "5",
        studentId: "6",
        studentName: "Sophie Chen",
        studentEmail: "sophie.chen@university.edu",
        studentDepartment: "Design",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 82,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=SC",
        requestedPosition: "UX Designer",
        requestedCompany: "Google",
        message: "Hello Sarah, I'm a design student with strong UX/UI skills. I'm interested in the UX Designer position at Google and would love your referral.",
        status: "approved",
        createdAt: "2024-12-06T15:45:00Z",
        alumniId: alumniId
      },
      {
        id: "6",
        studentId: "7",
        studentName: "Robert Davis",
        studentEmail: "robert.davis@university.edu",
        studentDepartment: "Mechanical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 75,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=RD",
        requestedPosition: "Hardware Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a mechanical engineering student interested in hardware engineering. I have experience with CAD and prototyping.",
        status: "rejected",
        createdAt: "2024-12-05T13:20:00Z",
        alumniId: alumniId
      }
    ]

    // Save default requests to localStorage (only in browser)
    if (typeof window !== 'undefined') {
      console.log("Saving default requests to localStorage for alumniId:", alumniId)
      localStorage.setItem(`referralRequests_${alumniId}`, JSON.stringify(defaultRequests))
    }
    return defaultRequests
  }

  // Initialize test referrals for all alumni
  static initializeTestReferrals(): void {
    if (typeof window === 'undefined') return
    
    // Check if data already exists
    const existingData = localStorage.getItem(`referralRequests_1`)
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData)
        // If we have any data, don't reinitialize (preserve user changes)
        if (parsed.length > 0) {
          console.log("Referral data already exists, preserving user changes")
          return
        }
      } catch (e) {
        // If parsing fails, continue with initialization
      }
    }
    
    // Only initialize if no data exists at all
    console.log("No referral data found, initializing new test referrals...")
    
    console.log("Initializing test referrals for all alumni...")
    
    // Initialize referrals for the first alumni (Sarah Johnson - ID: "1")
    const alumniId = "1"
    const testReferrals: ReferralRequest[] = [
      {
        id: "1",
        studentId: "2",
        studentName: "Maria Garcia",
        studentEmail: "maria.garcia@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 92,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=MG",
        requestedPosition: "Data Scientist",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm very interested in the Data Scientist position at Google. I have strong experience in ML and would love your referral. I've been working on several ML projects and have a strong foundation in Python, R, and SQL.",
        status: "pending",
        createdAt: "2024-12-10T10:30:00Z",
        alumniId: alumniId
      },
      {
        id: "2",
        studentId: "3",
        studentName: "James Wilson",
        studentEmail: "james.wilson@university.edu",
        studentDepartment: "Business Administration",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 78,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=JW",
        requestedPosition: "Product Manager",
        requestedCompany: "Google",
        message: "Hello Sarah, I'm interested in transitioning to a Product Manager role at Google. My background in business analysis and user research makes me a strong candidate. I'd appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-09T14:20:00Z",
        alumniId: alumniId
      },
      {
        id: "3",
        studentId: "4",
        studentName: "Emily Rodriguez",
        studentEmail: "emily.rodriguez@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 85,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=ER",
        requestedPosition: "Software Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a CS student with strong programming skills in Java, Python, and JavaScript. I'm looking for a Software Engineer role at Google and would be grateful for your referral.",
        status: "pending",
        createdAt: "2024-12-08T09:15:00Z",
        alumniId: alumniId
      },
      {
        id: "4",
        studentId: "5",
        studentName: "Alex Johnson",
        studentEmail: "alex.johnson@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 88,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=AJ",
        requestedPosition: "Software Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a CS student with experience in React, Node.js, and system design. I'm looking for a Software Engineer role at Google and would appreciate your referral.",
        status: "approved",
        createdAt: "2024-12-07T11:30:00Z",
        alumniId: alumniId
      },
      {
        id: "5",
        studentId: "6",
        studentName: "Sophie Chen",
        studentEmail: "sophie.chen@university.edu",
        studentDepartment: "Design",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 82,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=SC",
        requestedPosition: "UX Designer",
        requestedCompany: "Google",
        message: "Hello Sarah, I'm a design student with strong UX/UI skills. I'm interested in the UX Designer position at Google and would love your referral.",
        status: "approved",
        createdAt: "2024-12-06T15:45:00Z",
        alumniId: alumniId
      },
      {
        id: "6",
        studentId: "7",
        studentName: "Robert Davis",
        studentEmail: "robert.davis@university.edu",
        studentDepartment: "Mechanical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 75,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=RD",
        requestedPosition: "Hardware Engineer",
        requestedCompany: "Google",
        message: "Hi Sarah, I'm a mechanical engineering student interested in hardware engineering. I have experience with CAD and prototyping.",
        status: "rejected",
        createdAt: "2024-12-05T13:20:00Z",
        alumniId: alumniId
      },
      {
        id: "7",
        studentId: "8",
        studentName: "David Kim",
        studentEmail: "david.kim@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 89,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=DK",
        requestedPosition: "Frontend Developer",
        requestedCompany: "Microsoft",
        message: "Hi Sarah, I'm a CS student specializing in frontend development with React and TypeScript. I'm looking for a Frontend Developer role at Microsoft and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-11T08:45:00Z",
        alumniId: alumniId
      },
      {
        id: "8",
        studentId: "9",
        studentName: "Lisa Wang",
        studentEmail: "lisa.wang@university.edu",
        studentDepartment: "Marketing",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 76,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=LW",
        requestedPosition: "Marketing Specialist",
        requestedCompany: "Apple",
        message: "Hello Sarah, I'm a marketing student with experience in digital marketing and brand management. I'm interested in the Marketing Specialist position at Apple and would love your referral.",
        status: "pending",
        createdAt: "2024-12-10T16:20:00Z",
        alumniId: alumniId
      },
      {
        id: "9",
        studentId: "10",
        studentName: "Michael Brown",
        studentEmail: "michael.brown@university.edu",
        studentDepartment: "Electrical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 81,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=MB",
        requestedPosition: "Electrical Engineer",
        requestedCompany: "Tesla",
        message: "Hi Sarah, I'm an electrical engineering student with a passion for renewable energy and electric vehicles. I'm looking for an Electrical Engineer role at Tesla and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-09T12:30:00Z",
        alumniId: alumniId
      },
      {
        id: "10",
        studentId: "11",
        studentName: "Jennifer Lee",
        studentEmail: "jennifer.lee@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "2nd Year",
        studentAtsScore: 94,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=JL",
        requestedPosition: "Data Analyst",
        requestedCompany: "Netflix",
        message: "Hello Sarah, I'm a data science student with strong analytical skills and experience with Python and SQL. I'm interested in the Data Analyst position at Netflix and would love your referral.",
        status: "approved",
        createdAt: "2024-12-08T14:15:00Z",
        alumniId: alumniId
      },
      {
        id: "11",
        studentId: "12",
        studentName: "Christopher Martinez",
        studentEmail: "christopher.martinez@university.edu",
        studentDepartment: "Mechanical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 73,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=CM",
        requestedPosition: "Mechanical Engineer",
        requestedCompany: "SpaceX",
        message: "Hi Sarah, I'm a mechanical engineering student with interest in aerospace and robotics. I'm looking for a Mechanical Engineer role at SpaceX and would appreciate your referral.",
        status: "rejected",
        createdAt: "2024-12-07T10:45:00Z",
        alumniId: alumniId
      },
      {
        id: "12",
        studentId: "13",
        studentName: "Rachel Green",
        studentEmail: "rachel.green@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 91,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=RG",
        requestedPosition: "Full Stack Developer",
        requestedCompany: "Meta",
        message: "Hi Sarah, I'm a CS student with strong experience in React, Node.js, and cloud technologies. I'm looking for a Full Stack Developer role at Meta and would love your referral. I've worked on several web applications and have a solid understanding of modern development practices.",
        status: "pending",
        createdAt: "2024-12-12T09:30:00Z",
        alumniId: alumniId
      },
      {
        id: "13",
        studentId: "14",
        studentName: "Kevin Patel",
        studentEmail: "kevin.patel@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 87,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=KP",
        requestedPosition: "Machine Learning Engineer",
        requestedCompany: "Amazon",
        message: "Hello Sarah, I'm a data science student passionate about machine learning and AI. I have experience with TensorFlow, PyTorch, and AWS. I'm looking for a Machine Learning Engineer role at Amazon and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-11T14:15:00Z",
        alumniId: alumniId
      },
      {
        id: "14",
        studentId: "15",
        studentName: "Amanda Foster",
        studentEmail: "amanda.foster@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 89,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=AF",
        requestedPosition: "Backend Engineer",
        requestedCompany: "Uber",
        message: "Hi Sarah, I'm a CS student with strong backend development skills in Java, Spring Boot, and microservices. I'm looking for a Backend Engineer role at Uber and would love your referral.",
        status: "pending",
        createdAt: "2024-12-13T11:20:00Z",
        alumniId: alumniId
      },
      {
        id: "15",
        studentId: "16",
        studentName: "Marcus Johnson",
        studentEmail: "marcus.johnson@university.edu",
        studentDepartment: "Electrical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 84,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=MJ",
        requestedPosition: "Hardware Engineer",
        requestedCompany: "Intel",
        message: "Hello Sarah, I'm an electrical engineering student with experience in VLSI design and semiconductor technology. I'm looking for a Hardware Engineer role at Intel and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-13T08:45:00Z",
        alumniId: alumniId
      },
      {
        id: "16",
        studentId: "17",
        studentName: "Sophia Rodriguez",
        studentEmail: "sophia.rodriguez@university.edu",
        studentDepartment: "Design",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 93,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=SR",
        requestedPosition: "Product Designer",
        requestedCompany: "Figma",
        message: "Hi Sarah, I'm a design student with strong UX/UI skills and experience with Figma, Sketch, and prototyping tools. I'm looking for a Product Designer role at Figma and would love your referral.",
        status: "pending",
        createdAt: "2024-12-12T16:30:00Z",
        alumniId: alumniId
      },
      {
        id: "17",
        studentId: "18",
        studentName: "Alex Thompson",
        studentEmail: "alex.thompson@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 88,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=AT",
        requestedPosition: "DevOps Engineer",
        requestedCompany: "GitHub",
        message: "Hello Sarah, I'm a CS student with experience in CI/CD, Docker, Kubernetes, and cloud platforms. I'm looking for a DevOps Engineer role at GitHub and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-12T13:10:00Z",
        alumniId: alumniId
      },
      {
        id: "18",
        studentId: "19",
        studentName: "Emma Wilson",
        studentEmail: "emma.wilson@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 90,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=EW",
        requestedPosition: "Data Scientist",
        requestedCompany: "Spotify",
        message: "Hi Sarah, I'm a data science student with strong analytical skills and experience in Python, SQL, and machine learning. I'm looking for a Data Scientist role at Spotify and would love your referral.",
        status: "pending",
        createdAt: "2024-12-11T10:25:00Z",
        alumniId: alumniId
      },
      {
        id: "19",
        studentId: "20",
        studentName: "Ryan Chen",
        studentEmail: "ryan.chen@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 85,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=RC",
        requestedPosition: "Mobile Developer",
        requestedCompany: "Snapchat",
        message: "Hello Sarah, I'm a CS student with experience in iOS and Android development using Swift, Kotlin, and React Native. I'm looking for a Mobile Developer role at Snapchat and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-10T15:40:00Z",
        alumniId: alumniId
      },
      {
        id: "20",
        studentId: "21",
        studentName: "Isabella Martinez",
        studentEmail: "isabella.martinez@university.edu",
        studentDepartment: "Business Administration",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 82,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=IM",
        requestedPosition: "Product Manager",
        requestedCompany: "Airbnb",
        message: "Hi Sarah, I'm a business student with experience in product strategy, user research, and agile methodologies. I'm looking for a Product Manager role at Airbnb and would love your referral.",
        status: "pending",
        createdAt: "2024-12-09T12:55:00Z",
        alumniId: alumniId
      },
      {
        id: "21",
        studentId: "22",
        studentName: "Daniel Kim",
        studentEmail: "daniel.kim@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 94,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=DK",
        requestedPosition: "Software Engineer",
        requestedCompany: "Netflix",
        message: "Hi Sarah, I'm a CS student with strong experience in distributed systems, Java, and microservices. I'm looking for a Software Engineer role at Netflix and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-14T09:15:00Z",
        alumniId: alumniId
      },
      {
        id: "22",
        studentId: "23",
        studentName: "Olivia Taylor",
        studentEmail: "olivia.taylor@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 89,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=OT",
        requestedPosition: "Research Scientist",
        requestedCompany: "OpenAI",
        message: "Hello Sarah, I'm a data science student passionate about AI research and machine learning. I have experience with PyTorch, transformers, and NLP. I'm looking for a Research Scientist role at OpenAI and would love your referral.",
        status: "pending",
        createdAt: "2024-12-14T14:30:00Z",
        alumniId: alumniId
      },
      {
        id: "23",
        studentId: "24",
        studentName: "Nathan Davis",
        studentEmail: "nathan.davis@university.edu",
        studentDepartment: "Mechanical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 86,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=ND",
        requestedPosition: "Robotics Engineer",
        requestedCompany: "Boston Dynamics",
        message: "Hi Sarah, I'm a mechanical engineering student with experience in robotics, control systems, and CAD design. I'm looking for a Robotics Engineer role at Boston Dynamics and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-13T16:45:00Z",
        alumniId: alumniId
      },
      {
        id: "24",
        studentId: "25",
        studentName: "Zoe Anderson",
        studentEmail: "zoe.anderson@university.edu",
        studentDepartment: "Design",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 91,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=ZA",
        requestedPosition: "UX Researcher",
        requestedCompany: "Adobe",
        message: "Hello Sarah, I'm a design student with strong UX research skills and experience in user testing, personas, and design thinking. I'm looking for a UX Researcher role at Adobe and would love your referral.",
        status: "pending",
        createdAt: "2024-12-12T11:20:00Z",
        alumniId: alumniId
      },
      {
        id: "25",
        studentId: "26",
        studentName: "Lucas Rodriguez",
        studentEmail: "lucas.rodriguez@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 88,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=LR",
        requestedPosition: "Game Developer",
        requestedCompany: "Epic Games",
        message: "Hi Sarah, I'm a CS student with experience in Unity, C#, and game development. I'm looking for a Game Developer role at Epic Games and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-11T13:55:00Z",
        alumniId: alumniId
      },
      {
        id: "26",
        studentId: "27",
        studentName: "Ava Thompson",
        studentEmail: "ava.thompson@university.edu",
        studentDepartment: "Electrical Engineering",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 83,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=AT",
        requestedPosition: "Power Systems Engineer",
        requestedCompany: "General Electric",
        message: "Hello Sarah, I'm an electrical engineering student with experience in power systems, renewable energy, and grid optimization. I'm looking for a Power Systems Engineer role at GE and would love your referral.",
        status: "pending",
        createdAt: "2024-12-10T10:10:00Z",
        alumniId: alumniId
      },
      {
        id: "27",
        studentId: "28",
        studentName: "Ethan Wilson",
        studentEmail: "ethan.wilson@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 92,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=EW",
        requestedPosition: "Security Engineer",
        requestedCompany: "CrowdStrike",
        message: "Hi Sarah, I'm a CS student with strong cybersecurity background and experience in penetration testing, network security, and threat analysis. I'm looking for a Security Engineer role at CrowdStrike and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-09T15:25:00Z",
        alumniId: alumniId
      },
      {
        id: "28",
        studentId: "29",
        studentName: "Mia Garcia",
        studentEmail: "mia.garcia@university.edu",
        studentDepartment: "Data Science",
        studentYearOfStudy: "3rd Year",
        studentAtsScore: 87,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=MG",
        requestedPosition: "Business Intelligence Analyst",
        requestedCompany: "Salesforce",
        message: "Hello Sarah, I'm a data science student with experience in SQL, Tableau, and business analytics. I'm looking for a BI Analyst role at Salesforce and would love your referral.",
        status: "pending",
        createdAt: "2024-12-08T14:40:00Z",
        alumniId: alumniId
      },
      {
        id: "29",
        studentId: "30",
        studentName: "Noah Brown",
        studentEmail: "noah.brown@university.edu",
        studentDepartment: "Computer Science",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 90,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=NB",
        requestedPosition: "Cloud Architect",
        requestedCompany: "Oracle",
        message: "Hi Sarah, I'm a CS student with experience in AWS, Azure, and cloud infrastructure design. I'm looking for a Cloud Architect role at Oracle and would appreciate your referral.",
        status: "pending",
        createdAt: "2024-12-07T12:15:00Z",
        alumniId: alumniId
      },
      {
        id: "30",
        studentId: "31",
        studentName: "Chloe Miller",
        studentEmail: "chloe.miller@university.edu",
        studentDepartment: "Business Administration",
        studentYearOfStudy: "Final Year",
        studentAtsScore: 85,
        studentAvatar: "/placeholder.svg?height=48&width=48&text=CM",
        requestedPosition: "Strategy Consultant",
        requestedCompany: "McKinsey & Company",
        message: "Hello Sarah, I'm a business student with strong analytical skills and experience in strategic planning and market analysis. I'm looking for a Strategy Consultant role at McKinsey and would love your referral.",
        status: "pending",
        createdAt: "2024-12-06T09:50:00Z",
        alumniId: alumniId
      }
    ]
    
    localStorage.setItem(`referralRequests_${alumniId}`, JSON.stringify(testReferrals))
    console.log(`Initialized ${testReferrals.length} test referrals for alumni ${alumniId}`)
  }

  static updateReferralRequestStatus(requestId: string, alumniId: string, status: "approved" | "rejected"): void {
    console.log("Updating referral status:", requestId, alumniId, status)
    // Only update localStorage in browser environment
    if (typeof window === 'undefined') {
      return
    }
    
    const requests = this.getReferralRequests(alumniId)
    
    const updatedRequests = requests.map(request => {
      if (String(request.id) === String(requestId)) {
        console.log("Updating request", request.id, "to", status)
        return { ...request, status }
      }
      return request
    })
    
    localStorage.setItem(`referralRequests_${alumniId}`, JSON.stringify(updatedRequests))
  }

  static getPendingReferralCount(alumniId: string): number {
    const requests = this.getReferralRequests(alumniId)
    return requests.filter(request => request.status === "pending").length
  }

  static getApprovedReferralCount(alumniId: string): number {
    const requests = this.getReferralRequests(alumniId)
    return requests.filter(request => request.status === "approved").length
  }

  // Comment Management
  static getComments(discussionId: number): Comment[] {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return []
    }

    const savedComments = localStorage.getItem(`comments_${discussionId}`)
    if (savedComments) {
      return JSON.parse(savedComments)
    }

    // Return empty array if no comments exist
    return []
  }

  static addComment(
    discussionId: number,
    content: string,
    userType: "student" | "alumni",
    currentUser?: Student | Alumni
  ): Comment {
    const user = currentUser || (userType === "student" ? studentsData[0] : alumniData[0])
    const comments = this.getComments(discussionId)
    
    const newComment: Comment = {
      id: `${discussionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      discussionId,
      author: user.name,
      authorRole: userType === "student" 
        ? `${(user as Student).yearOfStudy} Student` 
        : `${(user as Alumni).position} @ ${(user as Alumni).company}`,
      authorAvatar: `/placeholder.svg?height=40&width=40&text=${user.name.split(' ').map(n => n[0]).join('')}`,
      content,
      timeAgo: "Just now",
      likes: 0,
      isAlumni: userType === "alumni",
      createdAt: new Date().toISOString()
    }

    // Only save to localStorage in browser environment
    if (typeof window !== 'undefined') {
      const updatedComments = [...comments, newComment]
      localStorage.setItem(`comments_${discussionId}`, JSON.stringify(updatedComments))
    }

    return newComment
  }

  static likeComment(discussionId: number, commentId: string): void {
    // Only update localStorage in browser environment
    if (typeof window === 'undefined') {
      return
    }
    
    const comments = this.getComments(discussionId)
    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    )
    
    localStorage.setItem(`comments_${discussionId}`, JSON.stringify(updatedComments))
  }

  static getCommentCount(discussionId: number): number {
    return this.getComments(discussionId).length
  }
} 