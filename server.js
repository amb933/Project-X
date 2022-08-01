//Esto siempre al principio
//El método config localiza el fichero .env que hayamos creado en la raíz del proyecto y pone disponibles las variables que figuren en el fichero
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const {PORT} = process.env 

const app = express();

app.use(express.json());
app.use(morgan('dev'));



//Vamos a lanzar el servidor
app.listen(PORT)
