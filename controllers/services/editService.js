const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");
const updateServiceQuery = require("../../db/serviceQueries/updateServiceQuery");
const { generateError, saveFile } = require("../../helpers");


const editService = async (req, res, next) => {

    try {

        let { title, description, category, realized} = req.body;

        if(!title || !description || !req.files?.file || !category || !realized){

            throw generateError('Missing fields', 400);
        }

        const {idService} = req.params;

        const service = await selectServiceByIdQuery(idService);



        let file;

        if(req.files?.file) {
           
            file = await saveFile(req.files.file);
        }

        title = title || service.title;
        description = description || service.description;
        file = file || service.file;
        category = category || service.category;
        realized = realized || service.realized;


        await updateServiceQuery(title, description, file, category, realized, idService)

        res.send({
            status: 'ok',
            message: 'Updated service!!!!'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = editService;