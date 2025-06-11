const createError = require('../middleware/error');
const nodemailer = require('nodemailer');
const ENV = require('../config/env')
const path = require('path');

// Model
const Users = require('../models/user.model');

// Route pour charger les nuances politiques des candidats
const postContact = async (req, res, next) => {
    // Vérifier si le formulaire est complet
    if(!req.body) return res.status(400).json({ error: "Champs des formulaires vides." });

    const { titre, message, objet } = req.body;
    if (!titre || !message || !objet) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Vérifier si l'utilisateur est connecté 
    if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
    
    // Vérifier si l'utilisateur existe
    const user = await Users.findById(req.params.id);
    if(!user) return next(createError(404, 'User not found'))
        
    // Vérifier si l'utilisateur est authentifié
    if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))

    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587, 
            secure: false, // Pour le protocole SSL qui est obsolète
            auth: {
                user: ENV.EMAIL_USER,
                pass: ENV.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: `"${user.firstname} ${user.lastname}" <${user.email}>`,
            to: process.env.EMAIL_USER,
            subject: `"Form contact : ${objet}"`,
            html: ` <h1>Form contact</h1><br/>
                    <h2>Message de ${user.firstname} ${user.lastname}</h2><br/>
                    <p><${user.email}</p>
                    <p>Vous avez reçu un nouveau message du formulaire de contact du site Sufframap :</p>
                    ${message}
            `,
        });

        res.status(200).json({ message: "Message envoyé avec succès." });
    } catch (error) {
        next(createError(500, error.message))
    }
}

module.exports = {
    postContact
}
