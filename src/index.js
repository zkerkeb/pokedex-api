import express from 'express';
import cors from 'cors';
import pokemonsList from './data/pokemonsList.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Obtenir le chemin absolu du fichier actuel en utilisant les modules ES
const __filename = fileURLToPath(import.meta.url);
// __filename contient le chemin complet du fichier actuel

// Obtenir le chemin absolu du répertoire actuel
const __dirname = path.dirname(__filename);
// __dirname contient le chemin complet du répertoire où se trouve le fichier actuel

const app = express();
const PORT = 3000;

console.log(process.env);

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Route GET de base
app.get('/api/pokemons', (req, res) => {
    res.json(pokemonsList);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
