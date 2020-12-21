const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: '**Email o contraseña no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o **contraseña no encontrado'
            });
        }

        // Generar el TOKEN - JWT
        // podemos poner usuarioDB.id igual mongo sabra que 
        // estamos haciendo referencia al id
        const token = await generarJWT(usuarioDB._id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};


module.exports = {
    login
};