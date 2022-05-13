const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await userModel.findOne({ email })

        if (findUser) {
            const passCheck = await bcrypt.compare(password, findUser.password)

            if (passCheck) {
                const token = jwt.sign({
                    _id: findUser._id,
                    userName: findUser.userName,
                    email: findUser.email,
                    password: findUser.password
                }, "MrgentFashion", { expiresIn: "1d" })

                const { password, ...info } = findUser._doc
                res.status(201).json({
                    status: `Welcome back ${findUser.userName}`,
                    data: { token, ...info }
                })
            } else {
                res.status(500).json({
                    status: "Incorrect password"
                })
            }
        } else {
            res.status(500).json({
                status: 'User does not exits'
            })
        }
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const getUser = await userModel.find()
        res.status(200).json({
            status: "Success",
            data: getUser
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail to get All",
            message: error.message
        })
    }
}

const getOneUser = async (req, res) => {
    try {
        const getUser = await userModel.findById(req.params.id)
        res.status(200).json({
            status: "Success",
            data: getUser
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail to get All",
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const getUser = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Success",
            data: getUser
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail to get All",
            message: error.message
        })
    }
}

module.exports = {
    getAllUser,
    getOneUser,
    deleteUser,
    signIn
}