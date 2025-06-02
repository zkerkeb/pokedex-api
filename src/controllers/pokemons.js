import getPokemonById from "../utils/getPokemonById.js";
import writePokemonsList from "../utils/writePokemonList.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import PokemonSchema from "../schema/pokemon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pokemons.json'), 'utf8'));


 export const postPokemons = async (req, res) =>{
    const newPokemon = req.body
    try {
        const pokemon = await PokemonSchema.create(newPokemon)
        res.status(201).send({
            pokemon,
            message: "pokemon créé",
        });
    } catch (error) {
        return res.status(400).send({
            message: "une erreur est survenue",
            error: error.message
        });
    }

   
}

 export const getPokemons = async (req, res) =>{
    const {search} = req.query
    let pokemons;
    if (search) {
        pokemons = await PokemonSchema.find({
            $or: [
                { "name.english": { $regex: search, $options: 'i' } },
                { "name.french": { $regex: search, $options: 'i' } }
            ]
        });
    } else {
        pokemons = await PokemonSchema.find()
    }
    
    res.status(200).send({
        types: [
          "fire",
          "water",
          "grass",
          "electric",
          "ice",
          "fighting",
          "poison",
          "ground",
          "flying",
          "psychic",
          "bug",
          "rock",
          "ghost",
          "dragon",
          "dark",
          "steel",
          "fairy",
        ],
        pokemons: pokemons,
      });
}

export const getPokemonByIdController = async (req, res) => {
    const id = req.params.id;
    const pokemon = await PokemonSchema.findById(id)
    if (!pokemon) {
      return pokemonNotFound(res)
    }
    return res.status(200).send({
      pokemon,
      message: "pokemon trouvé",
    });
  }

  export const deletePokemonByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        await PokemonSchema.findByIdAndDelete(id)
    } catch (error) {
        return res.status(404).send({
            message: "pokemon non trouvé",
        });
    }
    res.status(200).send({
      message: "pokemon supprimé",
    });
  }


export const updatePokemonByIdController = async(req, res) => {
    const id = req.params.id;
    const pokemon = req.body
    try {
        const updatedPokemon = await PokemonSchema.findByIdAndUpdate(id, pokemon, {new: true})
        res.status(200).send({
            updatedPokemon,
            message: "pokemon modifié",
          });
    } catch (error) {
        return res.status(404).send({
            message: "pokemon non trouvé",
        });
    }
 
    
    
    
  
   
  }
