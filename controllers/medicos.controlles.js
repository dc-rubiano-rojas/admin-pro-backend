const { response } = require('express');
const Medico = require('../models/medicos.model');

const getMedico = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
};


const createMedico = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save({});
        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};


const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'UPDATED Medico'
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'DELETE Medico'
    });
};

module.exports = {
    getMedico,
    createMedico,
    actualizarMedico,
    borrarMedico
};