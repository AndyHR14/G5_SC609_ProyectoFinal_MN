const mongoose = require('mongoose');

const albumesSchema = new mongoose.Schema({
  artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
  titulo: { type: String, required: true },
  fechaLanzamiento: Date,
  tipo: { type: String, enum: ['LP', 'EP', 'Single'], required: true },
  generos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genero'
    }],
  coverImageUrl: String,
  totalCanciones: { type: Number, default: 0 }
}, { collection: 'Albumes' });

module.exports = mongoose.model('Album', albumesSchema);
