const { response } = require('express');
const Hospital = require('../models/hospitals.model');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};


const createHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save({});

        res.json({
            ok: true,
            hospital: hospitalDB
        });


    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};


const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'UPDATED HOSPITALS'
    });
};

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'DELETE HOSPITALS'
    });
};

module.exports = {
    getHospital,
    createHospital,
    actualizarHospital,
    borrarHospital
};