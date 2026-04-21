import bcrypt from "bcryptjs"
import User from "../models/User.js"

// @desc    Update user profile (name, email, phone)
// @route   PUT /api/profile/update
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body
        const userId = req.user

        // Find user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email })
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" })
            }
            user.email = email
        }

        // Update fields
        if (name) user.name = name
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber

        await user.save()

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePhoto: user.profilePhoto
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Upload profile photo
// @route   PUT /api/profile/photo
// @access  Private
export const uploadPhoto = async (req, res) => {
    try {
        const { profilePhoto } = req.body
        const userId = req.user

        if (!profilePhoto) {
            return res.status(400).json({ message: "No photo data provided" })
        }

        // Validate base64 image data
        if (!profilePhoto.startsWith('data:image/')) {
            return res.status(400).json({ message: "Invalid image format" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.profilePhoto = profilePhoto
        await user.save()

        res.json({
            success: true,
            message: "Profile photo updated successfully",
            profilePhoto: user.profilePhoto
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Change password
// @route   PUT /api/profile/password
// @access  Private
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const userId = req.user

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" })
        }

        // Hash and save new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        res.json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Delete user account
// @route   DELETE /api/profile/delete
// @access  Private
export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body
        const userId = req.user

        if (!password) {
            return res.status(400).json({ message: "Password is required to delete account" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" })
        }

        // Delete user
        await User.findByIdAndDelete(userId)

        res.json({
            success: true,
            message: "Account deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
