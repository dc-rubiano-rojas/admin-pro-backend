const path = require('path');
const fs = require('fs');

// Esta librería me sirve para generar nombres unicos
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload = (req, res = response) => {
    const { tipo, id } = req.params;

    const tiposValido = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValido.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'No es un medicos, usuario u hospital'
        });
    }

    // Valida que exista archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la image ....
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // el archivo puede ser nombre.1.1.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'JPG', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
};





const retornaImagen = (req, res = response) => {
    const { tipo, foto } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen Por Defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
};





module.exports = {
    fileUpload,
    retornaImagen
};