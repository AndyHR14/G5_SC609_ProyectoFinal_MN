const mongoose = require('mongoose');

const favoritosSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', unique: true },
  canciones: [
    {
      cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
      fechaAgregacion: { type: Date, default: Date.now }
    }
  ]
}, { collection: 'Favoritos' });

module.exports = mongoose.model('Favoritos', favoritosSchema);
