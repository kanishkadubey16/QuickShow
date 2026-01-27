import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import { dummyShowsData } from '../assets/assets';
import TrailersSection from '../components/TrailersSection';
import { fetchMarvelMovies } from '../services/tmdbService';

const Home = () => {
  const [movies, setMovies] = useState(dummyShowsData.slice(0, 8)); // Start with dummy data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMarvelMovies = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch Marvel movies...");
        const marvelMovies = await fetchMarvelMovies(1);

        if (marvelMovies && Array.isArray(marvelMovies) && marvelMovies.length > 0) {
          console.log(`Successfully fetched ${marvelMovies.length} Marvel movies`);
          // Show only 4 movies on Home page as requested
          setMovies(marvelMovies.slice(0, 4));
        } else {
          console.warn("No Marvel movies returned or empty array");
        }
      } catch (err) {
        console.error("Failed to load Marvel movies in Home:", err);
        // We keep the dummy data if the fetch fails, so the UI doesn't break
      } finally {
        setLoading(false);
      }
    };

    loadMarvelMovies();
  }, []);

  return (
    <div className="pb-20">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Now Showing</h2>
          <button
            onClick={() => window.location.href = '/movies'}
            className="text-primary font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-white text-xl">
            Loading Marvel movies...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <TrailersSection />
      </div>
    </div>
  );
};

export default Home;
