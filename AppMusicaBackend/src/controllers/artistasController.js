const ArtistasService = require('../services/artistasService');

class ArtistasController {

    async getAll(req, res) {
        try {
            const artistas = await ArtistasService.findAll();
            res.status(200).json(artistas);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const artista = await ArtistasService.findById(req.params.id);
            if (artista) {
                res.status(200).json(artista);
            } else {
                res.status(404).json({ error: 'Artista no encontrado' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const newArtista = await ArtistasService.create(req.body);
            res.status(201).json(newArtista);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async findByNameOrBio(req, res) {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Search text is required' });
            }

            const artistas = await ArtistasService.findByNameOrBioLike(text);
            res.status(200).json(artistas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateArtistaById(req, res) {
        try {
            const updatedArtista = await ArtistasService.updateArtistaById(req.params.id, req.body);
            if (updatedArtista) {
                res.status(200).json(updatedArtista);
            } else {
                res.status(404).json({ error: 'Artista no encontrado' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteById(req, res) {
    try {
        await ArtistasService.deleteById(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

}

module.exports = new ArtistasController();