const createError = require('./error');

// Model
const Users     = require('../models/user.model');

const verifyAdmin = async (req, res, next) => {
    // Vérifier si l'utilisateur est connecté
    if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
    
    // Trouver l'utilisateur connecté
    const userToken = await Users.findById(req.user.id);
    if(!userToken) return next(createError(404, 'User not found'))

    // Vérifier si l'utilisateur est admin
    if( userToken.role !== 'admin' &
        userToken.role !== 'superAdmin') {
            return next(createError(403, 'Access denied'))
    }

    return userToken;
}

module.exports = verifyAdmin