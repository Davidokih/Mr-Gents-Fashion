const express = require('express')
const router = express.Router()
const uploadModel = require('../model/uploadModel')
const cloudinary = require("../utils/cloudinary")
const fs = require('fs')
const { image } = require('../multer')


router.post("/upload", image, async (req, res) => {
    try {
        const myImage = await cloudinary.uploader.upload(req.file.path)
        const imageUpload = await uploadModel.create({
            title: req.body.title,
            description: req.body.description,
            image: myImage.secure_url,
            imageID: myImage.public_id
        })

        res.status(201).json({
            status: "Success",
            data: imageUpload
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
        // console.log(error)
    }
})
router.get("/getAll", async (req, res) => {
    try {
        const myImage = await uploadModel.find()
        res.status(200).json({
            status: "Success",
            data: myImage
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
})
router.get("/getAll/:imageid", async (req, res) => {
    try {
        const myImage = await uploadModel.findById(req.params.imageid)
        res.status(200).json({
            status: "Success",
            data: myImage
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
})
router.patch("/getAll/:imageid", async (req, res) => {
    try {
        const { title, description } = req.body
        const myImage = await uploadModel.findById(req.params.imageid)
        await cloudinary.uploader.destroy(req.params.imageid)
        const result = await uploadModel.findByIdAndUpdate(req.params.imageid, {
            title,
            description,
            image: myImage.secure_url,
            imageID: myImage.public_id
        }, { new: true })
        res.status(200).json({
            status: "Success",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
})
router.delete("/getAll/:imageid", async (req, res) => {
    try {
        const myImage = await uploadModel.findById(req.params.imageid)
        const result = await uploadModel.findByIdAndDelete(req.params.imageid)
        res.status(200).json({
            status: "Successfully Deleted",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
})

module.exports = router