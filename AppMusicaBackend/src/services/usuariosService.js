const Usuarios = require('../models/Usuarios');

class UsuariosService {

    async register(data) {
        const user = new Usuarios(data);
        await user.save();
        return user;
    }

    async findByEmail(email) {
        return await Usuarios.findOne({ email });
    }

    async findById(id) {
        return await Usuarios.findById(id);
    }

    async updateUsuarioById(id, data) {
        return await Usuarios.findByIdAndUpdate(id, data, { new: true });
    }

}

module.exports = new UsuariosService();