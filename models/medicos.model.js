const { Schema, model } = require('mongoose');


const MedicoSchema = new Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }, // El nombre de ref se le pone el mismo de como se exporto este esquema
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true }
});

// {collection: 'hospitales'} se usa para que mongoose guarde mi collection con este nombre
// ya que si no se pone el agrega el plural en ingles por lo cual quedaría hospitals

// Cambia el _id que viene por defecto de mongoose a renombrarlo como uid
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Mongoose le pone el plural a Usuario lo deja como Usuarios
module.exports = model('Medico', MedicoSchema);