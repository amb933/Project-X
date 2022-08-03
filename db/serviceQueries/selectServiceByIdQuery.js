const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectServiceByIdQuery = async ( idServices ) => {

    let connection;

    try {

        connection = await getConnection();

        const [services] = await connection.query(
            `
            SELECT S.id, 
                    S.idUser,
                    U.username,
                    S.title,
                    S.description, 
                    S.file,
                    S.category,
                    S.realized, 
                    S.createdAt 
                FROM services S
                LEFT JOIN users U ON S.idUser = U.id
                WHERE S.id = ?
                GROUP BY S.id
                ORDER BY S.createdAt DESC
            `,
            [ idServices ]
        );

        if (services.length < 1) {
            throw generateError(`We didn't find any service`, 404);
        }

        return services[0];
        
    } finally {
        if (connection) connection.release();
    }
}

module.exports = selectServiceByIdQuery;