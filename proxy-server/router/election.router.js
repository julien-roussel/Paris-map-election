// importation du module express
const express = require('express');
// Création  d'un router express
const app = express.Router();

const ElecController = require('../controller/election.controller')

app.get('/candidats', ElecController.getAllCandidats)
app.get('/allname', ElecController.getAllNameElections)
app.get('/:slug/:bureauId', ElecController.getElectionByBv)
app.get('/:slug', ElecController.getResultElection)

module.exports = app;