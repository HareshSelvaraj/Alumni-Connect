import type React from "react"
import { StudentNavigation } from "@/components/student/navigation"
import ClientErrorWrapper from "@/components/client-error-wrapper"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavigation />
      <main className="flex-1">
        <ClientErrorWrapper>
          {children}
        </ClientErrorWrapper>
      </main>
    </div>
  )
}
