import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import saveJson from "./utils/saveJson.js";
import connectDB from "./config/connectdb.js";
import Pokemon from "./schema/pokemon.js";

dotenv.config();

connectDB();
// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/pokemons.json"), "utf8")
);

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Route GET de base
app.get("/api/pokemons", async (req, res) => {
  const pokemons = await Pokemon.find();
  res.status(200).send({ pokemons });
});

const pokemonNotFound = (res) => {
  return res.status(404).send({
    type: "error",
    message: "Pokemon not found",
  });
};

app.get("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return pokemonNotFound(res);
    }
    return res.status(200).send(pokemon);
  } catch (error) {
    return pokemonNotFound(res);
  }
});

app.post("/api/pokemons", async (req, res) => {
  const newPokemon = req.body;
  try {
    const pokemon = await Pokemon.create(newPokemon);
    res.status(201).send({
      type: "success",
      message: "Pokemon added",
      pokemon: pokemon,
    });
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error)
    res.status(400).send({
      type: "error",
      validationErrors: error._message,
      errors: error.errors,
      apiError: error.errmsg ,
      message: "Pokemon not added",
    });
  }
});

app.delete("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) {
      return pokemonNotFound(res);
    }
    res.status(200).send({
      type: "success",
      message: "Pokemon deleted",
    });
  } catch (error) {
    return pokemonNotFound(res);
  }
});

app.put("/api/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send({
      type: "success",
      message: "Pokemon updated",
      pokemon: pokemon,
    });
  } catch (error) {
    return pokemonNotFound(res);
  }
});

app.get("/", (req, res) => {
  res.send("bienvenue sur l'API Pokémon");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
