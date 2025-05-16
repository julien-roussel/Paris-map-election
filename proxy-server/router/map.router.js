// importation du module express
const express = require('express');
// Création  d'un router express
const app = express.Router();

const MapController = require('../controller/map.controller')

app.get('/getbydepartement', MapController.getMapByDepartement)
app.get('/alldepartement', MapController.getAllDepartement)

module.exports = app;