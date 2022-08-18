const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
    try {
        // We get the token from the header
        const { authorization } = req.headers;

        // If the token does not exist, we throw an error.
        if (!authorization) {
            throw generateError('Authorisation header missing', 401);
        }

        // Variable that will contain the token information  
        let payload;

        try {
            // We try to get the token info.
            payload = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Wrong Token', 401);
        }

        // We add a new property (we made it up) to the object "request" with the info of the payload.
        req.user = payload;

        // We skip to the next controller.  
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
