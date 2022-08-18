// We create the connection to the database
const mysql = require('mysql2/promise'); // We load the MySQL promise version in order to be able to use async and await
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Reference to pool connections 
let pool;


const getConnection = async () => {

    try {
        if(!pool) {
            pool = mysql.createPool({
                
                    connectionLimit: 10,
                    host: MYSQL_HOST,
                    user: MYSQL_USER,
                    password: MYSQL_PASS,
                    database: MYSQL_DB,
                    timezone: 'Z',
            });
        }
    
        return await pool.getConnection();
    
        
    } catch (err) {
        console.error(err);
        throw new Error('MySQL connection error');

    }
}   

module.exports = getConnection;