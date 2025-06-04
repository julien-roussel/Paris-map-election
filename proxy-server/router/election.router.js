// importation du module express
const express = require('express');
// Création  d'un router express
const app = express.Router();
const verifyToken = require('../middleware/auth')

const ElecController = require('../controller/election.controller')

app.get('/candidats', ElecController.getAllCandidats)
app.get('/allname/offline/', ElecController.getAllNameElectionsNoConnected)
app.get('/allname/online/:id', verifyToken, ElecController.getAllNameElectionsConnected)
app.get('/allname/member/:id', verifyToken, ElecController.getAllNameElectionsMember)
app.get('/bureau/:slug/:bureauId', ElecController.getElectionByBv)
app.get('/offline', ElecController.getResultElectionNoConnected)
app.get('/online/:id', verifyToken, ElecController.getResultElectionConnected)
app.get('/member/:slug/:id', verifyToken, ElecController.getResultElectionMember)

module.exports = app;