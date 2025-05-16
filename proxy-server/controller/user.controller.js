const ENV = require('../config/env');
const bcrypt    = require('bcrypt')
const jwt      = require('jsonwebtoken')
const createError = require('../middleware/error')

// Model
const Users     = require('../models/user.model');

const signUp = async (req, res, next) => {
    try {
        // Créer un mdp crypté à partir du password de la request
        const passwordHashed = await bcrypt.hash(req.body.password, 10);

        // Créer un user à partir du body de la request
        const user = await Users.create({
            ...req.body,
            password: passwordHashed
        });

        res.status(201).json({
            message: 'user created',
            user
        })
    } catch(error) {
        next(createError(500, error.message))
    }
}

const getAllUser = async(req, res, next) => {
    try {
        const result = await Users.find();
        if(result) res.status(200).json(result);
    } catch(error) {
        next(createError(500, error.message))
    }
}

const verifyUser = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "Non authentifié" });

    try {
        const decoded = jwt.verify(token, ENV.TOKEN);
        res.status(200).json({ message: "Utilisateur connecté", userId: decoded.id });
    } catch (error) {
        next(createError(500, error.message))
    }
}

const getById = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté 
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
    
        // Vérifier si l'utilisateur existe
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
            
        // Vérifier si l'utilisateur est authentifié
        if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))
        
        // Mettre à jour l'utilisateur avec le body de la request
        const response = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(response)
    } catch(error) {
        next(createError(500, error.message))
    }
}

const login = async (req, res, next) => {
    try {
        // Vérifier si le mail de l'utilisateur existe
        const user = await Users.findOne({email: req.body.email});
        if(!user) return next(createError(404, "User not found"));

        // Vérifier si le mdp correspond bien au mdp existant
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword) return next(createError(400, "Wrong password !"))
        
        // Authentification réussi : 
        // Générer un token 
        const token = jwt.sign(
            {   id: user._id    },
            ENV.TOKEN,
            {   expiresIn: "24h"    }
        )

        // Déstructuration de l'user 
        // pour tout récupérer sauf le mdp
        const { password, ...others } = user._doc
        
        // On renvoie la res JSON en deux étapes : 
        // 1 - Ajout du token dans les cookies
        // 2 - Statut 200 - on renvoie l'user sans mdp
        res.cookie('access_token', token, { 
                httpOnly: true,
                maxAge: 24*60*60*1000, // 24 Heures
                secure: false,
                sameSite: 'Lax',})
            .status(200).json({others})

    } catch(error) {
        next(createError(500, error.message))
    }
}

const updateUser = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté 
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
        
        // Vérifier si l'utilisateur existe
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
            
        // Vérifier si l'utilisateur est authentifié
        if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))
        
        // Mettre à jour l'utilisateur avec le body de la request
        const response = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(response)
    } catch(error) {
        next(createError(500, error.message))
    }
}

const desactivateUser = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
            
        // Trouver l'utilisateur connecté
        const userToken = await Users.findById(req.user.id);
        if(!userToken) return next(createError(404, 'User not found'))
            
        // Trouver si l'utilisateur existe 
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
        
        // Vérifier si l'utilisateur est authentifié
        // Ou si l'utilisateur est admin
        if( userToken._id.toString() !== user.id.toString() &
            userToken.role === 'user') {
                return next(createError(403, 'Access denied'))
        }

        // Mettre à jour l'état activé de l'utilisateur
        const userDesactivated = await Users.findByIdAndUpdate(
            user.id, 
            {isActive: false}, 
            {new: true}
        );
        res.status(200).json({message:"User desactivated", userDesactivated})
    } catch(error) {
        next(createError(500, error.message))
    }
}

module.exports = {
    signUp,
    getAllUser,
    getById,
    verifyUser,
    login,
    updateUser,
    desactivateUser,
}