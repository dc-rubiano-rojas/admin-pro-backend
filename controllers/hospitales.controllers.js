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




const actualizarHospital = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id',
            });
        }

        // hospitalDB.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid // Actualizo la ultima persona que hizo la modificación
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};




const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id',
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};



module.exports = {
    getHospital,
    createHospital,
    actualizarHospital,
    borrarHospital
};