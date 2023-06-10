const express= require('express')

// Controllers
const { getAllPosts, getSinglePost, createPost} = require('./controllers/postController')

// Validation rules
const { createPostRules } = require('./validation/postsValidation')

const router = express.Router()

router.get('/posts', getAllPosts)
router.get('/posts/:id', getSinglePost)
router.post('/users/:id/posts', createPostRules, createPost)

module.exports = router