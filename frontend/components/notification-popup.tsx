"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Briefcase, CheckCircle2, ClipboardList, Award } from "lucide-react"

type NotificationType = "events" | "jobs" | "referrals" | "projects" | "achievements"

type Notification = {
  id: string
  type: NotificationType
  title: string
  description: string
  meta?: string
}

const ICONS: Record<NotificationType, any> = {
  events: Calendar,
  jobs: Briefcase,
  referrals: CheckCircle2,
  projects: ClipboardList,
  achievements: Award,
}

const DEFAULT_PREFS: Record<NotificationType, boolean> = {
  events: true,
  jobs: true,
  referrals: true,
  projects: true,
  achievements: true,
}

function loadPrefs(): Record<NotificationType, boolean> {
  if (typeof window === "undefined") return DEFAULT_PREFS
  try {
    const raw = localStorage.getItem("student_notification_prefs")
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS
  } catch {
    return DEFAULT_PREFS
  }
}

function savePrefs(prefs: Record<NotificationType, boolean>) {
  try {
    localStorage.setItem("student_notification_prefs", JSON.stringify(prefs))
  } catch {}
}

export function DashboardNotificationPopup({
  enabled = true,
  notifications = [] as Notification[],
  sessionKey = "student_dashboard_popup_shown",
}: {
  enabled?: boolean
  notifications?: Notification[]
  sessionKey?: string
}) {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Record<NotificationType, boolean>>(DEFAULT_PREFS)

  useEffect(() => {
    setPrefs(loadPrefs())
  }, [])

  useEffect(() => {
    if (!enabled) return
    if (typeof window === "undefined") return
    const hasShown = sessionStorage.getItem(sessionKey) === "1"
    if (!hasShown) setOpen(true)
  }, [enabled, sessionKey])

  const filtered = useMemo(() => notifications.filter(n => prefs[n.type]), [notifications, prefs])

  function markRead() {
    setOpen(false)
    try { sessionStorage.setItem(sessionKey, "1") } catch {}
  }

  function togglePref(key: NotificationType) {
    const next = { ...prefs, [key]: !prefs[key] }
    setPrefs(next)
    savePrefs(next)
  }

  if (!enabled) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Updates for you</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {filtered.length === 0 ? (
              <div className="text-sm text-gray-500">No notifications based on your preferences.</div>
            ) : (
              filtered.map(n => {
                const Icon = ICONS[n.type]
                return (
                  <Card key={n.id}>
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" /> {n.title}
                        </span>
                        <Badge variant="secondary">{n.type}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4 text-sm text-gray-700">
                      <div>{n.description}</div>
                      {n.meta && <div className="text-xs text-gray-500 mt-1">{n.meta}</div>}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium">Notification Settings</div>
            {Object.keys(DEFAULT_PREFS).map(k => {
              const key = k as NotificationType
              return (
                <label key={key} className="flex items-center justify-between p-2 border rounded-md">
                  <span className="text-sm capitalize">{key}</span>
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    onChange={() => togglePref(key)}
                    aria-label={`Toggle ${key}`}
                  />
                </label>
              )
            })}
            <div className="pt-2 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Close</Button>
              <Button className="flex-1" onClick={markRead}>Mark as Read</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



