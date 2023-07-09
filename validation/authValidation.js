const { check } = require('express-validator')

const registerRules = [
    check('email').notEmpty().isEmail(),
    check('password').isStrongPassword()
]

module.exports = { registerRules }