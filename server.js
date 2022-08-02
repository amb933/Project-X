//Esto siempre al principio
//El método config localiza el fichero .env que hayamos creado en la raíz del proyecto y pone disponibles las variables que figuren en el fichero
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
// chalk pone colorinchos en la consola
const chalk = require('chalk');

const { PORT, UPLOADS_DIR } = process.env 

const app = express();

// Middleware que hace uso del logger "morgan".
app.use(morgan('dev'));

// Middleware que deserializa un body con formato "raw" y lo pone disponible en "req.body".
app.use(express.json());


// Middleware que deserializa un body con formato "form-data".
app.use(fileUpload());

// Indicamos cual es el directorio de los ficheros estáticos.
app.use(express.static(UPLOADS_DIR));


/**
 * #################
 * ## Middlewares ##
 * #################
 */
const authUser = require('./Middlewares/authUser');
const authUserOptional = require('./Middlewares/authUserOptional');


/**
 * ######################
 * ## Endpoints Users ##
 * ######################
 */
const { newUser, loginUser, getOwnUser, editUser  } = require('./controllers/users'); 

// Registro de usuario
app.post('/users', newUser);

// Login de usuario
app.post('/users/login', loginUser);

// Info de un usuario loguedo
app.get('/users', authUser, getOwnUser);

// Editar un usuario
app.put('/users', authUser, editUser);


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
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});


//Vamos a lanzar el servidor
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server listening at http://localhost:${PORT}`));
});



