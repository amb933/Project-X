// The config method locates the .env file we have created in the root of the project and makes available the variables contained in the file.
require("dotenv").config();

// Chalk allows you to edit the colours displayed on the console.
const chalk = require('chalk');

// We import the function´s connection
const getConnection = require("./getConnection");

async function main() {
    // Variable to store a free connection to the database 
    let connection;
    try {
        connection = await getConnection();

        console.log(chalk.red('Delete tables...'));


        await connection.query('DROP TABLE IF EXISTS replies');
        await connection.query('DROP TABLE IF EXISTS services');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log(chalk.blue('Creating tables...'));

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                biography VARCHAR(250),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
                )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS services (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                title VARCHAR(100),
                description TEXT NOT NULL,
                file VARCHAR(100) NOT NULL,
                category ENUM ('Programming and Development',
                                   'Design and art',
                                   'Music and Audio',
                                   'Video and Animation',
                                   'Writing and Translation', 
                                   'Administrative and Secretary', 
                                   'Digital Marketing', 
                                   'Business', 
                                   'Various')
                DEFAULT 'Various',
                realized BOOLEAN NOT NULL DEFAULT false,
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS replies (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                idService INT UNSIGNED NOT NULL, 
                FOREIGN KEY (idService) REFERENCES services (id), 
                finalFile VARCHAR(100),
                observations TEXT,
                createdAt TIMESTAMP NOT NULL
            )
        `);

        console.log(chalk.green('¡Created tables!'));
    } catch (err) { 
        console.error(err);
    } finally {
        if (connection) connection.release();
         process.exit();   
        
    }

} 

main();