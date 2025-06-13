// importation du module express
const express = require('express');
// Création  d'un router express
const app = express.Router();
const verifyToken = require('../middleware/auth')
const contactLimiter = require('../middleware/limit')
const { body, validationResult } = require("express-validator");

const ContactController = require('../controller/contact.controller')

app.post(
    '/message/:id', 
    verifyToken, 
    contactLimiter, 
    [
        body("titre").trim().notEmpty().withMessage("Titre requis."),
        body("objet").trim().notEmpty().withMessage("Objet requis."),
        body("message").trim().isLength({ min: 10 }).withMessage("Message trop court."),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
        }
        next();
    },
    ContactController.postContact)

module.exports = app;