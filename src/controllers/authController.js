/**
 * @fileoverview Contrôleur pour la gestion de l'authentification
 * Ce fichier contient toute la logique métier liée à l'authentification des utilisateurs
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// TODO: À déplacer dans une base de données en production
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123',
    role: 'user'
  }
];

/**
 * Gère la connexion des utilisateurs
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherche de l'utilisateur
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // En production, utiliser bcrypt.compare()
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Création du payload JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    // Génération du token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * Récupère les informations de l'utilisateur connecté
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 */
export const getMe = (req, res) => {
  res.status(200).send({ user: req.user });
}; 