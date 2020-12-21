require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();


// =============Middlewares==========
// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// ==================================


// Base de datos
dbConnection();


// RUTAS
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});