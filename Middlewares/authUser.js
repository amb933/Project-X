const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera.
        const { authorization } = req.headers;

        // Si no hay token lanzamos un error.
        if (!authorization) {
            throw generateError('Falta la cabecera de autorización', 401);
        }

        // Variable que contendrá la información del token 
        let payload;

        try {
            // Intentamos obtener la info del token.
            payload = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Token incorrecto', 401);
        }

        // Agregamos una nueva propiedad (nos la inventamos) al objeto "request" con la info
        // del payload.
        req.user = payload;

        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
