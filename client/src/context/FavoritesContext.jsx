import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    // Initialize from localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('myFavorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load favorites from localStorage:", error);
            return [];
        }
    });

    // Save to localStorage whenever favorites change
    useEffect(() => {
        try {
            localStorage.setItem('myFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage:", error);
        }
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            if (prev.some(m => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFavorite = (movieId) => {
        setFavorites((prev) => prev.filter(m => m.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(m => m.id === movieId);
    };

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
