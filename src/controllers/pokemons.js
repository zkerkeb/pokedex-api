import getPokemonById from "../utils/getPokemonById.js";
import writePokemonsList from "../utils/writePokemonList.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pokemons.json'), 'utf8'));


 export const postPokemons = (req, res) =>{
    const newPokemon = req.body
    const pokemon = getPokemonById(newPokemon.id)
    if (pokemon) {
        return res.status(400).send({
            message: "pokemon déjà existant",
        });
    }
    pokemonsList.push(newPokemon)
    writePokemonsList(pokemonsList)
    res.status(201).send({
        pokemon: newPokemon,
    });
}

 export const getPokemons = (req, res) =>{
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
        pokemons: pokemonsList,
      });
}




