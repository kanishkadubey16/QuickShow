import React, { useState, useEffect } from 'react';
import { dummyShowsData } from '../assets/assets';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { fetchMarvelMovies, searchMovies } from '../services/tmdbService';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState(dummyShowsData); // Start with dummy data
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        let fetchedMovies;

        if (searchQuery) {
          console.log(`Searching for "${searchQuery}" page ${currentPage}...`);
          fetchedMovies = await searchMovies(searchQuery, currentPage);
        } else {
          console.log(`Fetching Marvel movies page ${currentPage}...`);
          fetchedMovies = await fetchMarvelMovies(currentPage);
        }

        if (fetchedMovies && Array.isArray(fetchedMovies) && fetchedMovies.length > 0) {
          console.log(`Successfully fetched ${fetchedMovies.length} movies`);
          setMovies(fetchedMovies);
          setTotalPages(5); // Fixed for demo
        } else {
          console.warn(`No movies returned for page ${currentPage}`);
          if (searchQuery) setMovies([]);
        }
      } catch (err) {
        console.error("Failed to load movies:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage, searchQuery]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20">

        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              {searchQuery ? `Results for "${searchQuery}"` : 'Marvel Movies'}
            </h2>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-white text-xl">
              Loading movies...
            </div>
          ) : (
            <>
              {movies.length === 0 ? (
                <div className="text-center text-zinc-500 py-20 text-xl">
                  No movies found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && movies.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${currentPage === 1
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentPage(idx + 1);
                        }}
                        className={`w-10 h-10 rounded-full font-semibold transition ${currentPage === idx + 1
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${currentPage === totalPages
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      <div className="fixed top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Movies;
