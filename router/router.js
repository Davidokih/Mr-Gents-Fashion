const express = require('express')
const router = express.Router()

const { getAllUser, getOneUser, deleteUser, signIn } = require("../controller/userController")

router.route("/return").get(getAllUser).post(signIn)
router.route("/return/:id").get(getOneUser)
router.route("/delete/:id").delete(deleteUser)

module.exports = router