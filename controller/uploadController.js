const express = require('express');
const router = express.Router();
const uploadModel = require('../model/uploadModel');
const userModel = require('../model/userModel');
const cloudinary = require("../utils/cloudinary");
const { image } = require('../multer');
const verify = require('../utils/verification');
const mongoose = require('mongoose');

router.post("/:id/upload", image, async (req, res) => {
    try {
        const getUser = await userModel.findById(req.params.id);
        const myImage = await cloudinary.uploader.upload(req.file.path);
        const imageUpload = await uploadModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            image: myImage.secure_url,
            imageID: myImage.public_id
        });

        imageUpload.user = getUser;
        imageUpload.save();

        getUser.uploads.push(mongoose.Types.ObjectId(imageUpload._id));
        getUser.save();
        res.status(201).json({
            status: "Success",
            data: imageUpload
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
        console.log(error);
    }
});
router.get("/getAll", async (req, res) => {
    try {
        const myImage = await uploadModel.find();
        res.status(200).json({
            status: "Success",
            data: myImage
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
});
router.get("/getAll/:imageid", async (req, res) => {
    try {
        const myImage = await uploadModel.findById(req.params.imageid).populate('user');
        res.status(200).json({
            status: "Success",
            data: myImage
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
});
router.patch("/getAll/:imageid", verify, image, async (req, res) => {
    try {
        if (req.user.admin === true) {
            const check = await uploadModel.findById(req.params.imageid);
            if (check) {
                const { title, description } = req.body;
                const myImage = await uploadModel.findById(req.params.imageid);
                await cloudinary.uploader.destroy(req.params.imageid);
                const result = await uploadModel.findByIdAndUpdate(req.params.imageid, {
                    title,
                    description,
                    image: myImage.secure_url,
                    imageID: myImage.public_id
                }, { new: true });
                res.status(200).json({
                    status: "Success",
                    data: result
                });
            } else {
                res.status(404).json({
                    message: 'image not found'
                });
            }
        } else {
            res.status(300).json({
                message: 'Image not found'
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
});
router.delete("/getAll/:imageid", async (req, res) => {
    try {
        const myImage = await uploadModel.findById(req.params.imageid);
        const result = await uploadModel.findByIdAndDelete(req.params.imageid);
        res.status(200).json({
            status: "Successfully Deleted",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
});

module.exports = router;