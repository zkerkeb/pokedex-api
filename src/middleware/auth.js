/**
 * @fileoverview Middlewares d'authentification
 * Ce fichier contient les middlewares pour la vérification du token JWT et des rôles
 */

import jwt from 'jsonwebtoken';

/**
 * Middleware pour vérifier le token JWT
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 * @param {NextFunction} next - Fonction pour passer au middleware suivant
 */
export const verifyToken = (req, res, next) => {
  try {
    // Récupération du token depuis le header Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).send({
        message: "Token d'authentification manquant",
        type: "error"
      });
    }

    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Token d'authentification invalide",
          type: "error"
        });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      message: "Erreur lors de la vérification du token",
      type: "error"
    });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur est admin
 * @param {Request} req - L'objet request d'Express
 * @param {Response} res - L'objet response d'Express
 * @param {NextFunction} next - Fonction pour passer au middleware suivant
 */
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({
      message: "Accès refusé : droits d'administrateur requis",
      type: "error"
    });
  }
  next();
}; 