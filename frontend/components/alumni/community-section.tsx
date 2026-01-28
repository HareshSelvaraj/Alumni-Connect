"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Image,
  Heart,
  MessageSquare,
  Share,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Building,
  Calendar,
  Upload,
  X,
} from "lucide-react"

interface DepartmentHead {
  id: string
  name: string
  photo?: string
  position: string
  department: string
}

interface AlumniMember {
  id: string
  name: string
  photo?: string
  currentRole: string
  company: string
  batch: string
  referralPoints: number
  location: string
}

interface GalleryPost {
  id: string
  author: {
    name: string
    photo?: string
    batch: string
  }
  images: string[]
  caption: string
  hashtags: string[]
  likes: number
  comments: number
  shares: number
  createdAt: Date
  department: string
}

export function CommunitySection() {
  const [activeTab, setActiveTab] = useState("department")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    caption: "",
    hashtags: "",
    department: "Computer Science",
    images: [] as File[]
  })

  // Mock data
  const departments = ["Computer Science", "Data Science", "Engineering", "Business", "Design"]
  
  const departmentHeads: DepartmentHead[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      photo: "/placeholder-user.jpg",
      position: "Head of Department",
      department: "Computer Science"
    },
    {
      id: "2",
      name: "Prof. Michael Rodriguez",
      photo: "/placeholder-user.jpg",
      position: "Department Head",
      department: "Data Science"
    }
  ]

  const alumniMembers: AlumniMember[] = [
    {
      id: "1",
      name: "Alex Thompson",
      photo: "/placeholder-user.jpg",
      currentRole: "Senior Software Engineer",
      company: "Google",
      batch: "2020",
      referralPoints: 150,
      location: "San Francisco, CA"
    },
    {
      id: "2",
      name: "Maria Garcia",
      photo: "/placeholder-user.jpg",
      currentRole: "Product Manager",
      company: "Microsoft",
      batch: "2019",
      referralPoints: 200,
      location: "Seattle, WA"
    },
    {
      id: "3",
      name: "David Kim",
      photo: "/placeholder-user.jpg",
      currentRole: "Data Scientist",
      company: "Netflix",
      batch: "2021",
      referralPoints: 120,
      location: "Los Gatos, CA"
    }
  ]

  const galleryPosts: GalleryPost[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        photo: "/placeholder-user.jpg",
        batch: "2020"
      },
      images: ["/placeholder.jpg", "/placeholder.jpg"],
      caption: "Amazing memories from our graduation ceremony! So proud of how far we've all come. #Graduation2020 #CSAlumni #Proud",
      hashtags: ["#Graduation2020", "#CSAlumni", "#Proud"],
      likes: 45,
      comments: 12,
      shares: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      department: "Computer Science"
    },
    {
      id: "2",
      author: {
        name: "Michael Chen",
        photo: "/placeholder-user.jpg",
        batch: "2019"
      },
      images: ["/placeholder.jpg"],
      caption: "Back on campus for the annual tech conference. The new computer lab looks incredible! #TechConference #CampusVisit #Innovation",
      hashtags: ["#TechConference", "#CampusVisit", "#Innovation"],
      likes: 32,
      comments: 7,
      shares: 5,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      department: "Computer Science"
    }
  ]

  const filteredAlumni = alumniMembers.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || alumni.currentRole.includes(selectedDepartment)
    return matchesSearch && matchesDepartment
  })

  const filteredPosts = galleryPosts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = selectedDepartment === "all" || post.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setNewPost(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setNewPost(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const handlePostSubmit = () => {
    // In a real app, this would upload to a server
    console.log("Creating new post:", newPost)
    setNewPost({ caption: "", hashtags: "", department: "Computer Science", images: [] })
    setIsUploadModalOpen(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community</h2>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Share Memory
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share a Memory</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Share your memory..."
                  value={newPost.caption}
                  onChange={(e) => setNewPost(prev => ({ ...prev, caption: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  placeholder="#Graduation2020 #CSAlumni"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, hashtags: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  className="w-full p-2 border rounded-md"
                  value={newPost.department}
                  onChange={(e) => setNewPost(prev => ({ ...prev, department: e.target.value }))}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload photos</p>
                    </div>
                  </label>
                </div>
                {newPost.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {newPost.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePostSubmit}>
                  Share Memory
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="department">Department View</TabsTrigger>
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Department Heads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Department Heads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departmentHeads.map((head) => (
                  <div key={head.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={head.photo} />
                      <AvatarFallback>{getInitials(head.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{head.name}</h4>
                      <p className="text-sm text-muted-foreground">{head.position}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {head.department}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alumni Members by Batch */}
          <Card>
            <CardHeader>
              <CardTitle>Alumni Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["2021", "2020", "2019"].map((batch) => {
                  const batchAlumni = filteredAlumni.filter(alumni => alumni.batch === batch)
                  if (batchAlumni.length === 0) return null
                  
                  return (
                    <div key={batch}>
                      <h4 className="font-semibold mb-3 text-lg">Batch {batch}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {batchAlumni.map((alumni) => (
                          <div key={alumni.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={alumni.photo} />
                                <AvatarFallback className="text-xs">
                                  {getInitials(alumni.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium truncate">{alumni.name}</h5>
                                <p className="text-sm text-muted-foreground truncate">
                                  {alumni.currentRole}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {alumni.company}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {alumni.referralPoints} pts
                                  </Badge>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {alumni.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts and hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Gallery Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={post.images[0]}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  {post.images.length > 1 && (
                    <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                      +{post.images.length - 1}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.photo} />
                      <AvatarFallback className="text-xs">
                        {getInitials(post.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">Batch {post.author.batch}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3 line-clamp-3">{post.caption}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </div>
                      <div className="flex items-center">
                        <Share className="h-4 w-4 mr-1" />
                        {post.shares}
                      </div>
                    </div>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
