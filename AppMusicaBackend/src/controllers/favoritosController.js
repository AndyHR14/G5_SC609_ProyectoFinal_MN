const FavoritosServices = require('../services/favoritosServices');

class FavoritosController {
    async getFavoritosByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const favoritos = await FavoritosServices.findFavoritosByUserId(userId);
            res.status(200).json(favoritos);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving favoritos' });
        }
    }
    
    async updateFavoritosByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const updateData = req.body;
            const updatedFavoritos = await FavoritosServices.findAndUpdateFavoritosByUserId(userId, updateData);
            res.status(200).json(updatedFavoritos);
        } catch (error) {
            res.status(500).json({ error: 'Error updating favoritos' });
        }
    }
}

module.exports = new FavoritosController();