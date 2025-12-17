const AlbumesService = require('../services/albumesService');

class AlbumesController {

    async getAllAlbumesByArtistaId(req, res) {
        try {
            const artistaId = req.params.artistaId;
            const albumes = await AlbumesService.getAllAlbumesByArtistaId(artistaId);
            res.status(200).json(albumes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createAlbum(req, res) {
        try {

            const albumData = req.body;

            if (albumData.generos && !Array.isArray(albumData.generos)) {
                albumData.generos = [albumData.generos];
            }

            const newAlbum = await AlbumesService.createAlbum(albumData);
            res.status(201).json(newAlbum);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    async findByTituloLike(req, res) {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Search text is required' });
            }

            const albumes = await AlbumesService.findByTituloLike(text);
            res.status(200).json(albumes);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteAlbumById(req, res) {
        try {
            const albumId = req.params.albumId;
            await AlbumesService.deleteAlbumById(albumId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateAlbumById(req, res) {
        try {
            const albumId = req.params.albumId;
            const updateData = req.body;
            const updatedAlbum = await AlbumesService.updateAlbumById(albumId, updateData);
            res.status(200).json(updatedAlbum);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
    try {
        const albumes = await AlbumesService.getAll();
        res.status(200).json(albumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}


module.exports = new AlbumesController();