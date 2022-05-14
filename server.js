require('dotenv').config()
require("./config/db")
const express = require('express')
const port = process.env.PORT || 3554
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('', express.static('./uploads'))

app.use("/", require("./router/router"))
app.use("/", require("./otherFileControl/signUp"))

app.use("/", require('./controller/uploadController'))
app.use("/", require('./controller/commentController'))

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
