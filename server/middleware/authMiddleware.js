import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" })
  }
}

export default protect
