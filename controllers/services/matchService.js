const insertMatchQuery = require('../../db/serviceQueries/insertMatchQuery');
const selectServiceByIdQuery = require('../../db/serviceQueries/selectServiceByIdQuery');
const { generateError } = require('../../helpers');

const matchService = async (req, res, next) => {

    try {
        
        const { idServices } = req.params;

       
        const match = await selectServiceByIdQuery( idServices );

        if (match.idUser === req.user.id) {
            throw generateError(`You cant't select your own service`, 403);
        }

        await insertMatchQuery(req.user.id, idServices);

        res.send({
            status: 'ok',
            message: 'Selected service'
        })

       

    } catch (err) {
        next(err);
    }
}

module.exports = matchService; 