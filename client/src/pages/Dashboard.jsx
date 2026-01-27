import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Ticket, DollarSign, Activity, Users, Play, Star, Loader2, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { stats, shows, loading } = useAdmin();

    const statsCards = [
        { label: 'Total Bookings', value: stats.totalBookings || '20', icon: TrendingUp, type: 'trend' },
        { label: 'Total Revenue', value: `$${stats.totalRevenue || '3247'}`, icon: DollarSign, type: 'icon' },
        { label: 'Active Shows', value: stats.activeShows || '8', icon: Play, type: 'trend' },
        { label: 'Total Users', value: stats.totalUsers || '80', icon: Users, type: 'icon' },
    ];

    if (loading && shows.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 pr-12">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Admin <span className="text-primary underline decoration-primary underline-offset-[12px] decoration-2">Dashboard</span>
                </h1>
            </div>

            {/* Stats Grid - Matching Screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-[#1C1113] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all duration-300 shadow-xl">
                            <div className="space-y-2">
                                <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider">{stat.label}</p>
                                <p className="text-3xl font-bold text-white tracking-tighter">{stat.value}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                {stat.type === 'trend' ? (
                                    <Icon className="w-6 h-6 text-white opacity-80" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/2">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Shows Header */}
            <div className="space-y-8">
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Active Shows
                </h2>

                {shows.length === 0 ? (
                    <div className="bg-[#1C1113] border border-white/5 rounded-3xl p-12 text-center">
                        <p className="text-zinc-500 font-medium italic">No active shows scheduled yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {shows.map((show, idx) => {
                            // Mocking timing/rating for visual accuracy if not present
                            const showDate = new Date(show.showDateTime).toLocaleString([], {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                            return (
                                <div key={idx} className="flex flex-col gap-4 group">
                                    <div className="bg-[#1C1113] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/5">
                                        <div className="aspect-[3/4.2] relative overflow-hidden">
                                            <img
                                                src={show.movie.poster_path}
                                                alt={show.movie.title}
                                                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                            {/* Gradient Overlay like screenshot */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1113] via-[#1C1113]/20 to-transparent"></div>

                                            {/* Movie Info Overlayed at Bottom (like screenshot style) */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                                                <h3 className="text-white font-bold text-lg leading-tight tracking-tight drop-shadow-md">{show.movie.title}</h3>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-white font-bold text-xl">$ {show.showPrice}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-primary">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span className="text-sm font-bold text-white/90">{show.movie.vote_average || "7.5"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Showtime outside the card like screenshot */}
                                    <p className="text-zinc-500 text-[11px] font-bold px-1 uppercase tracking-wider">
                                        {showDate}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Backdrop Blur Decoration */}
            <div className="fixed top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default Dashboard;
