"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockData } from "@/lib/api-service"

type Alumni = {
  id: string
  name: string
  graduationYear: number
  department: string
  currentCompany: string
  position: string
  location: string
  linkedinURL: string
  email: string
}

function groupByBatch(alumni: Alumni[]) {
  // Assume 4-year batches; derive joining year as graduationYear - 4
  const map: Record<string, Alumni[]> = {}
  for (const a of alumni) {
    const startYear = a.graduationYear - 4
    const key = `${startYear}-${a.graduationYear}`
    if (!map[key]) map[key] = []
    map[key].push(a)
  }
  return map
}

export default function BatchesPage() {
  const [query, setQuery] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [department, setDepartment] = useState("")

  const alumni: Alumni[] = useMemo(() => {
    const source = Array.isArray((mockData as any)?.alumni) ? (mockData as any).alumni : []
    return source.map((a: any) => {
      const gradYearNum = typeof a.graduationYear === 'number' ? a.graduationYear : parseInt(a.graduationYear, 10)
      return {
        id: String(a.id),
        name: a.name || "",
        graduationYear: isNaN(gradYearNum) ? 0 : gradYearNum,
        department: a.department || "",
        currentCompany: a.currentCompany || a.company || "",
        position: a.position || "",
        location: a.location || "",
        linkedinURL: a.linkedinURL || a.linkedin || a.linkedinUrl || "",
        email: a.email || "",
      }
    })
  }, [])

  const filtered = useMemo(() => {
    return (alumni || []).filter(a => {
      const q = query.trim().toLowerCase()
      const matchesQ = !q || [a.name, a.currentCompany, a.position, a.location].some(v => (v || "").toLowerCase().includes(q))
      const matchesCompany = !company || (a.currentCompany || "").toLowerCase().includes(company.toLowerCase())
      const matchesLocation = !location || (a.location || "").toLowerCase().includes(location.toLowerCase())
      const matchesDept = !department || a.department === department
      return matchesQ && matchesCompany && matchesLocation && matchesDept
    })
  }, [alumni, query, company, location, department])

  const batches = useMemo(() => groupByBatch(filtered), [filtered])
  const batchKeys = useMemo(() => Object.keys(batches).sort((a, b) => parseInt(b.split("-")[1]) - parseInt(a.split("-")[1])), [batches])

  const departments = useMemo(() => Array.from(new Set((alumni || []).map(a => a.department).filter(Boolean))), [alumni])

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Batches</h1>
          <p className="text-sm text-gray-500">Browse alumni by batch year. Click a batch to view all alumni.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Input placeholder="Search name, company, role" value={query} onChange={e => setQuery(e.target.value)} />
          <Input placeholder="Filter by company" value={company} onChange={e => setCompany(e.target.value)} />
          <Input placeholder="Filter by location" value={location} onChange={e => setLocation(e.target.value)} />
          <Select value={department || "__ALL__"} onValueChange={(v) => setDepartment(v === "__ALL__" ? "" : v)}>
            <SelectTrigger className="min-w-[150px]"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Departments</SelectItem>
              {departments.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {batchKeys.map(batch => {
          const list = batches[batch]
          const avatars = list.slice(0, 4)
          return (
            <Dialog key={batch}>
              <DialogTrigger asChild>
                <Card className="hover-lift cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{batch}</span>
                      <Badge variant="secondary">{list.length} alumni</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex -space-x-2">
                    {avatars.map(a => (
                      <Image key={a.id} src={"/placeholder-user.jpg"} width={40} height={40} alt={a.name} className="rounded-full border" />
                    ))}
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Batch {batch}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {list.map(a => (
                    <Card key={a.id}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <Image src={"/placeholder-user.jpg"} width={56} height={56} alt={a.name} className="rounded-full border" />
                        <div className="flex-1">
                          <div className="font-medium">{a.name}</div>
                          <div className="text-sm text-gray-600">{a.currentCompany} • {a.position}</div>
                          <div className="text-xs text-gray-500">{a.location}</div>
                        </div>
                        <AlumniDetailsButton alumni={a} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  )
}

function AlumniDetailsButton({ alumni }: { alumni: Alumni }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{alumni.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image src={"/placeholder-user.jpg"} width={72} height={72} alt={alumni.name} className="rounded-full border" />
            <div>
              <div className="text-sm text-gray-700">{alumni.currentCompany}</div>
              <div className="text-sm text-gray-700">{alumni.position}</div>
              <div className="text-xs text-gray-500">{alumni.location}</div>
            </div>
          </div>
          <Separator />
          <div className="text-sm">
            <div><span className="text-gray-500">Batch:</span> {alumni.graduationYear - 4} - {alumni.graduationYear}</div>
            <div><span className="text-gray-500">Department:</span> {alumni.department || "—"}</div>
            <div><span className="text-gray-500">Email:</span> {alumni.email}</div>
            <div><span className="text-gray-500">LinkedIn:</span> {alumni.linkedinURL}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



