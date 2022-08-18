/* PUT [/services/:idService] - Modify or finish a service. TOKEN */ 
const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");
const updateServiceQuery = require("../../db/serviceQueries/updateServiceQuery");
const { generateError } = require("../../helpers");


const editService = async (req, res, next) => {
    
    try {
    
        
        const { idService } = req.params;

        const service = await selectServiceByIdQuery(idService);

        if (service.idUser !== req.user.id) {
            throw generateError('You do not have permissions', 401);
        }

        let { description, category, realized} = req.body;

        if( !description & !category & !realized){

            throw generateError('You must modify any field', 400);
        }


        description = description || service.description;
        category = category || service.category;
        realized = realized || service.realized;


        await updateServiceQuery(description, category, realized, idService)

        res.send({
            status: 'ok',
            message: 'Updated service!!!!'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = editService;