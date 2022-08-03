const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');


const insertMatchQuery = async (idUser, idServices) => {

    let connection;

    try {

        connection = await getConnection();

         const [ matches ] = await connection.query(
            `
            SELECT id FROM matches WHERE idUser = ? AND idServices = ?
            `,
            [ idUser, idServices]
        );

        if ( matches.length > 0 ) {
            throw generateError(`You have alredy select this service`, 403);
        } 

        await connection.query(
            `
            INSERT INTO matches (idUser, idServices, createdAt)
            VALUES (?, ?, ?)
            `,
            [ idUser, idServices, new Date()]
        );

        
    } finally {
        if (connection) connection.release();
    }
}

module.exports = insertMatchQuery;