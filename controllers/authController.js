const db = require('../database/db')
const jwt = require('jsonwebtoken')
const bycrpt = require('bcrypt')

const tempKeyReplaceLater = '12345'

async function register(req, res) {
    const { email, password } = req.body

    const user = await db.select('*').from('users').where('email', email).first()

    if(user) {
        return res.status(422).json({
            message: 'User with this email already exists'
        })
    }

    const hashedPassword = bycrpt.hashSync(password, 10)
    res.send(hashedPassword)
}

async function login(req, res) {
    const { email, password } = req.body

    const user = await db.select('*').from('users').where('email', email).first()

    // TODO verify email

   const token = jwt.sign({id: user.id, email: user.email}, tempKeyReplaceLater)

    res.send(token)
}

module.exports = { login }