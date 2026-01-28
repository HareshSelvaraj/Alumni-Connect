"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Upload,
  FileText,
  Download,
  X,
  Check,
  AlertCircle,
  Star,
  Target,
  TrendingUp,
  Eye,
  Edit,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ResumeUploadProps {
  currentResume?: {
    fileName: string
    uploadDate: string
    atsScore: number
    url: string
  }
  onResumeUpdate: (resume: any) => void
  className?: string
}

export function ResumeUpload({ 
  currentResume, 
  onResumeUpdate, 
  className = "" 
}: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a PDF, DOC, or DOCX file"
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }

    return null
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Validate file
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        setIsUploading(false)
        return
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Simulate ATS analysis
      setIsAnalyzing(true)
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Mock analysis result
      const mockAnalysis = {
        atsScore: Math.floor(Math.random() * 30) + 70, // 70-100
        keywordMatches: [
          { keyword: "JavaScript", count: 3, importance: "high" },
          { keyword: "React", count: 2, importance: "high" },
          { keyword: "Node.js", count: 1, importance: "medium" },
          { keyword: "Python", count: 2, importance: "medium" },
          { keyword: "Problem Solving", count: 1, importance: "high" },
        ],
        suggestions: [
          "Add more technical skills relevant to your target roles",
          "Include quantifiable achievements in your experience section",
          "Consider adding a projects section to showcase your work",
          "Use action verbs to start each bullet point",
          "Include relevant certifications or courses"
        ],
        strengths: [
          "Clear contact information",
          "Well-formatted layout",
          "Relevant education section",
          "Good use of action verbs"
        ],
        weaknesses: [
          "Limited technical skills listed",
          "Missing quantifiable achievements",
          "No projects section",
          "Could benefit from more keywords"
        ]
      }

      setAnalysisResult(mockAnalysis)

      // Update resume data
      const resumeData = {
        fileName: file.name,
        uploadDate: new Date().toLocaleDateString(),
        atsScore: mockAnalysis.atsScore,
        url: URL.createObjectURL(file) // In real app, this would be the server URL
      }

      onResumeUpdate(resumeData)
      setIsUploading(false)
      setIsAnalyzing(false)
      setIsDialogOpen(false)

    } catch (err) {
      setError("Failed to upload and analyze resume")
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {currentResume ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Current Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">{currentResume.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded: {currentResume.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={currentResume.url} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Replace
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">ATS Score</p>
                <Badge className={getScoreBadgeColor(currentResume.atsScore)}>
                  {currentResume.atsScore}%
                </Badge>
              </div>
              <Progress value={currentResume.atsScore} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Your resume matches {currentResume.atsScore}% of common job requirements.
                {currentResume.atsScore < 80 && " Consider optimizing for better results."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No resume uploaded</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Upload your resume</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
                <Button onClick={handleUploadClick} disabled={isUploading || isAnalyzing}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {isAnalyzing && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                <span>Analyzing resume for ATS optimization...</span>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {analysisResult && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Analysis Complete!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your resume has been uploaded and analyzed successfully.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      ATS Score
                    </h4>
                    <div className="text-2xl font-bold mb-2">
                      <span className={getScoreColor(analysisResult.atsScore)}>
                        {analysisResult.atsScore}%
                      </span>
                    </div>
                    <Progress value={analysisResult.atsScore} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Keyword Matches
                    </h4>
                    <div className="space-y-1">
                      {analysisResult.keywordMatches.slice(0, 3).map((match: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{match.keyword}</span>
                          <Badge variant="secondary" className="text-xs">
                            {match.count}x
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Optimization Suggestions</h4>
                  <ul className="space-y-1 text-sm">
                    {analysisResult.suggestions.slice(0, 3).map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-muted-foreground mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

