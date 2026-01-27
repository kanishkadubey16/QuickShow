import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-white pt-16 pb-8 px-4 md:px-16 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Left Section: Logo and Description */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-red-600">Q</span>uickShow
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={assets.googlePlay} alt="Get it on Google Play" className="h-10 border border-gray-700 rounded-md" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={assets.appStore} alt="Download on the App Store" className="h-10 border border-gray-700 rounded-md" />
            </a>
          </div>
        </div>

        {/* Middle Section: Company Links */}
        <div className="md:ml-20">
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/movies" className="hover:text-white transition-colors">Movies</Link></li>
            <li><Link to="/trailers" className="hover:text-white transition-colors">Trailers</Link></li>
            <li><Link to="/manage-account" className="hover:text-white transition-colors">Manage Account</Link></li>
            <li><Link to="/bookings" className="hover:text-white transition-colors">My Bookings</Link></li>
          </ul>
        </div>

        {/* Right Section: Get in touch */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Get in touch</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <span>+1-234-567-890</span>
            </li>
            <li className="flex items-center gap-2">
              <a href="mailto:contact@example.com" className="hover:text-white transition-colors">contact@example.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Copyright 2026 © GreatStack. All Right Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
