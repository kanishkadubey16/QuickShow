import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "https://quickshowsss.netlify.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  credentials: true
}))
app.use(express.json({ limit: '10mb' })) // Increased limit for profile photos
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "QuickShow API running!",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      dashboard: "GET /api/auth/dashboard (Protected)"
    }
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`✅ Register: POST http://localhost:${PORT}/api/auth/register`)
  console.log(`✅ Login: POST http://localhost:${PORT}/api/auth/login`)
  console.log(`✅ Dashboard: GET http://localhost:${PORT}/api/auth/dashboard`)
  console.log(`📱 Client Ready!`)
})