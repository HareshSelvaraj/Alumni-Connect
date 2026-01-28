"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type Project = {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeline: string
  skills: string[]
  deadline: string
  alumni: { id: string; name: string; company: string; avatar?: string }
}

const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Build a Data Dashboard",
    description: "Create a responsive dashboard with charts and filters for sales data.",
    difficulty: "Medium",
    timeline: "2-3 weeks",
    skills: ["React", "TypeScript", "Recharts"],
    deadline: "2025-10-01",
    alumni: { id: "2", name: "Michael Chen", company: "Microsoft" },
  },
  {
    id: "p2",
    title: "ATS Resume Analyzer",
    description: "Implement ATS rules to score resumes and output suggestions.",
    difficulty: "Hard",
    timeline: "3-4 weeks",
    skills: ["Node.js", "NLP", "PDF"],
    deadline: "2025-10-15",
    alumni: { id: "3", name: "Emily Rodriguez", company: "Amazon" },
  },
]

export default function ProjectsPage() {
  const [q, setQ] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [technology, setTechnology] = useState("")
  const [company, setCompany] = useState("")

  const filtered = useMemo(() => {
    const list = Array.isArray(mockProjects) ? mockProjects : []
    return list.filter(p => {
      const qok = !q || [p.title, p.description, p.alumni?.name, p.alumni?.company].some(v => (v || "").toLowerCase().includes(q.toLowerCase()))
      const dok = !difficulty || p.difficulty === difficulty
      const tok = !technology || p.skills.some(s => (s || "").toLowerCase().includes(technology.toLowerCase()))
      const cok = !company || (p.alumni?.company || "").toLowerCase().includes(company.toLowerCase())
      return qok && dok && tok && cok
    })
  }, [q, difficulty, technology, company])

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-gray-500">Find alumni-posted projects and start contributing.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Input placeholder="Search projects" value={q} onChange={e => setQ(e.target.value)} />
          <Select value={difficulty || "__ALL__"} onValueChange={(v) => setDifficulty(v === "__ALL__" ? "" : v)}>
            <SelectTrigger className="min-w-[140px]"><SelectValue placeholder="Difficulty" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Technology" value={technology} onChange={e => setTechnology(e.target.value)} />
          <Input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{p.title}</span>
                <Badge>{p.difficulty}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">{p.description}</p>
              <div className="flex items-center gap-3">
                <Image src="/placeholder-user.jpg" width={36} height={36} alt={p.alumni.name} className="rounded-full border" />
                <div className="text-sm text-gray-700">{p.alumni.name} • {p.alumni.company}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map(s => <Badge variant="secondary" key={s}>{s}</Badge>)}
              </div>
              <div className="text-xs text-gray-500">Deadline: {p.deadline} • Timeline: {p.timeline}</div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <ProjectDetailsButton project={p} />
              <ApplyProjectButton project={p} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ProjectDetailsButton({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">{project.description}</p>
          <div className="flex items-center gap-3">
            <Image src="/placeholder-user.jpg" width={40} height={40} alt={project.alumni.name} className="rounded-full border" />
            <div className="text-sm text-gray-700">{project.alumni.name} • {project.alumni.company}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
          </div>
          <div className="text-xs text-gray-500">Difficulty: {project.difficulty} • Timeline: {project.timeline} • Deadline: {project.deadline}</div>
          <div className="space-y-2">
            <div className="font-medium">Submission Guidelines</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Provide a README with setup and usage.</li>
              <li>Include demo screenshots or a short Loom video.</li>
              <li>Compress files if uploading multiple artifacts.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ApplyProjectButton({ project }: { project: Project }) {
  const [description, setDescription] = useState("")
  const [tech, setTech] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)

  function onSubmit() {
    // TODO: integrate with backend submissions endpoint
    console.log("submit", { projectId: project.id, description, tech, filesCount: files?.length || 0 })
    alert("Submission uploaded (mock). Backend integration pending.")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Apply / Start Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Submit to {project.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Textarea placeholder="Describe your approach and progress" value={description} onChange={e => setDescription(e.target.value)} />
          <Input placeholder="Technologies used (comma separated)" value={tech} onChange={e => setTech(e.target.value)} />
          <Input type="file" multiple onChange={e => setFiles(e.target.files)} />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



