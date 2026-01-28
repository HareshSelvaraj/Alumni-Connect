"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Home, MessageSquare, Inbox, Calendar, Settings, LogOut, Bell, Users } from "lucide-react"
import { StudentSearch } from "@/components/alumni/student-search"
import { alumniData } from "@/lib/data-service"

const navigationItems = [
  { href: "/alumni/dashboard", label: "Dashboard", icon: Home },
  { href: "/alumni/discussions", label: "Group Discussion", icon: MessageSquare },
  { href: "/alumni/referrals", label: "Referral Requests", icon: Inbox },
  { href: "/alumni/events", label: "Events", icon: Calendar },
  { href: "/alumni/community", label: "Community", icon: Users },
]

export function AlumniNavigation() {
  const pathname = usePathname()
  const [notifications] = useState(5)
  const [currentAlumni, setCurrentAlumni] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@google.com",
    position: "Senior Software Engineer",
    company: "Google"
  })

  // Load alumni data on client side only to avoid hydration issues
  useEffect(() => {
    if (alumniData.length > 0) {
      setCurrentAlumni(alumniData[0])
    }
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/alumni/dashboard" className="flex items-center space-x-2 hover-lift">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover-glow-purple">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-lg hidden sm:block gradient-text">PIXIL Alumni</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`flex items-center space-x-2 transition-all duration-300 hover-lift btn-glow ${
                        isActive
                          ? "bg-gray-100 text-gray-900 hover-glow-purple"
                          : "hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:block">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative hover-lift btn-glow">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-glow"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
                    <Avatar className="h-10 w-10 avatar-glow-purple status-online" key={currentAlumni.name}>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${currentAlumni.name.split(' ').map(n => n[0]).join('')}`} alt={currentAlumni.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {currentAlumni.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{currentAlumni.name}</p>
                      <p className="text-xs text-gray-500">{currentAlumni.email}</p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {currentAlumni.position} @ {currentAlumni.company}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="interactive-hover">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href="/">
                    <DropdownMenuItem className="interactive-hover">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="md:hidden border-t">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 hover-lift ${
                      isActive ? "text-purple-600 hover-glow-purple" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{item.label.split(" ")[0]}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Student Search Bar */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <StudentSearch />
        </div>
      </div>
    </>
  )
}
