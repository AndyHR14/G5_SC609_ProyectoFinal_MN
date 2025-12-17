const mongoose = require('mongoose');

const comentariosSchema = new mongoose.Schema({

  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
  contenido: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }

}, { collection: 'Comentarios' });

module.exports = mongoose.model('Comentario', comentariosSchema);
