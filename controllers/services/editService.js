const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");
const updateServiceQuery = require("../../db/serviceQueries/updateServiceQuery");
const { generateError, deletePhoto, savePhoto } = require("../../helpers");


const editService = async (req, res, next) => {

    try {

        let { title, description, category, realized} = req.body;

        if(!title || !description || !req.files?.file || !category || !realized){

            throw generateError('Missing fields', 400);
        }

        const {idService} = req.params;

        

        const service = await selectServiceByIdQuery(idService);

        if (service.idUser !== req.user.id) {
            throw generateError(`You can't modify other service`, 403);
        }

        let file;

        if(req.files?.file) {
            if(service.file) {
                await deletePhoto(service.file);
            }

            file = await savePhoto(req.files.file);
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