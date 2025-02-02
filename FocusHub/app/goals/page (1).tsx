"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { PlusIcon, CheckCircleIcon, XCircleIcon, TrophyIcon, FlagIcon, TargetIcon, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import Navbar from "../components/Navbar"

type Goal = {
  id: number
  text: string
  completed: boolean
  dueDate?: Date
  isLongTerm: boolean
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isLongTerm, setIsLongTerm] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          text: newGoal.trim(),
          completed: false,
          dueDate: selectedDate,
          isLongTerm,
        },
      ])
      setNewGoal("")
      setSelectedDate(undefined)
      setIsLongTerm(false)
    }
  }

  const toggleGoal = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const calculateConsistency = () => {
    const completedGoals = goals.filter((goal) => goal.completed).length
    return goals.length > 0 ? (completedGoals / goals.length) * 100 : 0
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          <TrophyIcon className="inline-block mr-2 h-10 w-10" />
          Your Awesome Goals
        </h1>
        <div className="bg-card-bg rounded-lg shadow-lg p-6">
          <div className="flex mb-4">
            <Input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your super goal!"
              className="flex-grow mr-2 bg-background text-text"
            />
            <Button onClick={() => setShowCalendar(!showCalendar)} className="mr-2 bg-primary text-background">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "Set Date"}
            </Button>
            <Button
              onClick={() => setIsLongTerm(!isLongTerm)}
              className={`mr-2 ${isLongTerm ? "bg-accent" : "bg-primary"} text-background`}
            >
              {isLongTerm ? "Long-term" : "Short-term"}
            </Button>
            <Button onClick={addGoal} className="bg-accent text-background hover:bg-primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
          {showCalendar && (
            <div className="mb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border bg-background"
              />
            </div>
          )}
          <ul className="space-y-2 mb-4">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center bg-background rounded-lg p-2 transition duration-300 hover:bg-primary hover:text-background"
              >
                <Button
                  onClick={() => toggleGoal(goal.id)}
                  variant="ghost"
                  size="sm"
                  className={`mr-2 ${goal.completed ? "text-green-500" : "text-accent"}`}
                >
                  {goal.completed ? <CheckCircleIcon className="h-6 w-6" /> : <FlagIcon className="h-6 w-6" />}
                </Button>
                <span className={`flex-grow ${goal.completed ? "line-through text-primary" : "text-text"}`}>
                  {goal.text}
                </span>
                {goal.dueDate && (
                  <span className="mr-2 text-text text-sm">Due: {format(goal.dueDate, "MM/dd/yyyy")}</span>
                )}
                <span className={`mr-2 text-sm ${goal.isLongTerm ? "text-accent" : "text-primary"}`}>
                  {goal.isLongTerm ? "Long-term" : "Short-term"}
                </span>
                <Button
                  onClick={() => removeGoal(goal.id)}
                  variant="ghost"
                  size="sm"
                  className="text-accent hover:text-primary"
                >
                  <XCircleIcon className="h-5 w-5" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <TargetIcon className="inline-block mr-2 h-6 w-6 text-primary" />
            <span className="text-text">
              You've completed {goals.filter((goal) => goal.completed).length} out of {goals.length} goals!
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-primary">Consistency</h3>
            <div className="bg-background rounded-full h-4 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculateConsistency()}%` }}
              ></div>
            </div>
            <p className="text-text mt-2">Your consistency: {calculateConsistency().toFixed(2)}%</p>
          </div>
        </div>
      </main>
    </div>
  )
}

