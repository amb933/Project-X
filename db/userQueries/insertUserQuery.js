const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');
const chalk = require('chalk');

const insertUserQuery = async (username, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        // We get an array of users based on the username.
        const [usernameUsers] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        // If there is any user with that username we throw an error
        if (usernameUsers.length > 0) {
            throw generateError(
                'Username already exists in database',
                403
            );
        }

        // We get an array of users based on the email or the username.
        const [emailUsers] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // If there is any user with that email we throw an error.
        if (emailUsers.length > 0) {
            throw generateError(
                'Email already exists in database',
                403
            );
        }

        // Encrypt the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a user 
        await connection.query(
            `INSERT INTO users (username, email, password, createdAt) VALUES (?, ?, ?, ?)`,
            [username, email, hashedPassword, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
