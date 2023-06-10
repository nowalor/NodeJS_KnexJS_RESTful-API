const express = require('express')

const app = express()

app.listen(5001, () => {
    console.log('Listening on port 5001')
})

// DB STUFF

const knex = require('knex')

const db = knex({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'secret',
        database : 'knexjs_api'
    }
})

// ROUTES
app.get('/posts', async (req, res) => {
    const posts =  await db.select('*').from('posts')

    console.log('posts', posts)

    res.status(200).json({
        success: true,
        data: posts,
    })
})