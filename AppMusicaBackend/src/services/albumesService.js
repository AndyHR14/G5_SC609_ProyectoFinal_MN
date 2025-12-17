const Albumes = require('../models/Albumes');

class AlbumesService {

    async getAllAlbumesByArtistaId(artista) {
        return await Albumes.find({ artista: artista }); 
    }

    async createAlbum(data) {
        if (data.generos && !Array.isArray(data.generos)) {
            data.generos = [data.generos];
        }
        return await Albumes.create(data);
    }

    async findByTituloLike(text) {
        if (!text) return [];

        return await Albumes.find({ 
            titulo: { $regex: text, $options: 'i' }
        });
    }
    
    async deleteAlbumById(albumId) {
        return await Albumes.findByIdAndDelete(albumId);
    }

    async updateAlbumById(albumId, updateData) {
        return await Albumes.findByIdAndUpdate(albumId, updateData, { new: true });
    }
    async getAll() {
    return await Albumes.find({}); 
}

}

module.exports = new AlbumesService();