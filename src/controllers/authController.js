import jwt from 'jsonwebtoken';

// TODO: À déplacer dans une base de données
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123',
    role: 'admin'
  }
];

/**
 * Classe AuthController
 * Gère toute la logique métier liée à l'authentification
 */
class AuthController {
  /**
   * Authentifie un utilisateur et génère un token JWT
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Recherche de l'utilisateur
      const user = users.find(user => user.username === username);
      if (!user || password !== user.password) {
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
      res.status(500).json({ message: "Erreur lors de l'authentification", error: error.message });
    }
  }

  /**
   * Récupère les informations de l'utilisateur connecté
   * @param {Request} req - L'objet requête Express
   * @param {Response} res - L'objet réponse Express
   */
  static async getMe(req, res) {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des informations utilisateur", error: error.message });
    }
  }
}

export default AuthController; 