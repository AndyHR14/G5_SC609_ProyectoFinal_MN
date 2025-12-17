const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({

  nombre: { type: String, required: true, unique: true },
  descripcion: String

}, { collection: 'Generos' });

module.exports = mongoose.model('Genero', generoSchema);
