import express from "express"
import {
    updateProfile,
    uploadPhoto,
    changePassword,
    deleteAccount
} from "../controllers/profileController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

// All profile routes are protected
router.put("/update", protect, updateProfile)
router.put("/photo", protect, uploadPhoto)
router.put("/password", protect, changePassword)
router.delete("/delete", protect, deleteAccount)

export default router
