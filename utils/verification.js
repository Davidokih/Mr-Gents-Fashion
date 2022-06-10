const jwt = require('jsonwebtoken')

const verificator = async (req, res) => {
    try {
        const checkAut = req.headers.authorization
        if (checkAut) {
            const token = checkAut.split(" ")
            if (token) {
                jwt.verify(token, "MrgentFashion", (error, payload) => {
                    if (error) {
                        res.status(500).json({
                            message: error.message
                        })
                    } else {
                        req.user = payload
                        next()
                    }
                })
            } else {
                res.status(500).json({
                    message: "Invalid token"
                })
            }
        } else {
            res.status(500).json({
                message: 'Access denied'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

module.exports = verificator