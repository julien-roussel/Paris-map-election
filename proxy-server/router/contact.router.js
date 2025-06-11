// importation du module express
const express = require('express');
// Création  d'un router express
const app = express.Router();
const verifyToken = require('../middleware/auth')

const ContactController = require('../controller/contact.controller')

app.post('/message/:id', verifyToken, ContactController.postContact)

module.exports = app;