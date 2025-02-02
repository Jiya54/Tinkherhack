"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { PlusIcon, TrashIcon } from "lucide-react"
import { format } from "date-fns"
import Navbar from "../components/Navbar"

type Task = {
  id: number
  text: string
  date: Date
  time: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)

  const addTask = () => {
    if (newTask.trim() && selectedDate && selectedTime) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          date: selectedDate,
          time: selectedTime,
        },
      ])
      setNewTask("")
      setSelectedTime("")
    }
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">Task Manager</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex mb-4">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
              className="flex-grow mr-2"
            />
            <Button onClick={() => setShowCalendar(!showCalendar)} className="mr-2 bg-primary text-white">
              {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "Set Date"}
            </Button>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addTask} className="bg-accent text-text hover:bg-primary hover:text-white">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          {showCalendar && (
            <div className="mb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
          )}
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-2 text-left">Task</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-2">{task.text}</td>
                  <td className="p-2">{format(task.date, "MM/dd/yyyy")}</td>
                  <td className="p-2">{task.time}</td>
                  <td className="p-2">
                    <Button
                      onClick={() => removeTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

