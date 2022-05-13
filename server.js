require("./config/db")
const express = require('express')
const port = 3554

const app = express()

app.use(express.json())
app.use('', express.static('./uploads'))

app.use("/api", require("./router/router"))
app.use("/api", require("./otherFileControl/signUp"))

app.use("/api", require('./controller/uploadController'))
app.use("/api", require('./controller/commentController'))

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
