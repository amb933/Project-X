//The config method locates the .env file we have created in the root of the project and makes available the variables contained in the file.
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
// Chalk allows you to edit the colours displayed on the console.
const chalk = require('chalk');

const { PORT, UPLOADS_DIR } = process.env 

const app = express();

// Middleware that uses the "morgan" logger.
app.use(morgan('dev'));

// Middleware that deserialises a "raw" formatted body and makes it available in "req.body".
app.use(express.json());


// Middleware that deserialises a "form-data" formatted body.
app.use(fileUpload());

// We indicate which is the directory of the static files.
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

    // User register
    app.post('/users', newUser);

    // User login
    app.post('/users/login', loginUser);

    // Information of a logged in user
    app.get('/users', authUser, getOwnUser);

    // Edit a user
    app.put('/users', authUser, editUser);

/**
 * ########################
 * ## Endpoints Services ##
 * ########################
 */
    const { newService, listServices, getService, replyService, editService } = require('./controllers/services');

    // Registration of a new service.
    app.post('/services', authUser, newService);

    // List Services
    app.get('/services', authUserOptional, listServices);

    // Info on a specific service
    app.get('/services/:idService', authUserOptional, getService);

    // Choose a service
    app.post('/services/:idService', authUser, replyService);

    // Edit a service
    app.put('/services/:idService', authUser, editService);
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


// Launch the server 
    app.listen(PORT, () => {
        console.log(chalk.yellow(`Server listening at http://localhost:${PORT}`));
    });



