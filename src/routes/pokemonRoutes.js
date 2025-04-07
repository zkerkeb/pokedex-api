/**
 * @fileoverview Routes pour la gestion des Pokémons
 * Ce fichier contient toutes les routes liées aux opérations CRUD sur les Pokémons
 */

import express from 'express';
import { 
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon
} from '../controllers/pokemonController.js';

import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/pokemons
 * @desc    Récupère tous les Pokémons
 * @access  Privé
 */
router.get('/', verifyToken, getAllPokemons);

/**
 * @route   GET /api/pokemons/:id
 * @desc    Récupère un Pokémon par son ID
 * @access  Public
 */
router.get('/:id', getPokemonById);

/**
 * @route   POST /api/pokemons
 * @desc    Crée un nouveau Pokémon
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, createPokemon);

/**
 * @route   PUT /api/pokemons/:id
 * @desc    Met à jour un Pokémon
 * @access  Admin
 */
router.put('/:id', verifyToken, isAdmin, updatePokemon);

/**
 * @route   DELETE /api/pokemons/:id
 * @desc    Supprime un Pokémon
 * @access  Admin
 */
router.delete('/:id', verifyToken, isAdmin, deletePokemon);

export default router; 