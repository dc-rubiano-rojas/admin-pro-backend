const { Schema, model } = require('mongoose');


const HospitalSchema = new Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { collection: 'hospitales' });

// {collection: 'hospitales'} se usa para que mongoose guarde mi collection con este nombre
// ya que si no se pone el agrega el plural en ingles por lo cual quedaría hospitals

// Cambia el _id que viene por defecto de mongoose a renombrarlo como uid
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Mongoose le pone el plural a Usuario lo deja como Usuarios
module.exports = model('Hospital', HospitalSchema);