const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.envCLOUD_KEY,
    api_secret: process.envCLOUD_SECRET,
    secure: true
});

module.exports = cloudinary