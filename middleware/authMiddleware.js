const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if(typeof authHeader === 'undefined') {
        return res.status(403).json({
            success: false,
            message: 'Authorization header is required to make this request'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedUserPayload = jwt.verify(token, '12345')

        req.auth = decodedUserPayload
    } catch(err) {
        throw err
    }

    next()
}

module.exports =  authMiddleware
