import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import ErrorBoundary from "@/components/error-boundary"
import Chatbot from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PIXIL - Student Alumni Portal",
  description: "Connect students with alumni for career growth and professional development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <UserProvider>
            {children}
            <Chatbot />
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
