import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    genres: [{
        id: Number,
        name: String
    }],
    release_date: { type: String },
    original_language: { type: String, default: 'en' },
    tagline: { type: String },
    vote_average: { type: Number, default: 0 },
    vote_count: { type: Number, default: 0 },
    runtime: { type: Number },
    trailer_url: { type: String }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
