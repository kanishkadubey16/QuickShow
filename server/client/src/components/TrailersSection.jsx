import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { fetchMarvelTrailers } from '../services/tmdbService';

const TrailersSection = ({ limit = 6 }) => {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    useEffect(() => {
        const loadTrailers = async () => {
            try {
                setLoading(true);
                // Fetch trailers based on the limit prop
                const data = await fetchMarvelTrailers(limit);
                setTrailers(data);
                if (data.length > 0) {
                    setSelectedTrailer(data[0]);
                }
            } catch (error) {
                console.error("Failed to load trailers:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTrailers();
    }, [limit]); // Re-fetch if limit changes

    if (loading) {
        return <div className="text-white text-center py-20 animate-pulse">Loading trailers...</div>;
    }

    if (trailers.length === 0) {
        return <div className="text-zinc-500 text-center py-20">No trailers available at the moment.</div>;
    }

    return (
        <div className="py-2">
            {/* Main Player */}
            <div className="mb-12">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10 group">
                    <iframe
                        width="100%"
                        height="100%"
                        src={selectedTrailer ? selectedTrailer.videoUrl : trailers[0]?.videoUrl}
                        title="Trailer Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                <h3 className="text-2xl font-bold text-white mt-6">
                    {selectedTrailer ? selectedTrailer.title : trailers[0]?.title}
                </h3>
            </div>

            {/* Trailer Grid */}
            <h2 className="text-xl font-bold text-zinc-400 mb-6">More Trailers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trailers.map((trailer, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            setSelectedTrailer(trailer);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`group cursor-pointer`}
                    >
                        <div className={`relative aspect-video rounded-xl overflow-hidden mb-3 transition-all duration-300 ${selectedTrailer === trailer ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                            }`}>
                            <img
                                src={trailer.image}
                                alt={trailer.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 flex items-center justify-center transition">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition">
                                    <Play className="w-5 h-5 text-white fill-current" />
                                </div>
                            </div>
                        </div>
                        <h4 className={`text-sm font-medium line-clamp-2 transition ${selectedTrailer === trailer ? 'text-primary' : 'text-zinc-300 group-hover:text-white'
                            }`}>
                            {trailer.title}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrailersSection;
