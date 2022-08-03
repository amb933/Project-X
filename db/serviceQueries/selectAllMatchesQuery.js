const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');


const selectAllMatchesQuery = async (idMatch) => {

    let connection;

    try {

        connection = await getConnection();

        const [ matches ] = await connection.query(
            `
            SELECT id, idUser, idServices, createdAt
            FROM matches WHERE id = ?
            GROUP BY id
            `,
            [idMatch]
        );

        if (matches.lenght < 1) {
            throw generateError(`We didnn't found any service selected`, 404);

        }
        console.log('!!!!!!!!!!!!!!!!!!!!', idMatch);
        return matches;
        
    } finally{
        if (connection) connection.release();
    }


}

module.exports = selectAllMatchesQuery;