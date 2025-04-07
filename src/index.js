/**
 * @fileoverview Point d'entrée principal de l'application
 * Configuration et démarrage du serveur Express
 */

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Routes
import pokemonRoutes from './routes/pokemonRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configuration
import connectDB from "./config/connectdb.js";

// Configuration des variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Configuration de __dirname pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Routes
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/auth', authRoutes);

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
