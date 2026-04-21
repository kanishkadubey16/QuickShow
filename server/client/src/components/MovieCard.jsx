import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(movie.id);

    return (
        <div className="group cursor-pointer relative">
            {/* Heart Icon */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie);
                }}
                className="absolute top-3 right-3 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md transition-all active:scale-90"
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'}`}
                />
            </button>

            <div
                onClick={() => navigate(`/movies/${movie.id}`)}
            >
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5">
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/movies/${movie.id}`);
                            }}
                            className="bg-primary hover:bg-primary-dull text-white font-bold py-3 px-8 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                        {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(' | ') : 'Movies'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
