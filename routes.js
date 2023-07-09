const express= require('express')

// Controllers
const { getAllPosts, getSinglePost, createPost} = require('./controllers/postController')
const { login, register} = require('./controllers/authController')

// Validation rules
const { createPostRules } = require('./validation/postsValidation')
const { registerRules } = require("./validation/authValidation")

// Middlewares
const authMiddleware = require('./middleware/authMiddleware')

const router = express.Router()

// Post routes
router.get('/posts', getAllPosts)
router.get('/posts/:id', getSinglePost)
router.post('/users/:id/posts', createPostRules, authMiddleware, createPost)

// Auth routes
router.post('/auth/register', registerRules,register)
router.post('/auth/login', login)

module.exports = router