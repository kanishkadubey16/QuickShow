import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Search, X, LogOut, Ticket, Settings, ArrowRight } from "lucide-react"
import { assets } from "../assets/assets"
import { motion, AnimatePresence } from "framer-motion"

import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const [open, setOpen] = useState(false)          // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false) // desktop user dropdown
  const [searchOpen, setSearchOpen] = useState(false)     // search expansion
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false)
    navigate("/login")
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 z-50 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="QuickShow"
              className="w-32 md:w-36"
            />
          </Link>

          {/* Center pill menu (Desktop only) */}
          <ul className="hidden md:flex items-center gap-8 px-8 py-2 bg-white/10 rounded-full text-white text-sm font-medium border border-white/5 shadow-2xl">
            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/movies" className="hover:text-primary transition">Movies</Link></li>
            <li><Link to="/trailers" className="hover:text-primary transition">Trailers</Link></li>
            <li><Link to="/favourite" className="hover:text-primary transition">Favorites</Link></li>
          </ul>

          {/* Right section (Desktop only) */}
          <div className="hidden md:flex items-center gap-5 relative">
            <div className="flex items-center relative">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/20"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white text-sm px-4 py-1.5 outline-none w-full"
                    />
                    <button type="submit" className="p-1.5 hover:bg-white/10 transition">
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1.5 hover:bg-white/10 transition border-l border-white/10"
                    >
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-white hover:text-primary transition"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="relative">
                {/* avatar button */}
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full overflow-hidden bg-white/10 text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition"
                >
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.name?.[0]?.toUpperCase() || "U"
                  )}
                </button>

                {/* dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-zinc-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="px-4 py-4 flex items-center gap-3 border-b border-white/10">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-xl font-semibold border border-white/20">
                        {user.profilePhoto ? (
                          <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          user.name?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{user.name || "User"}</p>
                        <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/bookings"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center gap-3 transition"
                      >
                        <Ticket className="w-4 h-4 text-zinc-400" />
                        My Bookings
                      </Link>

                      <Link
                        to="/manage-account"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center gap-3 transition"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" />
                        Manage account
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-red-400 flex items-center gap-3 transition border-t border-white/5"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/80 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu icon */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 text-white">
          <img src={assets.logo} alt="logo" className="w-32" />
          <X className="w-7 h-7 cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* User Info Mobile */}
        {user && (
          <div className="px-6 py-8 flex items-center gap-4 border-b border-white/10 bg-white/5">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-2xl font-semibold border border-white/20">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user.name?.[0]?.toUpperCase() || "U"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white truncate">{user.name || "User"}</p>
              <p className="text-sm text-zinc-400 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Menu links */}
        <div className="flex flex-col flex-1 p-6 space-y-4">
          <Link to="/" onClick={() => setOpen(false)} className="text-2xl font-semibold text-white">Home</Link>
          <Link to="/movies" onClick={() => setOpen(false)} className="text-2xl font-semibold text-white">Movies</Link>
          <Link to="/favourite" onClick={() => setOpen(false)} className="text-2xl font-semibold text-white">Favorites</Link>

          {user ? (
            <>
              <div className="pt-4 space-y-4 border-t border-white/10">
                <Link to="/bookings" onClick={() => setOpen(false)} className="flex items-center gap-3 text-xl text-zinc-300">
                  <Ticket className="w-5 h-5" />
                  My Bookings
                </Link>
                <Link to="/manage-account" onClick={() => setOpen(false)} className="flex items-center gap-3 text-xl text-zinc-300">
                  <Settings className="w-5 h-5" />
                  Manage Account
                </Link>

                <button
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 text-xl text-red-500 pt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-6 px-10 py-4 text-center rounded-2xl bg-primary text-white text-xl font-bold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
