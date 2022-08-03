const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");

const getService = async (req, res, next) => {

    try {

        const { idServices } = req.params;

        const service = await selectServiceByIdQuery(idServices, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                service,
            },
        });
        
    } catch (err) {
        next(err);
    }
}

module.exports = getService;