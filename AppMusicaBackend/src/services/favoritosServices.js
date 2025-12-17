const Favoritos = require('../models/Favoritos');

class FavoritosServices {

    async findFavoritosByUserId(userId) {
        return await Favoritos.findAll({ usaurio: { userId } });
    }

    async findAndUpdateFavoritosByUserId(userId, updateData) {
        return await Favoritos.findOneAndUpdate(
            { usuario: userId },
            updateData,
            { new: true}
        );
    }

}

module.exports = new FavoritosServices();