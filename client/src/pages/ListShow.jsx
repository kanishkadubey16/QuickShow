import { Trash2, Loader2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const ListShow = () => {
    const { shows, deleteShow, loading } = useAdmin();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this show?")) {
            await deleteShow(id);
        }
    };

    if (loading && shows.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">List <span className="text-primary underline decoration-primary/30 underline-offset-8">Shows</span></h1>
            </div>

            {/* List Shows Table - Screenshot 2 */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="px-8 py-6 text-zinc-400 font-bold text-sm tracking-tight border-b border-white/5">Movie Name</th>
                                <th className="px-8 py-6 text-zinc-400 font-bold text-sm tracking-tight border-b border-white/5">Show Time</th>
                                <th className="px-8 py-6 text-zinc-400 font-bold text-sm tracking-tight border-b border-white/5 text-center">Total Bookings</th>
                                <th className="px-8 py-6 text-zinc-400 font-bold text-sm tracking-tight border-b border-white/5 text-right">Earnings</th>
                                <th className="px-8 py-6 text-zinc-400 font-bold text-sm tracking-tight border-b border-white/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {shows.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-zinc-500 font-medium">No shows available.</td>
                                </tr>
                            ) : (
                                shows.map((show, idx) => {
                                    return (
                                        <tr key={show._id} className="group hover:bg-primary/5 transition-all duration-300">
                                            <td className="px-8 py-6">
                                                <span className="text-white font-bold tracking-tight opacity-80 group-hover:opacity-100">{show.movie.title}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-zinc-400 font-medium text-sm group-hover:text-zinc-200">
                                                    {new Date(show.showDateTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-white font-bold">{show.totalBookings || 0}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="text-white font-black">$ {show.earnings || 0}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(show._id)}
                                                    className="p-2.5 rounded-xl bg-red-400/5 text-red-400 hover:bg-red-400 hover:text-white transition-all transform active:scale-90"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Backdrop Blur Decoration */}
            <div className="fixed bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default ListShow;
