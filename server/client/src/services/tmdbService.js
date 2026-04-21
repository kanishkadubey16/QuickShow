const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Helper to get headers
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (TMDB_ACCESS_TOKEN) {
        headers['Authorization'] = `Bearer ${TMDB_ACCESS_TOKEN}`;
    }
    return headers;
};

// Marvel Studios company ID
const MARVEL_STUDIOS_COMPANY_ID = 420;

// Log API key status for debugging
console.log('TMDB Service Loaded');
console.log('API Key present:', TMDB_API_KEY ? 'Yes' : 'No');

// Helper to make requests
const fetchFromTMDB = async (endpoint, params = '') => {
    try {
        const headers = getHeaders();
        const url = `${TMDB_BASE_URL}${endpoint}?${params || ''}${!TMDB_ACCESS_TOKEN ? `&api_key=${TMDB_API_KEY}` : ''}`;

        console.log(`Fetching from TMDB: ${endpoint}`);
        const response = await fetch(url, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`TMDB API Error (${response.status}):`, errorText);
            throw new Error(`TMDB API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch failed for ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Search for movies by query
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @returns {Promise<Array>} Array of matching movies
 */
export const searchMovies = async (query, page = 1) => {
    try {
        if (!query) return [];
        const data = await fetchFromTMDB(
            '/search/movie',
            `query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
        );

        if (!data || !data.results) {
            console.warn('No results found for search:', query);
            return [];
        }

        return data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
            backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : null,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            genre_ids: movie.genre_ids || [],
            genres: []
        }));
    } catch (error) {
        console.error('Error in searchMovies:', error);
        return [];
    }
};

/**
 * Fetch Marvel movies from TMDB using the Marvel Studios company ID
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of Marvel movies
 */
export const fetchMarvelMovies = async (page = 1) => {
    try {
        const data = await fetchFromTMDB(
            '/discover/movie',
            `with_companies=${MARVEL_STUDIOS_COMPANY_ID}&sort_by=popularity.desc&page=${page}`
        );

        if (!data || !data.results) {
            console.warn('No results found in Marvel movies response');
            return [];
        }

        // Transform TMDB data to match our app structure
        return data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
            backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : null,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            genre_ids: movie.genre_ids || [],
            genres: [] // Will be populated if details are fetched
        }));
    } catch (error) {
        console.error('Error in fetchMarvelMovies:', error);
        return []; // Return empty array instead of throwing to prevent app crash
    }
};

/**
 * Fetch detailed information about a specific movie including runtime and genres
 * @param {number} movieId - TMDB movie ID
 * @returns {Promise<Object>} Detailed movie information
 */
export const fetchMovieDetails = async (movieId) => {
    try {
        const data = await fetchFromTMDB(`/movie/${movieId}`);

        return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            poster_path: data.poster_path ? `${TMDB_IMAGE_BASE_URL}${data.poster_path}` : null,
            backdrop_path: data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${data.backdrop_path}` : null,
            release_date: data.release_date,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
            runtime: data.runtime,
            genres: data.genres || [],
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

/**
 * Fetch cast information for a specific movie
 * @param {number} movieId - TMDB movie ID
 * @returns {Promise<Array>} Array of cast members
 */
export const fetchMovieCast = async (movieId) => {
    try {
        const data = await fetchFromTMDB(`/movie/${movieId}/credits`);

        // Return top cast members with profile images
        return data.cast.slice(0, 15).map(person => ({
            name: person.name,
            character: person.character,
            profile_path: person.profile_path ? `${TMDB_IMAGE_BASE_URL}${person.profile_path}` : null,
        }));
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        return []; // Return empty array on error
    }
};

/**
 * Fetch trailers and videos for a specific movie
 * @param {number} movieId - TMDB movie ID
 * @returns {Promise<Array>} Array of video objects (trailers, teasers, etc.)
 */
export const fetchMovieVideos = async (movieId) => {
    try {
        const data = await fetchFromTMDB(`/movie/${movieId}/videos`);

        // Filter for YouTube trailers and teasers
        const trailers = data.results.filter(
            video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );

        return trailers.map(video => ({
            title: `${video.name}`,
            videoUrl: `https://www.youtube.com/embed/${video.key}`,
            image: `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`,
            type: video.type,
        }));
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        return []; // Return empty array on error
    }
};

/**
 * Fetch multiple Marvel movie trailers
 * @param {number} count - Number of movies to fetch trailers for
 * @returns {Promise<Array>} Array of trailer objects from multiple movies
 */
export const fetchMarvelTrailers = async (count = 5) => {
    try {
        // First, get popular Marvel movies
        const movies = await fetchMarvelMovies(1);

        // Fetch trailers for the first 'count' movies
        const trailerPromises = movies.slice(0, count).map(movie =>
            fetchMovieVideos(movie.id)
        );

        const trailersArrays = await Promise.all(trailerPromises);

        // Flatten and filter to get unique trailers
        const allTrailers = trailersArrays.flat();

        // Return unique trailers (avoid duplicates)
        return allTrailers.slice(0, count);
    } catch (error) {
        console.error('Error fetching Marvel trailers:', error);
        return [];
    }
};

/**
 * Fetch a featured Marvel movie for the hero section
 * @returns {Promise<Object>} Featured movie with full details
 */
export const fetchFeaturedMarvelMovie = async () => {
    try {
        // Get popular Marvel movies
        const movies = await fetchMarvelMovies(1);

        if (movies.length === 0) {
            throw new Error('No Marvel movies found');
        }

        // Get the most popular movie
        const featuredMovieId = movies[0].id;

        // Fetch detailed information
        const [details, cast, videos] = await Promise.all([
            fetchMovieDetails(featuredMovieId),
            fetchMovieCast(featuredMovieId),
            fetchMovieVideos(featuredMovieId),
        ]);

        return {
            ...details,
            casts: cast,
            trailer_url: videos.length > 0 ? videos[0].videoUrl : null,
        };
    } catch (error) {
        console.error('Error fetching featured Marvel movie:', error);
        throw error;
    }
};
