"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, TrashIcon } from "lucide-react"

type Task = {
  id: number
  text: string
  completed: boolean
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask("")
    }
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Task Management</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-grow mr-2"
        />
        <Button onClick={addTask} className="bg-primary text-background hover:bg-accent">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center bg-card-bg rounded-lg p-2">
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="mr-2" />
            <span className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}>{task.text}</span>
            <Button onClick={() => removeTask(task.id)} variant="ghost" size="sm">
              <TrashIcon className="h-4 w-4 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

