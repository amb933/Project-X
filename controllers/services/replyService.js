
const insertReplyQuery = require('../../db/serviceQueries/insertReplyQuery');
const { generateError, saveFile } = require('../../helpers');

const replyService = async (req, res, next) => {

    try {
        
        const { idService } = req.params;
        let { observations } = req.body;
        if(!observations){

            throw generateError('You must write any observation', 400);
        }

        let file;

        if(req.files?.file) {
           
            file = await saveFile(req.files.file);
        }

        console.log(file);


        const reply = await insertReplyQuery(req.user.id, idService, file, observations);


        console.log(reply);
 
        res.send({
            status: 'ok',
            data: {
                message: 'Reply successfully'
            }
        })


    } catch (err) {
        next(err);
    }
}

module.exports = replyService; 