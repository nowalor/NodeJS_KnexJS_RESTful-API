const express= require('express')

// Controllers
const { getAllPosts, getSinglePost, createPost} = require('./controllers/postController')
const { login } = require('./controllers/authController')

// Validation rules
const { createPostRules } = require('./validation/postsValidation')

const router = express.Router()

// Post routes
router.get('/posts', getAllPosts)
router.get('/posts/:id', getSinglePost)
router.post('/users/:id/posts', createPostRules, createPost)

// Auth routes
router.post('/auth/login', login)

module.exports = router