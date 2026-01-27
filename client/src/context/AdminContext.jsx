import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { dummyDashboardData, dummyShowsData } from '../assets/assets';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [stats, setStats] = useState({
        totalBookings: dummyDashboardData.totalBookings,
        totalRevenue: dummyDashboardData.totalRevenue,
        activeShows: dummyDashboardData.activeShows.length,
        totalUsers: dummyDashboardData.totalUser
    });
    const [shows, setShows] = useState(dummyDashboardData.activeShows);
    const [movies, setMovies] = useState(dummyShowsData);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/admin';

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/stats`, getHeaders());
            if (res.data.success) {
                setStats(res.data.stats);
            }
        } catch (error) {
            console.error("Error fetching stats, using dummy state:", error);
        }
    };

    const fetchShows = async () => {
        try {
            const res = await axios.get(`${API_URL}/shows`, getHeaders());
            if (res.data.success) {
                setShows(res.data.shows);
            }
        } catch (error) {
            console.error("Error fetching shows, using dummy state:", error);
        }
    };

    const fetchMovies = async () => {
        try {
            const res = await axios.get(`${API_URL}/movies`, getHeaders());
            if (res.data.success) {
                setMovies(res.data.movies);
            }
        } catch (error) {
            console.error("Error fetching movies, using dummy state:", error);
        }
    };

    const addShow = async (showData) => {
        setLoading(true);
        try {
            // Attempt backend call
            const res = await axios.post(`${API_URL}/shows`, showData, getHeaders());
            if (res.data.success) {
                await fetchShows();
                await fetchStats();
                return { success: true };
            }
        } catch (error) {
            console.error("Error adding show to backend, updating local state:", error);

            // Local state fallback
            // Prioritize the movie object passed in showData (from TMDB), otherwise look it up
            const movie = showData.movie || movies.find(m => m._id === showData.movieId || m.id == showData.movieId);
            const newShow = {
                _id: Date.now().toString(),
                movie: movie || { title: "Unknown Movie", poster_path: "" },
                showDateTime: showData.showDateTime,
                showPrice: Number(showData.showPrice),
                occupiedSeats: {}
            };

            setShows(prev => [newShow, ...prev]);
            setStats(prev => ({
                ...prev,
                activeShows: prev.activeShows + 1
            }));

            return { success: true }; // Return success to close the form/notify user
        } finally {
            setLoading(false);
        }
    };

    const deleteShow = async (id) => {
        try {
            // Attempt backend call
            const res = await axios.delete(`${API_URL}/shows/${id}`, getHeaders());
            if (res.data.success) {
                await fetchShows();
                await fetchStats();
                return { success: true };
            }
        } catch (error) {
            console.error("Error deleting show from backend, updating local state:", error);

            // Local state fallback
            setShows(prev => prev.filter(show => show._id !== id));
            setStats(prev => ({
                ...prev,
                activeShows: Math.max(0, prev.activeShows - 1)
            }));

            return { success: true };
        }
    };

    const seedDatabase = async (movieData) => {
        try {
            await axios.post(`${API_URL}/movies/seed`, { movies: movieData }, getHeaders());
            await fetchMovies();
        } catch (error) {
            console.error("Error seeding movies:", error);
        }
    };

    return (
        <AdminContext.Provider value={{
            stats,
            shows,
            movies,
            loading,
            fetchAll: async () => {
                setLoading(true);
                await Promise.all([fetchStats(), fetchShows(), fetchMovies()]);
                setLoading(false);
            },
            addShow,
            deleteShow,
            seedDatabase
        }}>
            {children}
        </AdminContext.Provider>
    );
};
