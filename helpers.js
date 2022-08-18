const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const fileUpload = require('express-fileupload');

const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data); // .validateAsync is a method of JOI schemas "magic".
    } catch (err) {
        err.statusCode = 400; // Joi is in charge of adding the error
        throw err;
    }
}

/**
 * ################
 * ## Save Photo ##
 * ################
 */

 const savePhoto = async (img) => {
    // We create an absolute path to the directory where we are going to upload the images.
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

    try {
        // We try to access the upload directory using the "access" method of fs.
        // This method generates an error if the file cannot be accessed.
        await fs.access(uploadsPath);
    } catch {
        //  If we get an error it means that the directory does not exist, so we create it.
        await fs.mkdir(uploadsPath);
    }

    // We process the image and change it into an object of type "Sharp".
    const sharpImg = sharp(img.data);

    // We resize the image to prevent them from being too heavy. We assign a max width of 500px.
    sharpImg.resize(500);

    // We generate a unique name for the image.
    const imgName = `${uuid()}.jpg`;

    // We generate the absolute path where we want to save the image.
    const imgPath = path.join(uploadsPath, imgName);

    // Save the image in the appropriate directory.
    await sharpImg.toFile(imgPath);

    // We return the name we have given to the image.
    return imgName;
};

/**
 * ################
 * ## Save File ##
 * ################
 */

async function saveFile(file) {
    // Absolute path where the uploaded files will be stored
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);
    try {
        await fs.access(uploadsPath);
    } catch {
        await fs.mkdir(uploadsPath);
    }

    const fileExt = path.extname(file.name);


    // Change the received file to a fileUpload object
    //const saveFileUpload = fileUpload(file.data);

    // We use the uuid dependency to create an "encrypted" name of the file
    const archiveName = `${uuid()}${fileExt}`;

    // Generate the absolute path where we want to save the file
    const filePath = path.join(uploadsPath, archiveName)

    await file.mv(filePath)

    return archiveName;
}



/**
 * ##################
 * ## Delete Photo ##
 * ##################
 */

const deletePhoto = async (imgName) => {
    try {
        // We create the absolute path to the image we want to delete.
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

        try {
            //We try to access the file with the image using the "access" method of fs. 
            //This method generates an error if it is not possible to access the file.
            await fs.access(imgPath);
        } catch {
            // If we get the error it means that the image doesn't exist 
            //so we do a "return" and end the function.
            return false;
        }

        // Delete the image from the HDD (Hard Disk Drive). 
        await fs.unlink(imgPath);

        return true;
    } catch {
        throw generateError('Error deleting image from server');
    }
};


/**
 * ####################
 * ## Generate Error ##
 * ####################
 */
 const generateError = (message, status) => {
    const err = new Error(message);
    err.statusCode = status;
    return err;
};


module.exports =  {
    generateError,
    validateSchema,
    deletePhoto,
    savePhoto,
    saveFile,
 
}