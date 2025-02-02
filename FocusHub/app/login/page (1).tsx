"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppContext } from "../contexts/AppContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useAppContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser({ email, avatar: data.avatar })
        router.push("/dashboard")
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <h1 className="text-3xl font-bold mb-8 text-primary">Login to FocusHub</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 bg-card-bg text-text"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 bg-card-bg text-text"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-primary text-background hover:bg-accent hover:text-text transition-colors"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

