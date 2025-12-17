const express = require('express');
const router = express.Router();
const FavoritosController = require('../../controllers/favoritosController');
const {checkToken} = require('../../helpers/middlewares');

router.get('/usuario/:userId', checkToken, FavoritosController.getFavoritosByUserId);

router.patch('/usuario/:userId', checkToken, FavoritosController.updateFavoritosByUserId);

module.exports = router;