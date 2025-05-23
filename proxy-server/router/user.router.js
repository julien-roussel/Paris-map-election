// importation du module express
const express = require('express');
// Création  d'un router express
const router = express.Router();
const verifyToken = require('../middleware/auth')

const UserController = require('../controller/user.controller')
const UserControllerAdmin = require('../controller/userAdmin.controller')

// User controller
router.get('/all', UserController.getAllUser)
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/verify/', UserController.verifyUser)
router.get('/signup/verify/:token', UserController.verifySignUp)
router.get('/getbyid/:id', verifyToken, UserController.getById)
router.patch('/update/:id', verifyToken, UserController.updateUser)
router.put('/desactivate/:id', verifyToken, UserController.desactivateUser)

// Admin controller
router.delete('/delete/:id', verifyToken, UserControllerAdmin.deleteUser)
router.put('/activate/:id', verifyToken, UserControllerAdmin.activateUser)


module.exports = router;