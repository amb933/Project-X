const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");
const updateServiceQuery = require("../../db/serviceQueries/updateServiceQuery");
const { generateError, saveFile } = require("../../helpers");


const editService = async (req, res, next) => {

    try {

        let { description, category, realized} = req.body;

        if( !description || !category || !realized){

            throw generateError('Missing fields', 400);
        }

        const {idService} = req.params;

        const service = await selectServiceByIdQuery(idService);


        let file;

        if(req.files?.file) {
           
            file = await saveFile(req.files.file);
        }

        
        description = description || service.description;
        category = category || service.category;
        realized = realized || service.realized;


        await updateServiceQuery( description, category, realized, idService)

        res.send({
            status: 'ok',
            message: 'Updated service!!!!'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = editService;