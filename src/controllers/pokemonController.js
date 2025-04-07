/**
 * @fileoverview Contrôleur pour la gestion des Pokémons
 * Ce fichier contient toute la logique métier liée aux opérations CRUD sur les Pokémons
 */

import Pokemon from '../models/pokemon.js';

/**
 * Réponse standard pour un Pokémon non trouvé
 * @param {Response} res - L'objet response d'Express
 * @returns {Response} Réponse 404 avec message d'erreur
 */
const pokemonNotFound = (res) => {
  return res.status(404).send({
    type: "error",
    message: "Pokemon non trouvé",
  });
};

/**
 * Récupère tous les Pokémons
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.status(200).send({ pokemons, user: req.user });
  } catch (error) {
    res.status(500).send({
      type: "error",
      message: "Erreur lors de la récupération des Pokémons",
      error: error.message
    });
  }
};

/**
 * Récupère un Pokémon par son ID
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return pokemonNotFound(res);
    }
    return res.status(200).send(pokemon);
  } catch (error) {
    return pokemonNotFound(res);
  }
};

/**
 * Crée un nouveau Pokémon
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const createPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    res.status(201).send({
      type: "success",
      message: "Pokemon ajouté avec succès",
      pokemon: pokemon,
    });
  } catch (error) {
    res.status(400).send({
      type: "error",
      validationErrors: error._message,
      errors: error.errors,
      apiError: error.errmsg,
      message: "Erreur lors de la création du Pokemon",
    });
  }
};

/**
 * Met à jour un Pokémon existant
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pokemon) {
      return pokemonNotFound(res);
    }
    return res.status(200).send({
      type: "success",
      message: "Pokemon mis à jour avec succès",
      pokemon: pokemon,
    });
  } catch (error) {
    return pokemonNotFound(res);
  }
};

/**
 * Supprime un Pokémon
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const deletePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) {
      return pokemonNotFound(res);
    }
    res.status(200).send({
      type: "success",
      message: "Pokemon supprimé avec succès",
    });
  } catch (error) {
    return pokemonNotFound(res);
  }
}; 