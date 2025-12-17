const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    fechaRegistro: { type: Date, required: true, default: Date.now}

}, { collection: 'Usuarios' }); 

module.exports = mongoose.model('Usuarios', UsuariosSchema);

