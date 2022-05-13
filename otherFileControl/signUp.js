const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const { upload } = require("../multer");


router.post("/register", upload, async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const image = await cloudinary.uploader.upload(req.file.path);

        const createUser = await userModel.create({
            email,
            password: hashed,
            userName,
            avatar: image.secure_url,
            avatarID: image.public_id,
        });

        res.status(201).json({
            message: "member created ",
            data: createUser,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router
