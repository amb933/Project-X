const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');


const selectAllMatchesQuery = async (idService) => {

    let connection;

    try {

        connection = await getConnection();

        const [matches] = await connection.query(
            `
            SELECT M.id, 
                M.idUser, 
                U.username,
                M.idServices,
                S.title, 
                M.createdAt
            FROM matches M
            INNER JOIN users U ON S.idUser = U.id
            INNER JOIN services S ON S.idServices = S.id
            WHERE S.id = ?
            GROUP BY id
            `,
            [idService]
        );

        if (matches.lenght < 1) {
            throw generateError(`We didnn't found any service selected`, 404);

        }
        console.log('!!!!!!!!!!!!!!!!!!!!', matches);
        return matches;
        
    } finally{
        if (connection) connection.release();
    }


}

module.exports = selectAllMatchesQuery;