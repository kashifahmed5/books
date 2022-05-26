const express = require('express')
const booksRoute = require('./routes/app')
const cors = require('cors')
const port = 7000

const app = express()

app.use(cors())
app.use(express.json())

app.use(booksRoute)

app.listen(port, () => {
    console.log('Server is listning on port ' + port)
})
