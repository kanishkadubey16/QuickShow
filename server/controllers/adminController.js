import User from '../models/User.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';

// Get Dashboard Overview Stats
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeShows = await Show.countDocuments();

        const bookings = await Booking.find({ isPaid: true });
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.amount, 0);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalBookings,
                activeShows,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add New Show
export const addShow = async (req, res) => {
    try {
        const { movieId, showDateTime, showPrice } = req.body;

        if (!movieId || !showDateTime || !showPrice) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newShow = new Show({
            movie: movieId,
            showDateTime,
            showPrice,
            occupiedSeats: {}
        });

        await newShow.save();
        res.status(201).json({ success: true, message: "Show added successfully", show: newShow });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// List All Shows with Movie Details and Stats
export const listShows = async (req, res) => {
    try {
        const shows = await Show.find().populate('movie').sort({ showDateTime: -1 });

        // Enhance shows with mock booking counts for the dashboard list
        const enhancedShows = await Promise.all(shows.map(async (show) => {
            const bookings = await Booking.countDocuments({ show: show._id });
            const earnings = bookings * show.showPrice;
            return {
                ...show.toObject(),
                totalBookings: bookings,
                earnings: earnings
            };
        }));

        res.status(200).json({ success: true, shows: enhancedShows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Show
export const deleteShow = async (req, res) => {
    try {
        const { id } = req.params;
        await Show.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Show deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Seed Movies (Helper for initial setup)
export const seedMovies = async (req, res) => {
    try {
        const { movies } = req.body;
        await Movie.insertMany(movies);
        res.status(201).json({ success: true, message: "Movies seeded successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ success: true, movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
