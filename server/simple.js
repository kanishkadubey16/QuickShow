import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

let users = []

app.get("/", (req, res) => {
  res.json({ message: "Server working!" })
})

app.post("/api/auth/register", (req, res) => {
  console.log("Register:", req.body)
  
  const { name, email, password } = req.body
  
  const user = {
    id: Date.now(),
    name,
    email,
    password
  }
  
  users.push(user)
  
  res.json({
    success: true,
    user: { id: user.id, name, email },
    token: user.id.toString()
  })
})

app.post("/api/auth/login", (req, res) => {
  console.log("Login:", req.body)
  
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }
  
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
    token: user.id.toString()
  })
})

app.get("/api/user/dashboard", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  const userId = parseInt(token)
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  res.json({
    success: true,
    message: "Welcome to Dashboard",
    user: { id: user.id, name: user.name, email: user.email }
  })
})

app.listen(8080, () => console.log("Server running on port 8080"))