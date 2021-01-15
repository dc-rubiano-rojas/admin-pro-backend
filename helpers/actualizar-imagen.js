const fs = require('fs');

const Hospital = require('../models/hospitals.model');
const Medico = require('../models/medicos.model');
const Usuario = require('../models/usuario.model');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // Borrar imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {

        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro médico con ese id');
                return false;
            }

            const pathViejoMedico = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejoMedico);

            medico.img = nombreArchivo;
            await medico.save();
            return true;


        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro hospital con ese id');
                return false;
            }

            const pathViejoHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejoHospital);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;


        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro usuario con ese id');
                return false;
            }

            const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejoUsuario);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
};


module.exports = {
    actualizarImagen
};