import express from 'express';
import PokemonController from '../controllers/pokemonController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes pour les opérations CRUD sur les Pokémons
 * Toutes les routes commencent par /api/pokemons
 */

// Routes publiques
router.get('/', PokemonController.getAllPokemons);
router.get('/:id', PokemonController.getPokemonById);

// Routes protégées nécessitant une authentification
router.post('/', verifyToken, PokemonController.createPokemon);
router.put('/:id', verifyToken, PokemonController.updatePokemon);
router.delete('/:id', verifyToken, PokemonController.deletePokemon);

export default router; 