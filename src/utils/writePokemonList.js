import fs from "fs";
import path from "path";

const writePokemonsList = (newPokemonsList) => {
    fs.writeFileSync(path.join(__dirname, './data/pokemons.json'), JSON.stringify(newPokemonsList, null, 2))
  }

  export default writePokemonsList;