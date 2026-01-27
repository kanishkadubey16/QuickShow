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
import { AdminProvider } from "./context/AdminContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import Favourite from "./pages/Favourite";



import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AddShow from "./pages/AddShow";
import ListShow from "./pages/ListShow";

import Payment from "./pages/Payment";

const AppLayout = () => {
  // ...
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAdminRoute && !isAuthRoute && <Navbar />}

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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminProvider><AdminLayout /></AdminProvider>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-show" element={<AddShow />} />
          <Route path="list-show" element={<ListShow />} />
        </Route>
      </Routes>

      {!isAdminRoute && !isAuthRoute && <Footer />}
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
