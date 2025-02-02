import "./globals.css"
import { Inter, Poppins, Roboto_Mono } from "next/font/google"
import { AppProvider } from "./contexts/AppContext"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-poppins" })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })

export const metadata = {
  title: "FocusHub - Student Productivity Tool",
  description: "FocusHub is a student productivity tool to help manage tasks and goals.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${robotoMono.variable}`}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

