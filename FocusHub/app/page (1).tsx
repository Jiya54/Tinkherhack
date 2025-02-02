import Navbar from "./components/Navbar"
import StudyTimer from "./components/StudyTimer"
import Features from "./components/Features"
import Nemo from "./components/Nemo"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Welcome to FocusHub</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your super cool study buddy! Let's make learning fun and easy!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/task-manager">
                <Button className="bg-background text-primary font-bold py-2 px-6 rounded-full hover:bg-accent hover:text-background transition-colors">
                  Task Manager
                </Button>
              </Link>
              <Link href="/goals">
                <Button className="bg-background text-primary font-bold py-2 px-6 rounded-full hover:bg-accent hover:text-background transition-colors">
                  Goals
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Study Stickers */}
        <div className="study-sticker sticker1">
          <Image
            src="https://cdn-icons-png.flaticon.com/256/4681/4681580.png"
            alt="Study Sticker 1"
            width={80}
            height={80}
          />
        </div>
        <div className="study-sticker sticker2">
          <Image
            src="https://cdn-icons-png.flaticon.com/256/4524/4524473.png"
            alt="Study Sticker 2"
            width={80}
            height={80}
          />
        </div>
        <div className="study-sticker sticker3">
          <Image
            src="https://cdn-icons-png.flaticon.com/256/4524/4524463.png"
            alt="Study Sticker 3"
            width={80}
            height={80}
          />
        </div>
        <div className="study-sticker sticker4">
          <Image
            src="https://cdn-icons-png.flaticon.com/256/8662/8662218.png"
            alt="Study Sticker 4"
            width={80}
            height={80}
          />
        </div>

        <StudyTimer />
        <Features />
      </main>
      <Nemo />
    </div>
  )
}

