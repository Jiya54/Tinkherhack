"use client"

import Link from "next/link"
import { useAppContext } from "../contexts/AppContext"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, TreesIcon as TreeIcon } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme, user } = useAppContext()

  return (
    <nav className="bg-card-bg shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">FocusHub</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/task-manager"
              className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Task Manager
            </Link>
            <Link href="/goals" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Goals
            </Link>
            {user ? (
              <Link href="/dashboard" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            )}
            <div className="ml-4 flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("light")}
                className={theme === "light" ? "text-primary" : "text-text"}
              >
                <SunIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("dark")}
                className={theme === "dark" ? "text-primary" : "text-text"}
              >
                <MoonIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("nature")}
                className={theme === "nature" ? "text-primary" : "text-text"}
              >
                <TreeIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

