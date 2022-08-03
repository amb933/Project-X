const getConnection = require("../getConnection");

const updateServiceQuery = async (title, description, file, category, realized, idService) => {

    let connection;

    try {

        connection = await getConnection();

        await connection.query(
            `UPDATE services SET title = ?, description = ?, file = ?, category = ?, realized = ?, modifiedAt = ? WHERE id = ?`,
            [title, description, file, category, realized, new Date(), idService]
        )
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateServiceQuery;