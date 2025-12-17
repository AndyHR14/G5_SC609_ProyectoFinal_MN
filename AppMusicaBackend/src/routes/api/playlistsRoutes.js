const express = require('express');  
const router = express.Router();  
const PlaylistsController = require('../../controllers/playlistsController');
const { checkToken } = require('../../helpers/middlewares');

router.get('/', PlaylistsController.getPlaylists);
router.get('/user/:userId', PlaylistsController.findPlaylistsByUserId);
router.get('/:id', PlaylistsController.obtenerPlaylistPorId);

router.post('/search', PlaylistsController.findByNameOrBioLike);
router.post('/', checkToken, PlaylistsController.crearPlaylist);

router.patch('/:id', checkToken, PlaylistsController.updatePlaylistById);

module.exports = router;