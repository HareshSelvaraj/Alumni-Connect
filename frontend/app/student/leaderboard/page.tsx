"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Crown,
  Zap,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { studentsData } from "@/lib/data-service"

// Convert students data to leaderboard format
const leaderboardData = studentsData.map((student, index) => ({
  rank: index + 1,
  name: student.name,
  avatar: `/placeholder.svg?height=40&width=40&text=${student.name.split(' ').map(n => n[0]).join('')}`,
  department: student.department,
    batch: "2024",
  points: student.points,
  change: index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "same",
  changeValue: index % 3 === 0 ? (index % 3) + 1 : index % 3 === 1 ? (index % 2) + 1 : 0,
  badges: index === 0 ? ["Top Contributor", "Discussion Leader"] : 
          index === 1 ? ["Rising Star", "Tech Expert"] :
          index === 2 ? ["Networking Pro"] :
          index === 3 ? ["Creative Mind", "Mentor"] :
          index === 4 ? ["Problem Solver"] :
          index === 5 ? ["Community Builder"] :
          ["Analyst"],
    activities: {
    discussions: (index * 3) + 15,
    connections: student.connections,
    referrals: (index % 3) + 1,
    },
}))

// Use first student as current user
const currentUser = {
  rank: 1,
  name: studentsData[0].name,
  avatar: `/placeholder.svg?height=40&width=40&text=${studentsData[0].name.split(' ').map(n => n[0]).join('')}`,
  department: studentsData[0].department,
  batch: "2024",
  points: studentsData[0].points,
  change: "up",
  changeValue: 5,
  badges: ["Active Learner"],
  activities: {
    discussions: 15,
    connections: studentsData[0].connections,
    referrals: 1,
  },
}

const achievements = [
  {
    title: "Discussion Master",
    description: "Start 10 discussions",
    progress: 3,
    total: 10,
    points: 500,
    icon: MessageSquare,
    unlocked: false,
  },
  {
    title: "Network Builder",
    description: "Connect with 50 alumni",
    progress: 24,
    total: 50,
    points: 750,
    icon: Users,
    unlocked: false,
  },
  {
    title: "Rising Star",
    description: "Reach top 10 in leaderboard",
    progress: 12,
    total: 10,
    points: 1000,
    icon: Star,
    unlocked: false,
  },
  {
    title: "Helpful Hand",
    description: "Get 100 likes on your posts",
    progress: 45,
    total: 100,
    points: 300,
    icon: Award,
    unlocked: false,
  },
]

export default function StudentLeaderboard() {
  const [selectedTab, setSelectedTab] = useState("overall")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeIcon = (change: string, value: number) => {
    switch (change) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getChangeColor = (change: string) => {
    switch (change) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Student Leaderboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compete with fellow students, earn points through activities, and climb the rankings to unlock exclusive
          rewards and recognition.
        </p>
      </div>

      {/* Current User Stats */}
      <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 avatar-glow status-online">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                  JS
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{currentUser.name}</h3>
                <p className="text-gray-600">
                  {currentUser.department} • Batch {currentUser.batch}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">Rank #{currentUser.rank}</Badge>
                  <div className={`flex items-center space-x-1 ${getChangeColor(currentUser.change)}`}>
                    {getChangeIcon(currentUser.change, currentUser.changeValue)}
                    <span className="text-sm font-medium">
                      {currentUser.change === "same" ? "No change" : `${currentUser.changeValue} positions`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{currentUser.points.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Points</div>
              <div className="flex space-x-1 mt-2">
                {currentUser.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="department">Department</TabsTrigger>
            </TabsList>

            <TabsContent value="overall" className="space-y-4">
              {leaderboardData.map((student, index) => (
                <Card key={student.rank} className="hover-lift hover-glow border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">{getRankIcon(student.rank)}</div>

                      <Avatar className="h-12 w-12 avatar-glow">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-lg">{student.name}</h4>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">{student.points.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-gray-600">
                            {student.department} • Batch {student.batch}
                          </p>
                          <div className={`flex items-center space-x-1 ${getChangeColor(student.change)}`}>
                            {getChangeIcon(student.change, student.changeValue)}
                            <span className="text-xs">{student.change === "same" ? "—" : student.changeValue}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {student.badges.map((badge, badgeIndex) => (
                              <Badge key={badgeIndex} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{student.activities.discussions}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{student.activities.connections}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-3 w-3" />
                              <span>{student.activities.referrals}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Weekly Rankings</h3>
                  <p className="text-sm text-gray-500">
                    Weekly leaderboard resets every Monday. Current week rankings will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Monthly Rankings</h3>
                  <p className="text-sm text-gray-500">
                    Monthly leaderboard resets on the 1st of each month. December rankings coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="department" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Department Rankings</h3>
                  <p className="text-sm text-gray-500">
                    Compare your performance with students from your department. Rankings by major coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Point System */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>How to Earn Points</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Start a discussion</span>
                <Badge variant="outline">+50 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reply to discussion</span>
                <Badge variant="outline">+10 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Connect with alumni</span>
                <Badge variant="outline">+25 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Get a referral</span>
                <Badge variant="outline">+100 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Improve ATS score</span>
                <Badge variant="outline">+5 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Receive post likes</span>
                <Badge variant="outline">+2 pts</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Complete challenges to earn bonus points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                const progress = Math.min((achievement.progress / achievement.total) * 100, 100)

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">{achievement.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{achievement.points}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                    <div className="space-y-1">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {achievement.progress}/{achievement.total}
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Boost Your Ranking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Discussion
              </Button>
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Find Alumni
              </Button>
              <Button className="w-full justify-start hover-lift btn-glow bg-transparent" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Check ATS Score
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
