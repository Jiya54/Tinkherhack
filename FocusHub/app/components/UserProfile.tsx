"use client"

import { useState } from "react"
import { useAppContext } from "../contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const themes = ["light", "dark", "nature"]
const fonts = ["Inter", "Poppins", "Roboto Mono"]

export default function UserProfile() {
  const { user, setUser, theme, setTheme, font, setFont } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    setUser(null)
    // Redirect to home page
    window.location.href = "/"
  }

  if (!user) {
    return <div className="text-text">Please log in to view your profile.</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card-bg rounded-lg shadow-xl">
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-primary">{user.email}</h2>
          <Button onClick={() => setIsEditing(!isEditing)} className="bg-accent text-text">
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {isEditing && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-text">Theme</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-text">Font</label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button onClick={handleLogout} className="mt-6 bg-primary text-background">
        Logout
      </Button>
    </div>
  )
}

