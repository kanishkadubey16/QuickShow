import React from 'react';
import TrailersSection from '../components/TrailersSection';

const Trailers = () => {
    return (
        <div className="min-h-screen bg-[#09090B] pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20">
                <h1 className="text-4xl font-bold text-white mb-10 flex items-center gap-3">
                    <span className="w-2 h-10 bg-primary rounded-full"></span>
                    Latest Trailers
                </h1>

                {/* Reusing the existing component but making it the main content */}
                <TrailersSection limit={20} />
            </div>
        </div>
    );
};

export default Trailers;
