"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon, RotateCcwIcon } from "lucide-react"

export default function StudyTimer() {
  const [customTime, setCustomTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(customTime * 60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      alert("Time is up!")
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  const startTimer = () => setIsActive(true)
  const pauseTimer = () => setIsActive(false)
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(customTime * 60)
  }

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Study Timer</h2>
      <div className="mb-4">
        <label htmlFor="customTime" className="block text-sm font-medium text-gray-700 mb-2">
          Set study time (minutes):
        </label>
        <input
          type="number"
          id="customTime"
          value={customTime}
          onChange={(e) => setCustomTime(Math.max(1, Number.parseInt(e.target.value) || 25))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="text-4xl font-bold mb-4 text-primary">{formatTime(timeLeft)}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={isActive ? pauseTimer : startTimer} className="bg-primary text-background hover:bg-accent">
          {isActive ? <PauseIcon className="mr-2 h-4 w-4" /> : <PlayIcon className="mr-2 h-4 w-4" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} className="bg-accent text-text hover:bg-primary hover:text-background">
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}

