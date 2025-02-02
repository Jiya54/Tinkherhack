import { NextResponse } from "next/server"

const avatars = [
  "/avatars/cat.gif",
  "/avatars/dog.gif",
  "/avatars/rabbit.gif",
  "/avatars/fox.gif",
  "/avatars/owl.gif",
  "/avatars/penguin.gif",
  "/avatars/koala.gif",
  "/avatars/panda.gif",
  "/avatars/lion.gif",
]

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name, avatar } = body

  // Here you would typically validate the credentials against a database
  // For now, we'll just simulate a successful login if the email and password are not empty
  if (email && password && name && avatar) {
    return NextResponse.json({ success: true, message: "Login successful" })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}

