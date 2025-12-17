const mongoose = require('mongoose');

const playlistsSchema = new mongoose.Schema({

  titulo: { type: String, required: true },
  descripcion: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  canciones: [
    {
      cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
      orden: Number
    }
  ],
  privada: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }

}, { collection: 'Playlists' });

module.exports = mongoose.model('Playlists', playlistsSchema);
