import express from 'express';
import AuthController from '../controllers/authController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes pour l'authentification
 */

// Route de connexion
router.post('/login', AuthController.login);

// Route protégée pour récupérer les informations de l'utilisateur connecté
router.get('/me', verifyToken, AuthController.getMe);

export default router; 