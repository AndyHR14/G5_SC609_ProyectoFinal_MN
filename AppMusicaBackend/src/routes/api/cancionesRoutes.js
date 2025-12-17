const express = require('express');
const router = express.Router();
const cancionesController = require('../../controllers/cancionesController');
const { checkToken } = require('../../helpers/middlewares');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/tmp'
}));

router.post('/upload', checkToken, cancionesController.uploadCancion);
router.post('/search', cancionesController.findByTituloLike);

router.delete('/:cancionId', checkToken, cancionesController.deleteById);

router.patch('/:cancionId', checkToken, cancionesController.updateCancion);

module.exports = router;