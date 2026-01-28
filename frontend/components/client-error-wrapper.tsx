"use client"

import React from "react"
import ErrorBoundary from "@/components/error-boundary"

export default function ClientErrorWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}


