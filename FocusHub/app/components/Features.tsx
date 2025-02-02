"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { BookOpenIcon, RocketIcon, ClockIcon, PuzzleIcon, BrainIcon, StarIcon, PlusIcon, TrashIcon } from "lucide-react"
import { format } from "date-fns"

type Task = {
  id: number
  text: string
  date: Date
  time: string
}

export default function Features() {
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

  const features = [
    {
      icon: <BookOpenIcon className="h-12 w-12" />,
      title: "Smart Study Planner",
      description: "Plan your study sessions like a superhero!",
    },
    {
      icon: <RocketIcon className="h-12 w-12" />,
      title: "Goal Blaster",
      description: "Blast through your goals and reach for the stars!",
    },
    {
      icon: <ClockIcon className="h-12 w-12" />,
      title: "Time Wizard",
      description: "Master time like a wizard and finish tasks faster!",
    },
    {
      icon: <PuzzleIcon className="h-12 w-12" />,
      title: "Task Quest",
      description: "Turn your tasks into exciting quests and adventures!",
    },
    {
      icon: <BrainIcon className="h-12 w-12" />,
      title: "Brain Booster",
      description: "Power up your brain with fun learning challenges!",
    },
    {
      icon: <StarIcon className="h-12 w-12" />,
      title: "Achievement Stars",
      description: "Collect stars and unlock cool rewards as you learn!",
    },
  ]

  return (
    <section className="py-12 features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-features-primary">Awesome Features</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-500 hover:scale-105"
            >
              <div className="flex justify-center mb-4 text-features-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-features-primary">{feature.title}</h3>
              <p className="text-features-text">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-features-primary">Task Manager</h3>
          <div className="flex mb-4">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
              className="flex-grow mr-2"
            />
            <Button onClick={() => setShowCalendar(!showCalendar)} className="mr-2 bg-features-primary text-white">
              {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "Set Date"}
            </Button>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mr-2"
            />
            <Button
              onClick={addTask}
              className="bg-features-accent text-features-text hover:bg-features-primary hover:text-white"
            >
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
              <tr className="bg-features-primary text-white">
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
      </div>
    </section>
  )
}

