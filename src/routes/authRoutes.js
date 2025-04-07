/**
 * @fileoverview Routes pour l'authentification
 * Ce fichier contient toutes les routes liées à l'authentification des utilisateurs
 */

import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authentifie un utilisateur
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Récupère les informations de l'utilisateur connecté
 * @access  Privé
 */
router.get('/me', verifyToken, getMe);

export default router; 