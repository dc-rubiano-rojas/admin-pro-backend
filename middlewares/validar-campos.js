const { response } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req); // Recojo las validaciones que me llegan por el req

    if (!errores.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
};



module.exports = {
    validarCampos
};