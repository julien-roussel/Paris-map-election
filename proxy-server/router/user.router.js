// importation du module express
const express = require('express');
// Création  d'un router express
const router = express.Router();
const verifyToken = require('../middleware/auth')

const UserController = require('../controller/user.controller')

// User controller
router.get('/all', UserController.getAllUser)
router.post('/add', UserController.signUp)
router.post('/login', UserController.login)
router.put('/update/:id', verifyToken, UserController.updateUser)
router.put('/desactivate/:id', verifyToken, UserController.desactivateUser)


module.exports = router;