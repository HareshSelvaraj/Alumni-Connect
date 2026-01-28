import type React from "react"
import { AlumniNavigation } from "@/components/alumni/navigation"

export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AlumniNavigation />
      <main className="flex-1">{children}</main>
    </div>
  )
}
