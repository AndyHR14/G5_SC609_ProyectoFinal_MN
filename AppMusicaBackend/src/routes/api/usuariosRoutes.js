const express = require('express');  
const router = express.Router();  
const usuariosController = require('../../controllers/usuariosController');
const { checkToken } = require('../../helpers/middlewares');

router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);

router.get('/me', checkToken, usuariosController.getUsuario);

router.patch('/me', checkToken, usuariosController.updateUsuario);

module.exports = router;