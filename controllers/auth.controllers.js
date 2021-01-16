const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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



const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@', // La persona no podra autenticarse con esto. Se pone solo porque en el modelo es requerido
                img: picture,
                google: true
            });
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // Al cambiar la contraseña la persona pierde el metodo
            // de autenticacion por contraseña y se cambia a google
            usuario.password = '@@@';
        }

        // Guardar en base de datos
        await usuario.save();

        // Generar JsonWebToken
        const token = await generarJWT(usuario._id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
};


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar JsonWebToken
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
};


module.exports = {
    login,
    googleSignIn,
    renewToken
};