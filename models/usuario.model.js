const { Schema, model } = require('mongoose');


const UsuarioSchema = new Schema({

    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    google: { type: Boolean, default: false },

});

// Cambia el _id que viene por defecto de mongoose a renombrarlo como uid
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

// Mongoose le pone el plural a Usuario lo deja como Usuarios
module.exports = model('Usuario', UsuarioSchema);