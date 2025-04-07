import Pokemon from '../models/pokemon.js';

/**
 * Classe PokemonController
 * Gère toute la logique métier liée aux opérations sur les Pokémons
 */
class PokemonController {
  /**
   * Récupère tous les pokémons
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async getAllPokemons(req, res) {
    try {
      const pokemons = await Pokemon.find({});
      res.status(200).json({ pokemons });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des pokémons", error: error.message });
    }
  }

  /**
   * Récupère un pokémon par son ID
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async getPokemonById(req, res) {
    try {
      const pokemon = await Pokemon.findById(req.params.id);
      if (!pokemon) {
        return res.status(404).json({ message: "Pokemon non trouvé" });
      }
      res.status(200).json({ pokemon });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du pokémon", error: error.message });
    }
  }

  /**
   * Crée un nouveau pokémon
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async createPokemon(req, res) {
    try {
      const pokemon = await Pokemon.create(req.body);
      res.status(201).json({ pokemon });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création du pokémon", error: error.message });
    }
  }

  /**
   * Met à jour un pokémon
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async updatePokemon(req, res) {
    try {
      const pokemon = await Pokemon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!pokemon) {
        return res.status(404).json({ message: "Pokemon non trouvé" });
      }
      res.status(200).json({ pokemon });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour du pokémon", error: error.message });
    }
  }

  /**
   * Supprime un pokémon
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async deletePokemon(req, res) {
    try {
      const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
      if (!pokemon) {
        return res.status(404).json({ message: "Pokemon non trouvé" });
      }
      res.status(200).json({ message: "Pokemon supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du pokémon", error: error.message });
    }
  }
}

export default PokemonController; 