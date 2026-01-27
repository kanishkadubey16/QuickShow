import express from 'express';
import {
    getAdminStats,
    addShow,
    listShows,
    deleteShow,
    seedMovies,
    getAllMovies
} from '../controllers/adminController.js';

const adminRouter = express.Router();

// Stats and Overview
adminRouter.get('/stats', getAdminStats);

// Show Management
adminRouter.get('/shows', listShows);
adminRouter.post('/shows', addShow);
adminRouter.delete('/shows/:id', deleteShow);

// Movie Management
adminRouter.get('/movies', getAllMovies);
adminRouter.post('/movies/seed', seedMovies);

export default adminRouter;
