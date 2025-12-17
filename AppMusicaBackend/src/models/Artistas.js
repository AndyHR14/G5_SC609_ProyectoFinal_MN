const mongoose = require('mongoose');

const artistasSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  bio: String,
  coverImageUrl: String,
  generos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero',
    default: []
  }],
  seguidores: { type: Number, default: 0 }
}, { collection: 'Artistas' });

module.exports = mongoose.model('Artista', artistasSchema);
