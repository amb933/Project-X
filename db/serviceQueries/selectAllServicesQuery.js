const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectAllServicesQuery = async (keyword = '') => {

    let connection;

    try {



        connection = await getConnection();

        let [ services ] = await connection.query(
           `
<<<<<<< HEAD
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
       INNER JOIN users U ON S.idUser = U.id
       WHERE S.title LIKE ?
       GROUP BY S.id
       ORDER BY S.createdAt DESC
=======
        SELECT S.id, 
           S.title, 
           S.description, 
           S.file, 
           S.category, 
           S.idUser, 
           U.username,
           S,realized,
           S.createdAt
           FROM services S
           WHERE title LIKE ?
           GROUP BY S.id
>>>>>>> 421dba4f880a2cb079d100510742c861b8963105
           
           `,
           [ `%${keyword}%`]
        );

        if (services.length < 1) {
            throw generateError(`We didn't find any service`, 404);
        }

        return services;

    } finally {
        if(connection) connection.release();
    }
};

module.exports = selectAllServicesQuery;