import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pokemons.json'), 'utf8'));

const getPokemonById = (id) => {
    return pokemonsList.find((pokemon) => {
      return pokemon.id === parseInt(id)
    })
  }

  export default getPokemonById;