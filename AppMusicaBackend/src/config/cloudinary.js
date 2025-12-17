const cloudnary = require('cloudinary').v2;
const randomstring = require('randomstring');

require('dotenv').config();

cloudnary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: false
});

const uploadFile = (file) => {
    return cloudnary.uploader.upload(file.tempFilePath, {
        folder: 'AppMusica',
        public_id: randomstring.generate(15),
        resource_type: 'auto'
    });
}

const deleteFile = (public_id) => {
    return cloudnary.uploader.destroy(public_id, {resource_type: 'raw'});
};

module.exports = { uploadFile, deleteFile }