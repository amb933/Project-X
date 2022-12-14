/* - POST [/services] - Allows to create a service.*/ 

const insertServiceQuery = require("../../db/serviceQueries/insertServiceQuery");
const { generateError, saveFile } = require("../../helpers");

const newService = async (req, res, next) => {

    try {

        const { title , description, category, realized } = req.body;

        if (!title || !description || !category ||  !realized) {
            throw generateError(`There are still fields to cover`, 400);
        }

            // Variable where we store the file name 
            let file;

            if(req.files?.file) {

                file = await saveFile(req.files.file)
                
            }

            const service = await insertServiceQuery(req.user.id, title, description, file, category, realized);

            res.send({
                status: 'ok',
                data: {
                    service

                },
            });
        
    } catch (err) {
        next(err);
    }
}

module.exports = newService;