import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, Calendar, Star, X } from 'lucide-react';
import { dummyDateTimeData } from '../assets/assets';
import { fetchMovieDetails, fetchMovieCast, fetchMovieVideos } from '../services/tmdbService';

const Moviedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(Object.keys(dummyDateTimeData)[0]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        // Fetch all data in parallel
        const [details, cast, videos] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCast(id),
          fetchMovieVideos(id)
        ]);

        // Get the first trailer or teaser
        const trailer = videos.find(v => v.type === "Trailer") || videos[0];

        setMovie({
          ...details,
          casts: cast || [],
          trailer_url: trailer ? trailer.videoUrl : null
        });
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center pt-20">
        <div className="text-white text-xl animate-pulse">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center pt-20 text-white gap-4">
        <div className="text-xl text-center px-4">
          <p className="mb-4">{error || "Movie not found"}</p>
          <p className="text-sm text-zinc-500 mb-6">ID: {id}</p>
          <button
            onClick={() => navigate('/movies')}
            className="bg-primary hover:bg-primary-dull px-6 py-2 rounded-full font-bold transition"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Safe access to nested properties
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : "N/A";
  const genres = movie.genres || [];
  const casts = movie.casts || [];

  return (
    <div className="min-h-screen bg-[#09090B] pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-zinc-900">
        <img
          src={movie.backdrop_path || "/backgroundImage.png"}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 lg:px-20 pb-12 flex flex-col md:flex-row items-end gap-10">
          {/* Poster */}
          <div className="hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl transform translate-y-10 bg-zinc-800">
            <img
              src={movie.poster_path || "https://via.placeholder.com/300x450?text=No+Poster"}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Info */}
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 text-primary mb-4 font-bold tracking-wider uppercase text-sm">
              <Star className="w-4 h-4 fill-primary" />
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} IMDB Rating</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-400" />
                <span>{movie.runtime || "N/A"} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-zinc-400" />
                <span>{releaseYear}</span>
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-md text-sm font-medium">
                {genres.map(g => g.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Story & Cast */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Storyline</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">{movie.overview || "No overview available."}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            {casts.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {casts.map((actor, idx) => (
                  <div key={idx} className="flex-shrink-0 w-24 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white/10 mb-2 bg-zinc-800">
                      <img
                        src={actor.profile_path || "https://via.placeholder.com/100x100?text=No+Img"}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-zinc-300 font-medium line-clamp-2">{actor.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No cast information available.</p>
            )}
          </section>

          {movie.trailer_url && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
              <div
                onClick={() => setShowTrailer(true)}
                className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group cursor-pointer"
              >
                <img
                  src={movie.backdrop_path || "/backgroundImage.png"}
                  alt="Trailer"
                  className="w-full h-full object-cover opacity-50 transition group-hover:scale-105"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-300" />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Trailer Modal Overlay */}
        {showTrailer && movie.trailer_url && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-8 right-8 text-white hover:text-primary transition"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10">
              <iframe
                width="100%"
                height="100%"
                src={movie.trailer_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Right Column: Date Selection & Booking */}
        <div className="space-y-8">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Select Date</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              {Object.keys(dummyDateTimeData).map((date) => {
                const d = new Date(date);
                const day = d.toLocaleDateString('en-US', { day: 'numeric' });
                const month = d.toLocaleDateString('en-US', { month: 'short' });
                const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
                const isSelected = selectedDate === date;

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 w-16 h-24 rounded-2xl flex flex-col items-center justify-center transition ${isSelected ? 'bg-primary text-white scale-105' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                  >
                    <span className="text-xs font-medium uppercase opacity-70 mb-1">{weekday}</span>
                    <span className="text-xl font-bold">{day}</span>
                    <span className="text-xs font-bold uppercase mt-1">{month}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigate('/seats', { state: { movie, date: selectedDate } })}
              className="w-full bg-primary hover:bg-primary-dull text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Book Ticket
            </button>
            <p className="text-zinc-500 text-center mt-4 text-sm">No cancellation available</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 md:hidden flex items-center justify-between gap-4">
        <div>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total</p>
          <p className="text-white font-bold text-xl">₹ 250<span className="text-sm font-normal text-zinc-500">/ticket</span></p>
        </div>
        <button
          onClick={() => navigate('/seats', { state: { movie, date: selectedDate } })}
          className="bg-primary hover:bg-primary-dull text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default Moviedetails;
