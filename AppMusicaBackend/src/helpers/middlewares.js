const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ error: 'No autorizado' });
    }

    try {
        const payload = jwt.verify(authHeader, 'secretkey');

        const user = await Usuarios.findById(payload.id);
        if (!user) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        req.userId = user._id;
        req.user = user;

        next();
    } catch (err) {
        return res.status(403).json({ error: 'No autorizado' });
    }
};

module.exports = { checkToken };
