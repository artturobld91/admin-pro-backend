const path = require('path'); // Native from Node.js
const fs = require('fs'); // Native from Node.js

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['hospitals', 'doctors', 'users'];

    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'Is not a doctor, user or hospital'
        });
    }

    // Validating file to exists in request
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'There is no file'
        });
    }

    //Process the image
    const file = req.files.image;
    console.log(file);
    const shortname = file.name.split('.');
    const fileExtension = shortname[shortname.length-1];

    //Validate Extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if(!validExtensions.includes(fileExtension))
    {
        return res.status(400).json({
            ok: false,
            msg: 'File Extension is not valid'
        });
    }

    //Generate File name
    const fileNameUUID = `${uuidv4()}.${fileExtension}`;

    //Path to store the image
    const path = `./uploads/${type}/${fileNameUUID}`;

    // Move the image
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error when moving the image'
            });
        }

        res.json({
            ok: true,
            msg: 'File uploaded',
            fileName: fileNameUUID
        })
    });

    //Update DB
    updateImage( type, id, fileNameUUID);
    
}

const returnImage = (req, res) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

    //Default Image
    if(fs.existsSync(pathImg))
    {
        res.sendFile(pathImg);
    }
    else
    {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`)
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    returnImage
}