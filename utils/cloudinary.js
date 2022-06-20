const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: "353622814343242",
    api_secret: "QeAuML_hstw5s3RDsI8uAl-hyMc",
    secure: true
});

module.exports = cloudinary;
