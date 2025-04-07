import jwt from 'jsonwebtoken';

/**
 * Middleware de vérification du token JWT
 * Vérifie la présence et la validité du token dans les headers de la requête
 * @param {Request} req - L'objet requête Express
 * @param {Response} res - L'objet réponse Express
 * @param {NextFunction} next - Fonction pour passer au middleware suivant
 */
const verifyToken = (req, res, next) => {
  try {
    // Récupération du token depuis le header Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé: aucun token fourni' });
    }

    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Accès refusé: token invalide' });
      }
      
      // Ajout des informations utilisateur décodées à l'objet request
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification du token", error: error.message });
  }
};

export default verifyToken; 