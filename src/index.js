import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import verifyToken from "./middlewares/verifytoken.js";
import getPokemonById from "./utils/getPokemonById.js";
import pokemonNotFound from "./utils/pokemonNotFound.js";
import writePokemonsList from "./utils/writePokemonList.js";
import {  postPokemons, getPokemons   } from "./controllers/pokemons.js";


dotenv.config();

// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/pokemons.json'), 'utf8'));

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors())

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));



// Route GET de base
app.get("/api/pokemons", getPokemons)
 


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.get("/me", (req, res) => {
  try{
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.status(200).send({ username: decoded.username });
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
});



app.get("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const pokemon = getPokemonById(id)

  if (!pokemon) {
    return pokemonNotFound(res)
  }

  return res.status(200).send({
    pokemon,
    message: "pokemon trouvé",
  });
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = getPokemonById(id)
  if (!pokemon) {
      return pokemonNotFound(res)
  }
  const pokemonListWithoutSelectedPokemon = pokemonsList.filter((pokemon) => {
    return pokemon.id !== parseInt(id)
  })
  writePokemonsList(pokemonListWithoutSelectedPokemon)

  res.status(200).send({
    message: "pokemon supprimé",
  });
})

app.put("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params)
  const pokemon = getPokemonById(id)
  if (!pokemon) {
    return pokemonNotFound(res)
  }
  const indexOfPokemon = pokemonsList.indexOf(pokemon)
  
  pokemonsList.splice(indexOfPokemon, 1, req.body)
  
  writePokemonsList(pokemonsList)

  res.status(200).send({
    pokemon: pokemonsList[indexOfPokemon],
    message: "pokemon modifié",
  });
})

app.post("/api/pokemons", postPokemons)


app.get("/", (req, res) => {
  res.send("bienvenue sur l'API Pokémon");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
