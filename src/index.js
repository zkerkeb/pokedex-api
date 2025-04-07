import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
import pokemonRoutes from './routes/pokemonRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configuration des variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Configuration de base pour Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des chemins pour les fichiers statiques
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Routes principales
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/auth', authRoutes);

// Route de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon");
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue !',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne du serveur'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
