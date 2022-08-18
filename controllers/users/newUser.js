const insertUserQuery = require('../../db/userQueries/insertUserQuery');
const { validateSchema } = require('../../helpers');
const userSchema = require('../../schema');

const newUser = async (req, res, next) => {

    try {
        // We get the body fields
        const { username, email, password } = req.body;

        // We validate the body data with Joi's schema 
        await validateSchema(userSchema, req.body);

       /*  // If a field is missing we throw an error 
        if(!username || !email || !password) {
            throw generateError(`missing fields`, 400);
        } */

        // Insert a new user in the database 
        await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: 'Created User'
        })
        
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;