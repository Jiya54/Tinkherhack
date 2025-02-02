"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserProfile from "../components/UserProfile"
import Statistics from "../components/Statistics"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="min-h-screen p-24 bg-background text-text">
      <h1 className="text-3xl font-bold mb-8 text-primary">Welcome to your Dashboard</h1>
      <div className="mb-8 space-x-2">
        <Button
          onClick={() => setActiveTab("features")}
          className={`${activeTab === "features" ? "bg-primary text-background" : "bg-accent text-text"}`}
        >
          Features
        </Button>
        <Button
          onClick={() => setActiveTab("statistics")}
          className={`${activeTab === "statistics" ? "bg-primary text-background" : "bg-accent text-text"}`}
        >
          Statistics
        </Button>
        <Button
          onClick={() => setActiveTab("user")}
          className={`${activeTab === "user" ? "bg-primary text-background" : "bg-accent text-text"}`}
        >
          User
        </Button>
      </div>
      {activeTab === "features" && (
        <div className="bg-card-bg p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-primary">Features</h2>
          <ul className="list-disc pl-5 text-text">
            <li>Task Management</li>
            <li>Goal Tracking</li>
            <li>Study Timer</li>
            <li>Theme Customization</li>
            <li>Font Selection</li>
          </ul>
        </div>
      )}
      {activeTab === "statistics" && <Statistics />}
      {activeTab === "user" && <UserProfile />}
      <Link href="/" className="block mt-8">
        <Button className="bg-primary text-background">Back to Home</Button>
      </Link>
    </div>
  )
}

