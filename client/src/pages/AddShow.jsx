import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, Loader2, PlusCircle, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { fetchMarvelMovies } from '../services/tmdbService';

const AddShow = () => {
    const { addShow, loading: contextLoading } = useAdmin();
    const [tmdbMovies, setTmdbMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [price, setPrice] = useState('');
    const [dateTime, setDateTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoadingMovies(true);
                const data = await fetchMarvelMovies(1);
                setTmdbMovies(data);
            } catch (err) {
                console.error("Failed to load TMDB movies for admin:", err);
            } finally {
                setLoadingMovies(false);
            }
        };
        loadMovies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMovie) return alert('Please select a movie first');

        const res = await addShow({
            movieId: selectedMovie.id,
            movie: selectedMovie, // Pass full movie object for local state fallback
            showDateTime: dateTime,
            showPrice: Number(price)
        });

        if (res.success) {
            alert('Show added successfully!');
            navigate('/admin/dashboard');
        } else {
            alert(res.message);
        }
    };

    if ((contextLoading || loadingMovies) && tmdbMovies.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 pr-12">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Add <span className="text-primary underline decoration-primary underline-offset-[12px] decoration-2">Shows</span></h1>
            </div>

            {/* Movie Selection Grid - Matching Screenshot */}
            <div>
                <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Select Movie (TMDB)</h2>
                {tmdbMovies.length === 0 ? (
                    <div className="bg-[#1C1113] border border-white/5 rounded-3xl p-12 text-center">
                        <p className="text-zinc-500 font-medium italic">No movies found.</p>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {tmdbMovies.map((movie) => {
                            const isSelected = selectedMovie?.id === movie.id;
                            return (
                                <div
                                    key={movie.id}
                                    onClick={() => setSelectedMovie(movie)}
                                    className={`flex-none w-[180px] flex flex-col cursor-pointer transition-all duration-300 group ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01] opacity-70 hover:opacity-100'}`}
                                >
                                    <div className={`aspect-[3/4.5] rounded-2xl overflow-hidden relative mb-4 border-2 transition-all duration-300 ${isSelected ? 'border-primary shadow-[0_0_20px_rgba(248,69,101,0.3)]' : 'border-white/5 shadow-xl'}`}>
                                        <img src={movie.poster_path} alt={movie.title} className="w-full h-full object-cover" />

                                        {/* Gradient Overlay for bottom text like screenshot */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                        {/* Stats on Poster like screenshot */}
                                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-primary fill-current" />
                                                <span className="text-[11px] font-bold text-white">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                                            </div>
                                            <span className="text-[10px] font-medium text-zinc-300">{movie.vote_count || "0"} Votes</span>
                                        </div>

                                        {isSelected && (
                                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[2px]">
                                                <div className="bg-primary text-white p-2.5 rounded-full shadow-2xl border-2 border-white/20">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-1 space-y-1">
                                        <h3 className="text-white font-bold text-[13px] truncate tracking-tight">{movie.title}</h3>
                                        <p className="text-zinc-500 text-[11px] font-bold tracking-wider">{movie.release_date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Form Section - Matching Layout from Screenshot */}
            <form onSubmit={handleSubmit} className="max-w-xl space-y-10">
                <div className="space-y-8">
                    {/* Show Price */}
                    <div className="space-y-4">
                        <label className="block text-white font-bold text-sm tracking-tight">Show Price</label>
                        <div className="relative group max-w-xs">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg leading-none">$</span>
                            <input
                                type="number"
                                placeholder="Enter show price"
                                className="w-full bg-[#1C1113] border border-white/5 rounded-xl py-4 pl-10 pr-6 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-bold placeholder:text-zinc-700 shadow-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-4">
                        <label className="block text-white font-bold text-sm tracking-tight">Select Date and Time</label>
                        <div className="flex gap-3 max-w-md">
                            <div className="relative flex-1 group">
                                <input
                                    type="datetime-local"
                                    className="w-full bg-[#1C1113] border border-white/5 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-bold shadow-lg appearance-none"
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={contextLoading || !selectedMovie}
                                className="px-6 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dull transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/20"
                            >
                                {contextLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Time"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Submit Button */}
                <button
                    type="submit"
                    disabled={contextLoading || !selectedMovie}
                    className="max-w-xs w-full bg-primary hover:bg-primary-dull text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/30 transition-all transform active:scale-[0.98] tracking-wider disabled:opacity-50 flex items-center justify-center gap-3 uppercase"
                >
                    {contextLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Show"}
                </button>
            </form>

            {/* Backdrop Blur Decoration */}
            <div className="fixed top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default AddShow;
