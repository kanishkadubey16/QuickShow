import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { CalendarIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMovieVideos } from "../services/tmdbService";

const HeroSection = () => {
  const navigate = useNavigate();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // HARDCODED STARTING MOVIE (To match "previous image" request)
  const movie = {
    id: 118340, // Guardians of the Galaxy
    title: "Guardians of the Galaxy",
    overview: "Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.",
    backdrop_path: "/backgroundImage.png",
    release_date: "2014-08-01",
    runtime: 121,
    genres: [{ name: "Action" }, { name: "Sci-Fi" }, { name: "Adventure" }],
    vote_average: 7.9
  };

  useEffect(() => {
    const loadTrailer = async () => {
      try {
        // Fetch trailer for Guardians of the Galaxy
        const videos = await fetchMovieVideos(movie.id);
        const trailer = videos.find(v => v.type === "Trailer") || videos[0];
        if (trailer) {
          setTrailerUrl(trailer.videoUrl);
        }
      } catch (err) {
        console.error("Failed to load hero trailer:", err);
      }
    };
    loadTrailer();
  }, []);

  const handleBookTicket = () => {
    navigate(`/movies/${movie.id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format release year
  const getYear = (dateString) => new Date(dateString).getFullYear();

  // Get genre names
  const getGenres = (genres) => genres.map(g => g.name).join(" | ");

  return (
    <div
      className='relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-20
                 bg-cover bg-center h-[90vh] md:h-screen w-full'
      style={{ backgroundImage: `url(${movie.backdrop_path})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent"></div>

      <motion.div
        className="relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          variants={itemVariants}
          src={assets.marvelLogo}
          alt="Marvel"
          className="max-h-11 lg:h-11 mb-6"
        />

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
        >
          {movie.title}
        </motion.h1>

        <motion.div variants={itemVariants} className="flex items-center gap-6 text-zinc-300 text-lg">
          <span className="font-medium">{getGenres(movie.genres)}</span>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-zinc-400" />
            <span>{getYear(movie.release_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-zinc-400" />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookTicket}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-red-600/20"
          >
            Book Ticket
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTrailer(true)}
            disabled={!trailerUrl}
            className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md transition border border-white/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayCircle className="w-6 h-6" />
            Watch Trailer
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && trailerUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowTrailer(false)}
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTrailer(false);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;

