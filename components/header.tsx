"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Zap, Bell, Search, Menu } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-14 bg-gray-800 rounded-bl-2xl">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo - Left */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-5 w-5 text-yellow-500" />
          </Button>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={300}
            height={90}
            className="h-20 w-72 object-contain -ml-12"
          />
        </div>
        
        {/* Search - Center */}
        <div className="flex-1 flex justify-center px-8 -ml-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Recherche..." 
              className="pl-10 w-full bg-gray-700 border-gray-600 text-gray-800 placeholder-gray-400 rounded-xl focus:border-yellow-500"
            />
          </div>
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <Zap className="h-4 w-4 text-yellow-500" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <Bell className="h-4 w-4 text-gray-300" />
          </Button>
          <Avatar className="h-8 w-8 rounded-xl border-2 border-yellow-500">
            <AvatarFallback className="bg-gray-600 text-white text-sm font-medium rounded-xl border-2 border-yellow-500">E</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
