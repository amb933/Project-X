
const getConnection = require('../getConnection');

const insertServiceQuery = async ( idUser, title, description, file, category, realized ) => {
    let connection;

    try {

        connection = await getConnection();

        const [ newService ] = await connection.query(
            `
            INSERT INTO services ( idUser, title, description, file, category, realized, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)

            `, [idUser, title, description, file, category, realized, new Date()]
        );

      return newService.insertId;

    }  finally {
        if (connection) connection.release();
    }
}

module.exports = insertServiceQuery;