const getConnection = require("../getConnection");

const updateServiceQuery = async ( description, category, realized, idService) => {

    let connection;

    try {

        connection = await getConnection();

        await connection.query(
            `UPDATE services SET 
<<<<<<< HEAD
            description = ?, 
=======
            title = ?, 
            description = ?, 
            file = ?, 
>>>>>>> 421dba4f880a2cb079d100510742c861b8963105
            category = ?, 
            realized = ?, 
            modifiedAt = ? 
            WHERE id = ?`,
<<<<<<< HEAD
            [ description, category, realized, new Date(), idService]
=======
            [title, description, file, category, realized, new Date(), idService]
>>>>>>> 421dba4f880a2cb079d100510742c861b8963105
        )
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateServiceQuery;