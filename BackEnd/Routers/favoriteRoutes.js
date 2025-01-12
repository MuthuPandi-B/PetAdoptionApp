import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../Controllers/favoriteController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addFavorite);
router.post('/remove', authMiddleware, removeFavorite);
router.get('/', authMiddleware, getFavorites);

export default router;
