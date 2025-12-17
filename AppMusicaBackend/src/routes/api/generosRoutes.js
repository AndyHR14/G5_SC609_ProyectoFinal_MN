const express = require('express');
const router = express.Router();
const generosController = require('../../controllers/generosController');
const { checkToken } = require('../../helpers/middlewares');

router.get('/', generosController.obtenerGeneros);
router.get('/:id', generosController.obtenerGeneroPorId);

router.post('/', checkToken, generosController.crearGenero);

router.patch('/:id', checkToken, generosController.actualizarGenero);
router.delete('/:id', checkToken, generosController.eliminarGenero);
module.exports = router;