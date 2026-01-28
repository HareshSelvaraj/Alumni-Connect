"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProfilePhotoUploadProps {
  currentPhoto?: string
  userName: string
  onPhotoChange: (photoUrl: string) => void
  className?: string
}

export function ProfilePhotoUpload({ 
  currentPhoto, 
  userName, 
  onPhotoChange, 
  className = "" 
}: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a JPG or PNG image"
    }

    // Check file size (2MB max)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 2MB"
    }

    // Check dimensions (minimum 150x150)
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        if (img.width < 150 || img.height < 150) {
          resolve("Image must be at least 150x150 pixels")
        } else {
          resolve(null)
        }
      }
      img.onerror = () => resolve("Invalid image file")
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setIsUploading(true)

    try {
      // Validate file
      const validationError = await validateFile(file)
      if (validationError) {
        setError(validationError)
        setIsUploading(false)
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        onPhotoChange(result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)

      // In a real app, you would upload to a server here
      // For now, we'll just use the local preview
      
    } catch (err) {
      setError("Failed to process image")
      setIsUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setPreview(null)
    onPhotoChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={preview || ""} alt={userName} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Profile Photo</h3>
          <div className="flex space-x-2">
            <Button
              onClick={handleUploadClick}
              disabled={isUploading}
              size="sm"
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              {preview ? "Change Photo" : "Upload Photo"}
            </Button>
            {preview && (
              <Button
                onClick={handleRemovePhoto}
                disabled={isUploading}
                size="sm"
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-muted-foreground">
        <p>• Minimum size: 150×150 pixels</p>
        <p>• Supported formats: JPG, PNG</p>
        <p>• Maximum file size: 2MB</p>
      </div>
    </div>
  )
}
