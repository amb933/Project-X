/* - PUT [/users] - Edit username, email or avatar. TOKEN */ 

const selectUserByIdQuery = require("../../db/userQueries/selectUserByIdQuery");
const updateUserQuery = require("../../db/userQueries/updateUserQuery");
const { generateError, deletePhoto, savePhoto } = require("../../helpers");
const userSchema = require("../../schema");

const editUser = async (req, res, next) => {
    try {
        
        let { username, biography, email } = req.body;


        if (!username && !biography && !email && !req.files?.avatar) {
            throw generateError('Missing fields', 400);
        }
        
        const user = await selectUserByIdQuery(req.user.id);

        let avatar;

        if(req.files?.avatar) {

            if(user.avatar) {

                await deletePhoto(user.avatar);
            }

            avatar = await savePhoto(req.files.avatar);
        }

        username = username || user.username;
        biography = biography || user.biography;
        email = email || user.email;
        avatar = avatar || user.avatar;

        await updateUserQuery(username, biography, email, avatar, req.user.id);

        res.send({
            status: 'ok',
            message: 'Updated user!!!!!!'
        });
        
    } catch (err) {
        next(err)
    }
};

module.exports = editUser;