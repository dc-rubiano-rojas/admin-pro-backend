/*  Ruta:'/api/hospitales' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    getMedicoById,
    createMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controlles');

const router = Router();


router.get('/', validarJWT, getMedicos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        check('hospital', 'El HospitalID debe ser valido').isMongoId(), // Me comprueba que el id que le pase sea un id valid de mongodb
        validarCampos // Me valida los checks
    ],
    createMedico);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        validarCampos // Me valida los checks
    ],
    actualizarMedico);


router.delete('/:id', validarJWT, borrarMedico);

router.get('/:id', validarJWT, getMedicoById);


module.exports = router;