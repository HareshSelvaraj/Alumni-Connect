"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, ThumbsUp, MessageCircle, Clock, TrendingUp, Users, Search, Pin, Star, Award } from "lucide-react"
import { DataService } from "@/lib/data-service"
import { DiscussionPopup } from "@/components/discussion-popup"
import { useUser } from "@/contexts/user-context"



const getCategories = (discussions) => {
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

export default function AlumniDiscussions() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  })
  const [discussions, setDiscussions] = useState([])
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [isDiscussionPopupOpen, setIsDiscussionPopupOpen] = useState(false)

  // Load discussions from localStorage on mount
  useEffect(() => {
    const loadDiscussions = () => {
      const discussionsData = DataService.getAlumniDiscussions()
      setDiscussions(discussionsData)
    }
    
    loadDiscussions()
    
    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e) => {
      if (e.key === "alumniDiscussions") {
        loadDiscussions()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  // Calculate categories based on current discussions
  const categories = getCategories(discussions)

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.category || !newDiscussion.content) {
      alert("Please fill in all required fields")
      return
    }

    const tags = newDiscussion.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    
    const createdDiscussion = DataService.createDiscussion(
      newDiscussion.title,
      newDiscussion.category,
      newDiscussion.content,
      tags,
      "alumni",
      user
    )

    // Refresh discussions from localStorage to get the updated list
    const updatedDiscussions = DataService.getAlumniDiscussions()
    setDiscussions(updatedDiscussions)
    
    setIsCreateDialogOpen(false)
    setNewDiscussion({ title: "", category: "", content: "", tags: "" })
  }

  const handleViewDiscussion = (discussion) => {
    setSelectedDiscussion(discussion)
    setIsDiscussionPopupOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Alumni Discussions</h1>
          <p className="text-gray-600">Share insights, mentor students, and connect with fellow alumni</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-lift btn-glow">
              <Plus className="mr-2 h-4 w-4" />
              Start Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>Share your expertise and insights with the community.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Discussion Title</Label>
                <Input
                  id="title"
                  placeholder="What would you like to discuss?"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newDiscussion.category}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat.name !== "All").map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                  <option value="Mentorship">Mentorship</option>
                  <option value="Technology">Technology</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Career Growth">Career Growth</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Industry Trends">Industry Trends</option>
                  <option value="Team Building">Team Building</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Share your insights, experiences, or questions..."
                  rows={4}
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., mentorship, career, leadership"
                  value={newDiscussion.tags}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateDiscussion} className="w-full hover-lift btn-glow">
                Create Discussion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Search */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Search Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 ${
                        selectedCategory === category.name
                          ? "bg-purple-50 text-purple-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Impact */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Discussions Started</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Helpful Replies</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Likes</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mentorship Score</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-purple-600">4.9</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="yours">Your Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover-lift hover-glow-purple border-0 shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 avatar-glow-purple">
                        <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {discussion.isPinned && <Pin className="h-4 w-4 text-purple-600" />}
                            {discussion.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                🔥 Hot
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.timeAgo}</span>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors">
                          {discussion.title}
                        </h3>

                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm font-medium">{discussion.author}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{discussion.authorRole}</span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{discussion.preview}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1 hover:text-purple-600 cursor-pointer">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-purple-600 cursor-pointer">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{discussion.views}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover-lift"
                            onClick={() => handleViewDiscussion(discussion)}
                          >
                            Join Discussion
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              {filteredDiscussions
                .filter((d) => d.isHot)
                .map((discussion) => (
                  <Card key={discussion.id} className="hover-lift hover-glow-purple border-0 shadow-lg cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12 avatar-glow-purple">
                          <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} alt={discussion.author} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-orange-500" />
                              <Badge variant="destructive" className="text-xs">
                                🔥 Trending
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {discussion.category}
                              </Badge>
                            </div>
                          </div>

                          <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors">
                            {discussion.title}
                          </h3>

                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-medium">{discussion.author}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{discussion.authorRole}</span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{discussion.preview}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{discussion.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{discussion.views}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover-lift"
                              onClick={() => handleViewDiscussion(discussion)}
                            >
                              Join Discussion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="yours" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Share Your Expertise</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Start discussions to share your professional insights and help guide the next generation.
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="hover-lift btn-glow">
                    Create Your First Discussion
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Discussion Popup */}
      <DiscussionPopup
        isOpen={isDiscussionPopupOpen}
        onClose={() => setIsDiscussionPopupOpen(false)}
        discussion={selectedDiscussion}
        userType="alumni"
      />
    </div>
  )
}
