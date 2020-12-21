const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la petición'
        });
    }

    try {
        // uid fue lo que yo grabe en el token
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        // Establezco en la request el id para poder usarlo
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};


module.exports = {
    validarJWT,
}