"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Target,
  Zap,
  Download,
  RefreshCw,
} from "lucide-react"

const mockAnalysis = {
  overallScore: 85,
  breakdown: {
    formatting: 22, // /25
    keywords: 20, // /25
    structure: 21, // /25
    presentation: 22, // /25
  },
  suggestions: [
    {
      type: "critical",
      title: "Add more industry keywords",
      description: "Include keywords like 'React', 'Node.js', 'API development' to improve ATS matching",
      impact: "High",
    },
    {
      type: "warning",
      title: "Quantify achievements",
      description: "Add specific numbers and metrics to your accomplishments (e.g., 'Improved performance by 40%')",
      impact: "Medium",
    },
    {
      type: "info",
      title: "Optimize section order",
      description: "Consider moving your 'Projects' section above 'Education' to highlight technical experience",
      impact: "Low",
    },
  ],
  keywords: {
    found: ["JavaScript", "Python", "Git", "Agile", "Problem Solving"],
    missing: ["React", "Node.js", "API", "Database", "Cloud"],
    density: 2.3,
  },
}

export default function ResumeChecker() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [analysisDate, setAnalysisDate] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      const code = `ATS-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`
      setVerificationId(code)
      setAnalysisDate(new Date().toLocaleDateString())
    }, 3000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 70) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Resume ATS Score Checker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get your resume analyzed by our AI-powered ATS system and receive personalized recommendations to improve your
          job application success rate.
        </p>
      </div>

      {!showResults ? (
        <div className="max-w-2xl mx-auto">
          {/* Upload Section */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <FileText className="h-6 w-6" />
                <span>Upload Your Resume</span>
              </CardTitle>
              <CardDescription>Upload your resume in PDF, DOC, or DOCX format for instant ATS analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop your resume here</h3>
                  <p className="text-gray-500 mb-4">or click to browse files</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <Button className="hover-lift btn-glow cursor-pointer">Choose File</Button>
                  </label>
                  <p className="text-xs text-gray-400 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              ) : isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium mb-2">Analyzing Your Resume</h3>
                  <p className="text-gray-500 mb-4">Our AI is scanning your resume for ATS compatibility...</p>
                  <div className="max-w-md mx-auto">
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-gray-400 mt-2">This usually takes 30-60 seconds</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Successful</h3>
                  <p className="text-gray-500 mb-4">{uploadedFile.name} has been uploaded and analyzed</p>
                  <Button onClick={() => setShowResults(true)} className="hover-lift btn-glow">
                    View Results
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-lift hover-glow border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">ATS Optimization</h3>
                <p className="text-sm text-gray-600">
                  Get scored on how well your resume passes through Applicant Tracking Systems
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Instant Analysis</h3>
                <p className="text-sm text-gray-600">
                  Receive detailed feedback and suggestions within seconds of upload
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Improvement Tips</h3>
                <p className="text-sm text-gray-600">
                  Get actionable recommendations to boost your resume's effectiveness
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Overall Score */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="relative text-center">
                <div className="absolute right-6 -top-4 rotate-6 select-none">
                  <div className="inline-flex flex-col items-center border-2 border-green-600 text-green-700 px-4 py-2 rounded-md opacity-90">
                    <span className="text-xs tracking-widest">ATS VERIFIED</span>
                    <span className="text-lg font-bold">{mockAnalysis.overallScore}/100</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${getScoreBackground(mockAnalysis.overallScore)} ${getScoreColor(mockAnalysis.overallScore)}`}
                  >
                    {mockAnalysis.overallScore}
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold mb-2">ATS Compatibility Score</h2>
                    <p className="text-gray-600">
                      Your resume has a {mockAnalysis.overallScore}% chance of passing through ATS systems
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Verification #: {verificationId || "—"} • Date: {analysisDate || "—"} • PIXIL</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="hover-lift bg-transparent" onClick={() => { setShowResults(false); setUploadedFile(null) }}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Analyze Again
                  </Button>
                  <Button className="hover-lift btn-glow" onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="breakdown" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {([
                  { key: "formatting", label: "Formatting", score: mockAnalysis.breakdown.formatting * 4 },
                  { key: "keywords", label: "Keyword Optimization", score: mockAnalysis.breakdown.keywords * 4 },
                  { key: "structure", label: "Content Structure", score: mockAnalysis.breakdown.structure * 4 },
                  { key: "presentation", label: "Professional Presentation", score: mockAnalysis.breakdown.presentation * 4 },
                ] as { key: string; label: string; score: number }[]).map(item => (
                  <Card key={item.key} className="hover-lift hover-glow border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{item.label}</h3>
                        <Badge variant="secondary">{Math.round(item.score)}/100</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Weight</span>
                          <span>25%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              {mockAnalysis.suggestions.map((suggestion, index) => (
                <Alert key={index} className="border-0 shadow-lg">
                  <div className="flex items-start space-x-3">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.impact} Impact
                        </Badge>
                      </div>
                      <AlertDescription className="text-gray-600">{suggestion.description}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Found Keywords</span>
                    </CardTitle>
                    <CardDescription>Keywords that were detected in your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysis.keywords.found.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Missing Keywords</span>
                    </CardTitle>
                    <CardDescription>Important keywords that could improve your ATS score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysis.keywords.missing.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="border-red-200 text-red-600">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Keyword Density</CardTitle>
                  <CardDescription>
                    Current keyword density: {mockAnalysis.keywords.density}% (Recommended: 2-4%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={(mockAnalysis.keywords.density / 4) * 100} className="h-3" />
                  <p className="text-sm text-gray-500 mt-2">
                    Your keyword density is within the optimal range for ATS systems.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
