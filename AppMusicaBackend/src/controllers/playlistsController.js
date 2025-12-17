const PlaylistsServices = require('../services/playlistsServices');

class PlaylistsController {
    async getPlaylists(req, res) {
        try {
            const playlists = await PlaylistsServices.getPlaylists();
            res.status(200).json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPlaylistPorId(req, res) {
        try {
            const playlist = await PlaylistsServices.obtenerPlaylistPorId(req.params.id);
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist no encontrada' });
            }
            res.status(200).json(playlist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async crearPlaylist(req, res) {
        try {
            const data = {
                ...req.body,
                user: req.userId
            };

            const nuevaPlaylist = await PlaylistsServices.crearPlaylist(data);
            res.status(201).json(nuevaPlaylist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePlaylistById(req, res) {
        try {
            const playlistActualizada = await PlaylistsServices.updatePlaylistById(req.params.id, req.body);
            if (!playlistActualizada) {
                return res.status(404).json({ error: 'Playlist no encontrada' });
            }
            res.status(200).json(playlistActualizada);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findPlaylistsByUserId(req, res) {
        try {
            const playlists = await PlaylistsServices.findPlaylistsByUserId(req.params.userId);
            res.status(200).json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByNameOrBioLike(req, res) {
        try {
            const playlists = await PlaylistsServices.findByNameOrBioLike(req.query.text);
            res.status(200).json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PlaylistsController();