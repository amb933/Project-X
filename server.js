//Esto siempre al principio
//El método config localiza el fichero .env que hayamos creado en la raíz del proyecto y pone disponibles las variables que figuren en el fichero
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
// chalk pone colorinchos en la consola
const chalk = require('chalk');

const {PORT} = process.env 

const app = express();

app.use(express.json());
app.use(morgan('dev'));


/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const { newUser } = require('./controllers/users');

// Registro de usuario
app.post('/users', newUser)





/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

 app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send(chalk.magenta({
        status: 'error',
        message: 'Not found!',
    }));
});


//Vamos a lanzar el servidor
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server listening at http://localhost:${PORT}`));
});



