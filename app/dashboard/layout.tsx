import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="dark min-h-screen bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
        <Header />
        <main className="ml-16 mt-14 min-h-screen bg-gray-900">{children}</main>
      </Suspense>
    </div>
  )
}