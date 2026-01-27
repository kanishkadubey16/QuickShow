import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, ArrowLeft, Loader2, User, LayoutGrid, CheckSquare } from 'lucide-react';
import { assets, dummyShowsData } from '../assets/assets';
import { useAdmin } from '../context/AdminContext';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchAll, movies, seedDatabase, loading } = useAdmin();

    useEffect(() => {
        const initDashboard = async () => {
            await fetchAll();
        };
        initDashboard();
    }, []);

    // Auto-seed if database is empty - ensures a "full" experience immediately
    useEffect(() => {
        if (movies.length === 0 && !loading) {
            seedDatabase(dummyShowsData);
        }
    }, [movies, loading]);

    const menuItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutGrid },
        { label: 'Add Shows', path: '/admin/add-show', icon: PlusCircle },
        { label: 'List Shows', path: '/admin/list-show', icon: List },

    ];

    if (loading && movies.length === 0) {
        return (
            <div className="h-screen bg-[#09090B] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-zinc-500 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#09090B] text-zinc-300 font-inter">
            {/* Sidebar - Matching Screenshot */}
            <div className="w-64 border-r border-white/5 flex flex-col pt-6 bg-[#09090B]">
                <div className="px-6 mb-12">
                    <Link to="/">
                        <img src={assets.logo} alt="QuickShow" className="w-32" />
                    </Link>
                </div>

                {/* User Section (Matching Screenshot) */}
                <div className="px-6 mb-12 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7E4DFF] via-primary to-[#F84565] p-[2px] mb-4 shadow-[0_0_20px_rgba(248,69,101,0.2)]">
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-[#1C1113] flex items-center justify-center">
                                <User className="w-10 h-10 text-white opacity-90" />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-white tracking-wide">Admin User</p>
                </div>

                <nav className="flex-1 px-0 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative ${isActive
                                    ? 'text-primary bg-primary/5'
                                    : 'text-zinc-500 hover:text-white hover:bg-white/2'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(248,69,101,0.5)]"></div>
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-white transition-colors'}`} />
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 transition font-bold text-xs tracking-tight"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Application
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-[#09090B]">
                <div className="max-w-7xl mx-auto p-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
