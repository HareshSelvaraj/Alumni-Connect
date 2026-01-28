"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
  ThumbsUp, 
  MessageCircle, 
  Clock, 
  Users, 
  Pin, 
  Star, 
  Send,
  X,
  TrendingUp,
  Award
} from "lucide-react"
import { Discussion, Comment, alumniData, studentsData, DataService } from "@/lib/data-service"
import { useUser } from "@/contexts/user-context"

interface Reply {
  id: string
  author: string
  authorRole: string
  authorAvatar: string
  content: string
  timeAgo: string
  likes: number
  isAlumni: boolean
}

interface DiscussionPopupProps {
  isOpen: boolean
  onClose: () => void
  discussion: Discussion | null
  userType: "student" | "alumni"
}

export function DiscussionPopup({ isOpen, onClose, discussion, userType }: DiscussionPopupProps) {
  const { user } = useUser()
  const [replies, setReplies] = useState<Reply[]>([])
  const [newReply, setNewReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments from localStorage when discussion changes
  useEffect(() => {
    if (discussion) {
      const loadComments = () => {
        const comments = DataService.getComments(discussion.id)
        setReplies(comments)
      }
      
      loadComments()
      
      // Listen for storage changes to sync across tabs
      const handleStorageChange = (e) => {
        if (e.key === `comments_${discussion.id}`) {
          loadComments()
        }
      }
      
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [discussion])

  const handleSubmitReply = async () => {
    if (!newReply.trim() || !discussion) return

    setIsSubmitting(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Add comment to localStorage
    const newComment = DataService.addComment(
      discussion.id,
      newReply,
      userType,
      user
    )

    // Update discussion reply count
    DataService.updateDiscussionReplyCount(discussion.id, userType)

    // Refresh comments from localStorage
    const updatedComments = DataService.getComments(discussion.id)
    setReplies(updatedComments)
    
    setNewReply("")
    setIsSubmitting(false)
  }

  const handleLikeReply = (replyId: string) => {
    if (!discussion) return
    
    // Update like in localStorage
    DataService.likeComment(discussion.id, replyId)
    
    // Refresh comments from localStorage
    const updatedComments = DataService.getComments(discussion.id)
    setReplies(updatedComments)
  }

  if (!discussion) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {discussion.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Discussion */}
          <Card className="border-2 border-blue-100 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {discussion.author.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {discussion.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                    {discussion.isHot && (
                      <Badge variant="destructive" className="text-xs">
                        🔥 Hot
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {discussion.category}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm font-medium">{discussion.author}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{discussion.authorRole}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{discussion.preview}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {discussion.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{replies.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{discussion.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Replies ({replies.length})</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Active participants:</span>
                <div className="flex -space-x-2">
                  {replies.slice(0, 5).map((reply, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                      <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {reply.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply Input */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Replying as:</span>
                      <span className="font-medium">
                        {userType === "student" ? studentsData[0]?.name : alumniData[0]?.name}
                      </span>
                    </div>
                    <Button 
                      onClick={handleSubmitReply}
                      disabled={!newReply.trim() || isSubmitting}
                      className="hover-lift btn-glow"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Reply
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies List */}
            <div className="space-y-4">
              {replies.map((reply) => (
                <Card key={reply.id} className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {reply.author.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium">{reply.author}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{reply.authorRole}</span>
                          {reply.isAlumni && (
                            <>
                              <span className="text-xs text-gray-500">•</span>
                              <Badge variant="outline" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Alumni
                              </Badge>
                            </>
                          )}
                          <span className="text-xs text-gray-500">•</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">{reply.content}</p>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLikeReply(reply.id)}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 