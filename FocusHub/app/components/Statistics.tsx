"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Statistics() {
  const [data, setData] = useState({
    labels: ["Tasks Completed", "Study Hours", "Goals Achieved"],
    datasets: [
      {
        label: "This Week",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 182, 185, 0.6)", // Soft Pink
      },
    ],
  })

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      // In a real app, you'd fetch this data from your backend
      const newData = {
        labels: ["Tasks Completed", "Study Hours", "Goals Achieved"],
        datasets: [
          {
            label: "This Week",
            data: [Math.floor(Math.random() * 20), Math.floor(Math.random() * 40), Math.floor(Math.random() * 5)],
            backgroundColor: "rgba(255, 182, 185, 0.6)", // Soft Pink
          },
        ],
      }
      setData(newData)
    }

    fetchData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Your Progress This Week",
        color: "#454545", // Dark Gray
      },
    },
    scales: {
      y: {
        ticks: { color: "#454545" }, // Dark Gray
        grid: { color: "rgba(69, 69, 69, 0.1)" }, // Slightly transparent Dark Gray
      },
      x: {
        ticks: { color: "#454545" }, // Dark Gray
        grid: { color: "rgba(69, 69, 69, 0.1)" }, // Slightly transparent Dark Gray
      },
    },
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-card-bg rounded-lg shadow-xl">
      <Bar options={options} data={data} />
    </div>
  )
}

