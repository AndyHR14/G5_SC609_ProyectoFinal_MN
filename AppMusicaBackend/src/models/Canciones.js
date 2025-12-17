const mongoose = require('mongoose');

const CancionesSchema = new mongoose.Schema({

    titulo: { type: String, required: true },
    artistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artista', default: [] }],
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', default: null },
    generos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        default: []
      }],
    duracion: { type: String, default: '0:00' },
    numeroPista: Number,
    fechaLanzamiento: { type: Date, required: true },
    coverImageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    cloudinarySecureUrl: { type: String, required: true },
    reproduccionesTotales: { type: Number, default: 0 }

}, { collection: 'Canciones' });

CancionesSchema.index({ titulo: 'text' });

module.exports = mongoose.model('Cancion', CancionesSchema);