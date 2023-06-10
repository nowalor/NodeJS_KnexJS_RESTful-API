const { check } = require('express-validator')

const createPostRules = [
    check('title').notEmpty().isString(),
    check('content').notEmpty().isString(),
]

module.exports = { createPostRules }