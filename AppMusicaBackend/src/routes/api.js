const express = require('express');  
const router = express.Router();  

router.use('/usuarios', require('./api/usuariosRoutes'));
router.use('/artistas', require('./api/artistasRoutes'));
router.use('/canciones', require('./api/cancionesRoutes'));
router.use('/generos', require('./api/generosRoutes'));
router.use('/albumes', require('./api/albumesRoutes'));
router.use('/playlists', require('./api/playlistsRoutes'));
router.use('/favoritos', require('./api/favoritosRoutes'));

module.exports = router;
