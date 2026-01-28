"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { alumniData } from "@/lib/data-service"

type Alumni = typeof alumniData[number]

function groupBy<T, K extends string | number>(list: T[], key: (x: T)=>K): Record<K, T[]> {
  return list.reduce((acc, item) => {
    const k = key(item) as K
    ;(acc[k] ||= []).push(item)
    return acc
  }, {} as Record<K, T[]>)
}

export default function AlumniCommunityPage() {
  const [query, setQuery] = useState("")
  const [activeProfile, setActiveProfile] = useState<Alumni | null>(null)
  const [activeMessage, setActiveMessage] = useState<Alumni | null>(null)
  const batch = useMemo(() => {
    if (typeof window === 'undefined') return null
    try { return JSON.parse(localStorage.getItem("alumni_batch") || "null") } catch { return null }
  }, [])

  const batchAlumni = useMemo(() => {
    const endYear = batch?.endYear
    if (!endYear) return [] as Alumni[]
    return alumniData.filter(a => parseInt(a.graduationYear, 10) === endYear)
  }, [batch])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return batchAlumni
    return batchAlumni.filter(a => [a.name, a.company, a.position, a.department, a.location].some(v => (v||"").toLowerCase().includes(q)))
  }, [batchAlumni, query])

  const byDept = useMemo(() => groupBy(filtered, a => a.department || "Unknown"), [filtered])
  const deptKeys = Object.keys(byDept)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Community — Batch {batch ? `${batch.startYear}-${batch.endYear}` : "(select batch)"}</h1>
          <p className="text-sm text-gray-500">Meet your batchmates grouped by department.</p>
        </div>
        <Input placeholder="Search name, company, role" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>

      {deptKeys.length === 0 ? (
        <div className="text-sm text-gray-500">No alumni found for the selected batch.</div>
      ) : (
        deptKeys.map(d => (
          <Card key={d} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{d}</span>
                <Badge variant="secondary">{byDept[d].length} alumni</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* HOD block placeholder */}
              <div className="flex items-center gap-3 p-3 rounded-md bg-gray-50">
                <Image src="/placeholder-user.jpg" width={48} height={48} alt="HOD" className="rounded-full border" />
                <div className="text-sm">
                  <div className="font-medium">Head of {d}</div>
                  <div className="text-gray-600">Dr. Jane Doe • hod-{d.toLowerCase().replace(/\s+/g,'-')}@scollege.edu</div>
                </div>
              </div>
              {byDept[d].map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Image src="/placeholder-user.jpg" width={40} height={40} alt={a.name} className="rounded-full border" />
                    <div className="text-sm">
                      <div className="font-medium">{a.name}</div>
                      <div className="text-gray-600">{a.company} • {a.position}</div>
                      <div className="text-xs text-gray-500">{a.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-transparent" onClick={()=>setActiveProfile(a)}>View Details</Button>
                    <Button onClick={()=>setActiveMessage(a)}>Message</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
      {/* Inline drawers/cards instead of alert popups */}
      {activeProfile && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:right-4 md:bottom-4 md:max-w-md z-40">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{activeProfile.name}</span>
                <Button variant="ghost" size="sm" onClick={()=>setActiveProfile(null)}>Close</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">{activeProfile.company} • {activeProfile.position}</div>
              <div className="text-xs text-gray-500">{activeProfile.location}</div>
              <div className="text-xs">Email: {activeProfile.email}</div>
              <div className="text-xs">LinkedIn: {activeProfile.linkedinUrl}</div>
              <div className="text-sm mt-2">Bio: Experienced professional from {activeProfile.department}, open to mentoring and collaborations.</div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeMessage && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:right-4 md:bottom-4 md:max-w-md z-40">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Message {activeMessage.name}</span>
                <Button variant="ghost" size="sm" onClick={()=>setActiveMessage(null)}>Close</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Write a message..." />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="bg-transparent" onClick={()=>setActiveMessage(null)}>Cancel</Button>
                <Button onClick={()=>{ /* integrate secure chat here */ setActiveMessage(null) }}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


