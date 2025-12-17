const CancionesService = require('../services/cancionesService');
const { uploadFile, deleteFile } = require('../config/cloudinary');


class CancionesController {

    async getAllByArtistaId(req, res) {
        try {
            const canciones = await CancionesService.getAllCancionesByArtistaId(req.params.artistaId);
            res.status(200).json(canciones);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async uploadCancion(req, res) {
        try {

            const data = { ...req.body };

            if (data.artistas && !Array.isArray(data.artistas)) {
                data.artistas = [data.artistas];
            }

            if (data.generos && !Array.isArray(data.generos)) {
                data.generos = [data.generos];
            }

            const result = await uploadFile(req.files.cancion);

            const cancion = await CancionesService.createCancion({
                ...data,
                cloudinaryPublicId: result.public_id,
                cloudinarySecureUrl: result.secure_url
            });

            res.json(cancion);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async findByTituloLike(req, res) {
        try {
            const { text } = req.body;
            const canciones = await CancionesService.findByTituloLike(text || "");
            res.status(200).json(canciones);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteById(req, res) {
    try {
        // Solo una operación de borrado en DB
        const deletedCancion = await CancionesService.deleteCancionById(req.params.cancionId);
        
        if (!deletedCancion) {
            return res.status(404).json({ error: "La canción no existe" });
        }

        // Borrar archivo de Cloudinary
        if (deletedCancion.cloudinaryPublicId) {
            await deleteFile(deletedCancion.cloudinaryPublicId);
        }

        res.status(200).json({ message: "Eliminado con éxito" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

    async getCancionesByAlbumId(req, res) {
        try {
            const canciones = await CancionesService.getCancionesByAlbumId(req.params.albumId);
            res.status(200).json(canciones);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateCancion(req, res) {
        try {
            const cancionId = req.params.cancionId;
            const data = { ...req.body };
            const updatedCancion = await CancionesService.updateCancion(cancionId, data);
            if (!updatedCancion) {
                return res.status(404).json({ error: 'Canción no encontrada' });
            }
            res.status(200).json(updatedCancion);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new CancionesController();