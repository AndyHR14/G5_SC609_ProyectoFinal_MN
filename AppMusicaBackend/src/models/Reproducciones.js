const mongoose = require('mongoose');

const reproduccionesSchema = new mongoose.Schema({

  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
  fechaReproduccion: { type: Date, default: Date.now }
  
}, { collection: 'Reproducciones' });

module.exports = mongoose.model('Reproduccion', reproduccionesSchema);
