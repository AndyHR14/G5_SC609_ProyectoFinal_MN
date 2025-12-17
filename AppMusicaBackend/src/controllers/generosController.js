const GenerosService = require('../services/generosService');

class GenerosController {
    async obtenerGeneros(req, res) {
        try {
            const generos = await GenerosService.obtenerGeneros();
            res.status(200).json(generos);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener los géneros', error });
        }
    }

    async obtenerGeneroPorId(req, res) {
        try {
            const genero = await GenerosService.obtenerGeneroPorId(req.params.id);
            if (!genero) {
                return res.status(404).json({ mensaje: 'Género no encontrado' });
            } 
            res.status(200).json(genero);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener el género', error });
        }
    }

    async crearGenero(req, res) {
        try {
            const nuevoGenero = await GenerosService.crearGenero(req.body); 
            res.status(201).json(nuevoGenero);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear el género', error });
        }
    }

    async actualizarGenero(req, res) {
        try {
            const generoActualizado = await GenerosService.updateGeneroById(req.params.id, req.body);
            if (!generoActualizado) {
                return res.status(404).json({ mensaje: 'Género no encontrado' });
            }
            res.status(200).json(generoActualizado);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar el género', error });
        }
    }

    async eliminarGenero(req, res) {
    try {
        const eliminado = await GenerosService.eliminarGenero(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Género no encontrado' });
        }
        res.status(200).json({ mensaje: 'Género eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el género', error });
    }
}

}

module.exports = new GenerosController();