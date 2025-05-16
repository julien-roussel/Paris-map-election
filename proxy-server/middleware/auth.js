const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('./error');

const verifyToken = (req, res, next) => {
    // Récupère le jeton toekn JWT à partir des cookies de la requête
    const token = req.cookies.access_token; 

    // Vérifier si il existe un token
    if(!token) return next(createError(401, 'Access denied !'))
    
    // Vérifier la validité du token
    jwt.verify(token, ENV.TOKEN, (error, user) => {
        // Si une erreur se produit
        if (error) return next(createError(403, 'Token non valide !', error.message))
        // Si token valide :
        req.user = user
        next()
    })
}

module.exports = verifyToken