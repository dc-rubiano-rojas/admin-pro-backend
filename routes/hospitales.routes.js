/*  Ruta:'/api/hospitales' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospital,
    createHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales.controllers');

const router = Router();


router.get('/', validarJWT, getHospital);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos // Me valida los checks
    ],
    createHospital);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos // Me valida los checks
    ],
    actualizarHospital);


router.delete('/:id', validarJWT, borrarHospital);


module.exports = router;