import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Moviedetails from "./pages/Moviedetails";
import Trailers from "./pages/Trailers";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageAccount from "./pages/ManageAccount";
import Footer from "./components/Footer";
import { BookingProvider } from "./context/BookingContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import Favourite from "./pages/Favourite";
import ProtectedRoute from './components/ProtectedRoute';
import Payment from "./pages/Payment";

const AppLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Moviedetails />} />
        <Route path="/trailers" element={<Trailers />} />

        {/* Private Routes */}
        <Route path="/seats" element={<ProtectedRoute><SeatLayout /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/manage-account" element={<ProtectedRoute><ManageAccount /></ProtectedRoute>} />
        <Route path="/favourite" element={<ProtectedRoute><Favourite /></ProtectedRoute>} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <FavoritesProvider>
            <AppLayout />
          </FavoritesProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
