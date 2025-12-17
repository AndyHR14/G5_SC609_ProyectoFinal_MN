const express = require('express');  
const router = express.Router();  
const artistasController = require('../../controllers/artistasController');
const cancionesController = require('../../controllers/cancionesController');
const albumesController = require('../../controllers/albumesController');
const { checkToken } = require('../../helpers/middlewares');

router.get('/artista/:artistaId', albumesController.getAllAlbumesByArtistaId);
router.get('/', artistasController.getAll);
router.get('/canciones/:artistaId', cancionesController.getAllByArtistaId);
router.get('/:id', artistasController.getById);

router.post('/', checkToken , artistasController.create);
router.post('/search', artistasController.findByNameOrBio);

router.patch('/:id', checkToken , artistasController.updateArtistaById);
router.delete('/:id', checkToken, artistasController.deleteById);
module.exports = router;