const Playlists = require('../models/Playlists');

class PlaylistsServices {
    async getPlaylists() {
        return await Playlists.find();
    }

    async obtenerPlaylistPorId(id) {
        return await Playlists.findById(id);
    }

    async crearPlaylist(data) {
        const nuevaPlaylist = new Playlists(data);
        return await nuevaPlaylist.save();
    }

    async updatePlaylistById(id, data) {
        return await Playlists.findByIdAndUpdate(id, data, { new: true });
    }

    async findPlaylistsByUserId(userId) {
        return await Playlists.find({ usuario: userId });
    }

    async findByNameOrBioLike(text) {
        return await (Playlists.find({
          $or: [
            { titulo: { $regex: text, $options: 'i' } },
            { descripcion: { $regex: text, $options: 'i' } }
          ]
        }));
      }
}

module.exports = new PlaylistsServices();