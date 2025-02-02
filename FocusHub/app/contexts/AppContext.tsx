"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type User = {
  email: string
  avatar: string
}

type AppContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  font: string
  setFont: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [theme, setTheme] = useState("light")
  const [font, setFont] = useState("Inter")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    }
    const storedFont = localStorage.getItem("font")
    if (storedFont) {
      setFont(storedFont)
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("font", font)
    document.documentElement.style.setProperty("--font-main", font)
  }, [font])

  return <AppContext.Provider value={{ user, setUser, theme, setTheme, font, setFont }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

