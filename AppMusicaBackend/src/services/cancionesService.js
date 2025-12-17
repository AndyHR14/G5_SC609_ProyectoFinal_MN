const Canciones = require('../models/Canciones');
class CancionesService {

    basePopulate(query) {
        return query
            .populate({
                path: 'artistas',
                select: 'nombre'
            })
            .populate({
                path: 'album',
                select: 'titulo'
            })
            .populate({
                path: 'generos',
                select: 'nombre'
            });
    }

    async getAllCancionesByArtistaId(artista) {
        return await this.basePopulate(
            Canciones.find({ artistas: artista })
        );
    }

    async findByTituloLike(text) {
        if (!text || text.trim() === "") {
            return await this.basePopulate(
                Canciones.find({})
            );
        }
        return await this.basePopulate(
            Canciones.find({ titulo: { $regex: text, $options: 'i' } })
        );
    }

    async getCancionesByAlbumId(albumId) {
        return await this.basePopulate(
            Canciones.find({ album: albumId })
        );
    }

    async createCancion(data) {
        if (data.artistas && !Array.isArray(data.artistas)) {
            data.artistas = [data.artistas];
        }

        if (data.generos && !Array.isArray(data.generos)) {
            data.generos = [data.generos];
        }

        return await Canciones.create(data);
    }

    async deleteCancionById(cancionId) {
        return await Canciones.findByIdAndDelete(cancionId);
    }

    async updateCancion(cancionId, data) {
        if (data.artistas && !Array.isArray(data.artistas)) {
            data.artistas = [data.artistas];
        }
        if (data.generos && !Array.isArray(data.generos)) {
            data.generos = [data.generos];
        }
        return await Canciones.findByIdAndUpdate(cancionId, data, { new: true });
    }
}

module.exports = new CancionesService();