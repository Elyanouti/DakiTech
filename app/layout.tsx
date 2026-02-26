import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Daki Business - AI Agent Platform",
  description: "Create and manage AI agents with RAG capabilities",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider defaultTheme="dark">
          <Suspense fallback={<div>Loading...</div>}>
            <main className="min-h-screen">{children}</main>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
