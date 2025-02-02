"use client"

import { useState } from "react"
import Image from "next/image"

const quotes = [
  { text: "You've got this!", color: "#FF6B6B" },
  { text: "Believe in yourself!", color: "#4ECDC4" },
  { text: "Keep going!", color: "#45B7D1" },
  { text: "Stay awesome!", color: "#F9C80E" },
  { text: "Dream big!", color: "#FF8C42" },
]

export default function Nemo() {
  const [quote, setQuote] = useState<{ text: string; color: string } | null>(null)

  const fetchQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="nemo-mascot" onClick={fetchQuote}>
        <Image
          src="https://img.freepik.com/premium-photo/happy-cute-nemo-white-background-sticker-format_1091302-26264.jpg"
          alt="Nemo Mascot"
          width={80}
          height={80}
        />
      </div>
      {quote && (
        <div className="quote-bubble" style={{ backgroundColor: quote.color }}>
          <p className="text-lg font-bold text-white">{quote.text}</p>
        </div>
      )}
    </div>
  )
}

