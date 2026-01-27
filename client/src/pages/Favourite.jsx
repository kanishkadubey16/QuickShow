import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favourite = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
            My Favorites
          </h2>
          <div className="flex items-center gap-2 text-zinc-400">
            <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
            <span className="text-sm">{favorites.length} Saved</span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/5">
              <Heart className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No favorites yet</h3>
            <p className="text-zinc-500 max-w-sm mb-8">
              Browse movies and click the heart icon to save them here for later.
            </p>
            <Link
              to="/movies"
              className="bg-primary hover:bg-primary-dull text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed top-1/4 -right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Favourite;
