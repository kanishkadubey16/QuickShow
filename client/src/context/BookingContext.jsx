import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    // Initialize from localStorage
    const [bookings, setBookings] = useState(() => {
        try {
            const saved = localStorage.getItem('myBookings');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load bookings from localStorage:", error);
            return [];
        }
    });

    // Save to localStorage whenever bookings change
    React.useEffect(() => {
        try {
            localStorage.setItem('myBookings', JSON.stringify(bookings));
        } catch (error) {
            console.error("Failed to save bookings to localStorage:", error);
        }
    }, [bookings]);

    const addBooking = (booking) => {
        setBookings((prev) => {
            // Deduplication check: Don't add if it's identical to the last one and within 3 seconds
            if (prev.length > 0) {
                const last = prev[0];
                const isDuplicate =
                    last.show.movie.title === booking.show.movie.title &&
                    JSON.stringify(last.bookedSeats) === JSON.stringify(booking.bookedSeats) &&
                    last.time === booking.time &&
                    last.date === booking.date;

                if (isDuplicate) {
                    console.warn("Duplicate booking detected, skipping...");
                    return prev;
                }
            }

            return [
                {
                    _id: Math.random().toString(36).substr(2, 9),
                    ...booking,
                    amount: booking.total || booking.amount,
                    bookedSeats: booking.seats || booking.bookedSeats,
                    isPaid: true,
                    timestamp: Date.now()
                },
                ...prev,
            ];
        });
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking }}>
            {children}
        </BookingContext.Provider>
    );
};
