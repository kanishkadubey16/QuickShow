import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">QuickShow - Testing</h1>
                <p className="text-xl">If you see this, the app is loading correctly!</p>
                <p className="text-zinc-400 mt-4">TMDB integration will load next...</p>
            </div>
        </div>
    );
};

export default Home;
