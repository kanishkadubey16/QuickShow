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



import Payment from "./pages/Payment";

const AppLayout = () => {
  // ...
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthRoute && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Moviedetails />} />
        <Route path="/trailers" element={<Trailers />} />

        <Route path="/seats" element={<SeatLayout />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favourite" element={<Favourite />} />
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
