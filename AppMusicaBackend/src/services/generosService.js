const Generos = require('../models/Generos');

class GenerosService {
    async obtenerGeneros() {
        return await Generos.find();
    }

    async obtenerGeneroPorId(id) {
        return await Generos.findById(id);
    }

    async crearGenero(data) {
        const nuevoGenero = new Generos(data);
        return await nuevoGenero.save();
    }

    async updateGeneroById(id, data) {
        return await Generos.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminarGenero(id) {
    return await Generos.findByIdAndDelete(id);
}

}

module.exports = new GenerosService();