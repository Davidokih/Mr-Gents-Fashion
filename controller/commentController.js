const express = require("express")
const router = express.Router()
const uploadModel = require('../model/uploadModel')
const commentModel = require('../model/commentModel')
const userModel = require('../model/userModel')


router.post('/getAll/:imageid/comment', async (req, res) => {
    try {
        const userData = await userModel.findById(req.params.id)
        const upload = await uploadModel.findById(req.params.imageid)
        const comment = new commentModel(req.body)
        comment.poster = upload

        comment.save()

        upload.comments.push(comment)

        upload.save()

        res.status(201).json({
            status: "Success",
            data: comment
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        })
    }
})


router.get('/getAll/:imageid/comment', async (req, res) => {
    try {
        const getAll = await uploadModel.find().populate()
        res.status(200).json({
            status: "success",
            data: getAll
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        })
    }
})
router.get('/getAll/:imageid/comment/:commentid', async (req, res) => {
    try {
        const getAll = await commentModel.findById(req.params.commentid).populate()
        res.status(200).json({
            status: "success",
            data: getAll
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        })
    }
})
router.patch('/getAll/:imageid/comment/:commentid', async (req, res) => {
    try {
        const getAll = await uploadModel.findByIdAndUpdate(req.params.commentid)
        res.status(200).json({
            status: "success",
            data: getAll
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        })
    }
})
router.get('/getAll/:imageid/comment/:commentid', async (req, res) => {
    try {
        const getAll = await uploadModel.findById(req.params.commentid)
        res.status(200).json({
            status: "success",
            data: getAll
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        })
    }
})

module.exports = router