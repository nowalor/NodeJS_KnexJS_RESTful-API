const db = require('../database/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const tempKeyReplaceLater = '12345'

async function register(req, res) {
    const { email, password } = req.body

    const oldUser = await db.select('*').from('users').where('email', email).first()

    if(oldUser) {
        return res.status(422).json({
            message: 'User with this email already exists'
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await db('users').insert({
        email,
        password: hashedPassword,
    }, 'id')

    const data = {
        id: user[0],
        email
    }

    return res.status(201).json({
        success: true,
        data
    })
}

async function login(req, res) {
    const { email, password } = req.body

    const user = await db.select('*').from('users').where('email', email).first()

    if (typeof user === 'undefined') {
        return res.status(401).json({
            success: false,
            message: 'Email or password is incorrect',
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: 'Email or password is incorrect',
        })
    }

   const token = jwt.sign({id: user.id, email: user.email}, tempKeyReplaceLater)

    const data = {
        id: user.id,
        email,
        token,
    }

    return res.status(200).json({
        success: true,
        data,
    })
}

module.exports = { register, login }