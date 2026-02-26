"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Bot, FileText, Puzzle, Settings, Menu, Plus } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Orders", href: "/dashboard/orders", icon: FileText },
  { name: "Integrations", href: "/dashboard/integrations", icon: Puzzle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
  <aside className="group fixed left-0 top-0 z-40 h-screen w-16 hover:w-48 bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden rounded-r-2xl">
      <div className="flex h-full flex-col">
        <div className="flex flex-col items-center py-4 px-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 mb-2">
            <Menu className="h-4 w-4 text-yellow-400" />
          </Button>
          <div className="mb-4">
            <Image 
              src="/placeholder-logo.png" 
              alt="DAKI tech" 
              width={60}
              height={20}
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="w-full">
            {/* Collapsed state */}
            <div className="flex flex-col items-center group-hover:hidden">
              <Link href="/dashboard/agents/new">
                <Button size="icon" className="h-11 w-11 rounded-lg bg-[#FFD100] hover:bg-[#FFD100]/90">
                  <Plus className="h-5 w-5 text-[#333333]" />
                </Button>
              </Link>
            </div>
            {/* Expanded state */}
            <div className="hidden group-hover:flex group-hover:items-center group-hover:gap-3 group-hover:px-2">
              <Link href="/dashboard/agents/new" className="flex-1">
                <Button className="flex items-center gap-2 h-12 w-full px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-medium shadow">
                  <Plus className="h-5 w-5" />
                  <span className="text-base">New agent</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2 pt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div className="flex flex-col items-center py-2 rounded-xl transition-colors hover:bg-gray-700 group-hover:flex-row group-hover:items-center group-hover:gap-3 group-hover:px-3">
                  <item.icon className={cn("h-5 w-5", isActive ? "text-yellow-500" : "text-gray-400")} />
                  <span
                    className={cn(
                      "text-[9px] mt-1 group-hover:hidden",
                      isActive ? "text-yellow-500 font-medium" : "text-gray-400 font-normal",
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "hidden group-hover:block text-sm whitespace-nowrap",
                      isActive ? "text-yellow-500 font-medium" : "text-gray-300 font-normal",
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
