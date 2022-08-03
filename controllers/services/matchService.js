const insertMatchQuery = require('../../db/serviceQueries/insertMatchQuery');
const selectServiceByIdQuery = require('../../db/serviceQueries/selectServiceByIdQuery');

const matchService = async (req, res, next) => {

    try {
        
        const { idService } = req.params;

        await selectServiceByIdQuery(idService, req.user.id);

        const match = await insertMatchQuery(idService, req.user.id);

        res.send({
            status: 'ok',
            message: 'just selected a service',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = matchService; 