"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Calendar,
  Activity,
  Clock,
  MapPin,
  Users,
  MessageSquare,
  Star,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: 'event' | 'activity' | 'referral' | 'message' | 'achievement'
  title: string
  description: string
  timestamp: Date
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  metadata?: {
    eventDate?: Date
    location?: string
    participants?: number
    points?: number
    senderName?: string
    senderPhoto?: string
  }
}

interface NotificationsDropdownProps {
  userType: 'student' | 'alumni'
  className?: string
}

export function NotificationsDropdown({ userType, className }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'event',
        title: 'Tech Talk: AI in Web Development',
        description: 'Join us for an insightful session on AI integration in modern web applications',
        timestamp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        isRead: false,
        priority: 'high',
        metadata: {
          eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          location: 'Main Auditorium',
          participants: 45
        }
      },
      {
        id: '2',
        type: 'activity',
        title: 'New Alumni Connection',
        description: 'Sarah Johnson from Google wants to connect with you',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isRead: false,
        priority: 'medium',
        metadata: {
          senderName: 'Sarah Johnson',
          senderPhoto: '/placeholder-user.jpg'
        }
      },
      {
        id: '3',
        type: 'referral',
        title: 'Referral Request Approved',
        description: 'Your referral for Software Engineer position at Microsoft has been approved',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true,
        priority: 'high',
        metadata: {
          points: 50
        }
      },
      {
        id: '4',
        type: 'message',
        title: 'New Message from Mentor',
        description: 'John Smith sent you a message about your project proposal',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        isRead: false,
        priority: 'medium',
        metadata: {
          senderName: 'John Smith',
          senderPhoto: '/placeholder-user.jpg'
        }
      },
      {
        id: '5',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        description: 'You\'ve earned the "Active Mentor" badge for helping 10+ students',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        isRead: true,
        priority: 'low',
        metadata: {
          points: 25
        }
      }
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4" />
      case 'activity':
        return <Activity className="h-4 w-4" />
      case 'referral':
        return <Users className="h-4 w-4" />
      case 'message':
        return <MessageSquare className="h-4 w-4" />
      case 'achievement':
        return <Star className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
    const notification = notifications.find(n => n.id === notificationId)
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  const upcomingEvents = notifications
    .filter(n => n.type === 'event' && n.metadata?.eventDate && n.metadata.eventDate > new Date())
    .slice(0, 5)

  const recentActivity = notifications
    .filter(n => n.type !== 'event')
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("relative", className)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 max-h-96 overflow-y-auto"
        sideOffset={5}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Upcoming Events Section */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
              </h4>
              <div className="space-y-2">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                        !event.isRead && "bg-blue-50 border-blue-200"
                      )}
                      onClick={() => markAsRead(event.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getNotificationIcon(event.type)}
                            <span className="font-medium text-sm truncate">
                              {event.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.metadata?.eventDate?.toLocaleDateString()}
                            </div>
                            {event.metadata?.location && (
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.metadata.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(event.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming events
                  </p>
                )}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Recent Activity
              </h4>
              <div className="space-y-2">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                        !activity.isRead && "bg-blue-50 border-blue-200"
                      )}
                      onClick={() => markAsRead(activity.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {activity.metadata?.senderPhoto ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={activity.metadata.senderPhoto} />
                              <AvatarFallback className="text-xs">
                                {activity.metadata.senderName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              {getNotificationIcon(activity.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm truncate">
                                {activity.title}
                              </span>
                              {!activity.isRead && (
                                <div className={cn("h-2 w-2 rounded-full", getPriorityColor(activity.priority))} />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(activity.timestamp)}
                              </span>
                              {activity.metadata?.points && (
                                <Badge variant="secondary" className="text-xs">
                                  +{activity.metadata.points} pts
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(activity.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent activity
                  </p>
                )}
              </div>
            </div>

            {/* View All Link */}
            <div className="pt-2 border-t">
              <Button variant="ghost" className="w-full text-sm" asChild>
                <a href="/notifications">
                  View All Notifications
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
