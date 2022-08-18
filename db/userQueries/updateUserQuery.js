const getConnection = require('../getConnection');

const updateUserQuery = async (username, biography, email, avatar, idUser) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE users SET username = ?, biography = ?, email = ?, avatar = ?, modifiedAt = ? WHERE id = ?`,
            [username, biography, email, avatar, new Date(), idUser]
        );

    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserQuery;