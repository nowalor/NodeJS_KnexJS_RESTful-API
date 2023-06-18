const db = require('../database/db')
const jwt = require('jsonwebtoken')

const tempKeyReplaceLater = '12345'

async function login(req, res) {
    const { email, password } = req.body

    const user = await db.select('*').from('users').where('email', email)

   const token = jwt.sign({id: user.id, email: user.email}, tempKeyReplaceLater)

    res.send(token)
}

module.exports = { login }