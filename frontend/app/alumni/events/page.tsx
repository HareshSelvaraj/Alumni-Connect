"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Calendar,
  Plus,
  MapPin,
  Clock,
  Users,
  Video,
  Building,
  Star,
  Filter,
  Search,
  UserPlus,
  Settings,
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Tech Career Fair 2024",
    description:
      "Annual career fair connecting students with top tech companies. Network with recruiters and learn about exciting opportunities.",
    date: "2024-12-15",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    type: "career-fair",
    organizer: "Sarah Johnson",
    organizerRole: "Senior SWE @ Google",
    organizerAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    attendees: 150,
    maxAttendees: 200,
    isHosting: true,
    status: "upcoming",
    tags: ["career", "networking", "tech"],
  },
  {
    id: 2,
    title: "Alumni Networking Mixer",
    description:
      "Casual networking event for CS alumni. Share experiences, discuss industry trends, and build lasting connections.",
    date: "2024-12-18",
    time: "6:00 PM - 9:00 PM",
    location: "Downtown Conference Center",
    type: "networking",
    organizer: "Michael Chen",
    organizerRole: "Product Manager @ Microsoft",
    organizerAvatar: "/placeholder.svg?height=40&width=40&text=MC",
    attendees: 45,
    maxAttendees: 60,
    isHosting: false,
    status: "upcoming",
    tags: ["networking", "alumni", "social"],
  },
  {
    id: 3,
    title: "Resume & Interview Workshop",
    description:
      "Interactive workshop covering resume optimization, interview preparation, and salary negotiation strategies.",
    date: "2024-12-20",
    time: "2:00 PM - 5:00 PM",
    location: "University Campus - Room 301",
    type: "workshop",
    organizer: "Emily Rodriguez",
    organizerRole: "Engineering Manager @ Meta",
    organizerAvatar: "/placeholder.svg?height=40&width=40&text=ER",
    attendees: 30,
    maxAttendees: 40,
    isHosting: false,
    status: "upcoming",
    tags: ["workshop", "career", "skills"],
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    description:
      "Student entrepreneurs present their startup ideas to a panel of alumni investors and industry experts.",
    date: "2024-12-22",
    time: "7:00 PM - 10:00 PM",
    location: "Innovation Hub",
    type: "pitch",
    organizer: "James Wilson",
    organizerRole: "VP Engineering @ Stripe",
    organizerAvatar: "/placeholder.svg?height=40&width=40&text=JW",
    attendees: 25,
    maxAttendees: 50,
    isHosting: false,
    status: "upcoming",
    tags: ["startup", "entrepreneurship", "pitch"],
  },
]

const pastEvents = [
  {
    id: 5,
    title: "AI/ML Industry Panel",
    description:
      "Panel discussion with AI/ML experts from leading tech companies discussing industry trends and career paths.",
    date: "2024-11-15",
    time: "3:00 PM - 5:00 PM",
    location: "Virtual Event",
    type: "panel",
    organizer: "Sarah Johnson",
    organizerRole: "Senior SWE @ Google",
    organizerAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    attendees: 120,
    maxAttendees: 150,
    isHosting: true,
    status: "completed",
    rating: 4.8,
    feedback: "Excellent insights into the AI industry!",
  },
]

export default function AlumniEvents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "",
    maxAttendees: "",
  })

  const handleCreateEvent = () => {
    console.log("Creating event:", newEvent)
    setIsCreateDialogOpen(false)
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "",
      maxAttendees: "",
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "career-fair":
        return "bg-blue-100 text-blue-800"
      case "networking":
        return "bg-green-100 text-green-800"
      case "workshop":
        return "bg-purple-100 text-purple-800"
      case "pitch":
        return "bg-orange-100 text-orange-800"
      case "panel":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "career-fair":
        return <Building className="h-4 w-4" />
      case "networking":
        return <Users className="h-4 w-4" />
      case "workshop":
        return <Settings className="h-4 w-4" />
      case "pitch":
        return <Star className="h-4 w-4" />
      case "panel":
        return <Video className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Events & Networking</h1>
          <p className="text-gray-600">Organize events, attend networking sessions, and build meaningful connections</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-lift btn-glow">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Organize an event to connect with students and fellow alumni.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="e.g., Tech Career Fair, Networking Mixer"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe your event, its purpose, and what attendees can expect..."
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    placeholder="e.g., 2:00 PM - 5:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  placeholder="e.g., Virtual Event, Campus Center, Downtown"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Input
                    id="event-type"
                    placeholder="e.g., networking, workshop"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-attendees">Max Attendees</Label>
                  <Input
                    id="max-attendees"
                    type="number"
                    placeholder="50"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleCreateEvent} className="w-full hover-lift btn-glow">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events by title, type, or organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="hover-lift bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover-lift hover-glow-purple border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getEventTypeIcon(event.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getEventTypeColor(event.type)}>{event.type.replace("-", " ")}</Badge>
                          {event.isHosting && (
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              Hosting
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-8 w-8 avatar-glow-purple">
                          <AvatarImage src={event.organizerAvatar || "/placeholder.svg"} alt={event.organizer} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            {event.organizer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{event.organizer}</p>
                          <p className="text-xs text-gray-500">{event.organizerRole}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {event.attendees}/{event.maxAttendees} attending
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {event.isHosting ? (
                            <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                              <Settings className="mr-1 h-3 w-3" />
                              Manage
                            </Button>
                          ) : (
                            <Button size="sm" className="hover-lift btn-glow">
                              <UserPlus className="mr-1 h-3 w-3" />
                              Join Event
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hosting" className="space-y-6">
          <div className="grid gap-6">
            {events
              .filter((event) => event.isHosting)
              .map((event) => (
                <Card
                  key={event.id}
                  className="hover-lift hover-glow-purple border-0 shadow-lg border-l-4 border-l-purple-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getEventTypeIcon(event.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">You're Hosting</Badge>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>
                                {event.attendees}/{event.maxAttendees} registered
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                              View Attendees
                            </Button>
                            <Button size="sm" className="hover-lift btn-glow">
                              <Settings className="mr-1 h-3 w-3" />
                              Manage Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="grid gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="hover-lift hover-glow border-0 shadow-lg opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getEventTypeIcon(event.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-gray-600">
                          Completed
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} attended</span>
                          </div>
                          {event.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{event.rating}/5.0</span>
                            </div>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                          View Summary
                        </Button>
                      </div>

                      {event.feedback && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 italic">"{event.feedback}"</p>
                        </div>
                      )}
                    </div>
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
