const express = require('express');
const router = express.Router();
const albumesController = require('../../controllers/albumesController');
const cancionesController = require('../../controllers/cancionesController');
const { checkToken } = require('../../helpers/middlewares');

router.post('/', checkToken, albumesController.createAlbum);
router.post('/search', albumesController.findByTituloLike);

router.get('/', albumesController.getAll);
router.get('/canciones/:albumId', cancionesController.getCancionesByAlbumId);

router.delete('/:albumId', albumesController.deleteAlbumById);

router.patch('/:albumId', checkToken, albumesController.updateAlbumById);

module.exports = router;