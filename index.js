const express = require('express')

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)

app.listen(5001, () => {
    console.log('Listening on port 5001')
})

