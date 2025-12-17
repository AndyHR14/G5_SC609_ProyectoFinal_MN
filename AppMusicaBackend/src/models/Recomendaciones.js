const mongoose = require('mongoose');

const recomendacionesSchema = new mongoose.Schema({
  
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cancionesRecomendadas: [
    {
      cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
      score: Number
    }
  ],
  fechaGeneracion: { type: Date, default: Date.now }

}, { collection: 'Recomendaciones' });

module.exports = mongoose.model('Recomendacion', recomendacionesSchema);
