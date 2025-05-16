// Function pour générer des messages d'erreur plus clairs
const createError = (status, message, details = null) => {
    // Créer une nouvelle instance d'erreur vide
    const error = new Error(message);

    // Défini le code d'état de l'erreur 
    // en fonction des paramètres de la fonction
    error.status = status;
    error.details = details;
    return error
}

module.exports = createError;