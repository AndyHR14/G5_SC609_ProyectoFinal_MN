const UsuariosService = require('../services/usuariosService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosController {

    async register(req, res) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        try {
            const user = await UsuariosService.register(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UsuariosService.findByEmail(email);
            if (!user) {
                return res.status(400).json({ error: 'Error usuario y/o contraseña' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ error: 'Error usuario y/o contraseña' });
            }

            const token = jwt.sign({ id: user._id }, 'secretkey',);
            res.status(200).json({ token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getUsuario(req, res) {
        const userId = req.userId;
        try {
            const user = await UsuariosService.findById(userId);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateUsuario(req, res) {
        const userId = req.userId;
        const updateData = req.body;

        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            const updatedUser =
                await UsuariosService.updateUsuarioById(userId, updateData);

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }


}

module.exports = new UsuariosController();