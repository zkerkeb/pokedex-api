/**
 * Classe utilitaire pour la gestion des erreurs
 */
class ErrorHandler {
  /**
   * Gère les erreurs liées aux Pokémons
   * @param {Response} res - L'objet réponse Express
   * @param {number} errorCode - Code d'erreur spécifique
   * @returns {Response} Réponse d'erreur formatée
   */
  static handlePokemonError(res, errorCode = 1) {
    let message = "Pokemon non trouvé";

    switch (errorCode) {
      case 1:
        message = "Pokemon non trouvé";
        break;
      case 2:
        message = "Erreur de validation du Pokemon";
        break;
      default:
        message = "Une erreur est survenue avec le Pokemon";
    }

    return res.status(404).json({
      type: "error",
      message,
    });
  }

  /**
   * Gère les erreurs d'authentification
   * @param {Response} res - L'objet réponse Express
   * @param {string} message - Message d'erreur personnalisé
   * @returns {Response} Réponse d'erreur formatée
   */
  static handleAuthError(res, message = "Erreur d'authentification") {
    return res.status(401).json({
      type: "error",
      message,
    });
  }

  /**
   * Gère les erreurs de validation
   * @param {Response} res - L'objet réponse Express
   * @param {Error} error - L'objet erreur
   * @returns {Response} Réponse d'erreur formatée
   */
  static handleValidationError(res, error) {
    return res.status(400).json({
      type: "error",
      message: "Erreur de validation",
      details: error.message
    });
  }
}

export default ErrorHandler; 