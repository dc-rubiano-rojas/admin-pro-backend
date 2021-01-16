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


const actualizarMedico = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Medico con ese id',
            });
        }

        // hospitalDB.nombre = req.body.nombre;
        const medicoCambios = {
            ...req.body,
            usuario: uid // Actualizo la ultima persona que hizo la modificación
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, medicoCambios, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};




const borrarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medicosDB = await Medico.findById(id);

        if (!medicosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Medico con ese id',
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getMedico,
    createMedico,
    actualizarMedico,
    borrarMedico
};