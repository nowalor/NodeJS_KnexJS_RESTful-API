const {validationResult} = require('express-validator')
const db = require('../database/db')

async function getAllPosts(req, res) {
    const posts = await db.select('*').from('posts')

    res.status(200).json({
        success: true,
        data: posts,
    })
}

async function getSinglePost(req, res) {
    const postId = req.param('id')

    const post = await db.select('*').from('posts').where('id', postId).first()

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        })
    }

    return res.status(200).json({
        success: true,
        data: post,
    })
}

async function createPost(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({success: false, errors: errors,})
    }

    const userId = req.param('id')

    const user = await db.from('users').where('id', userId).first()

    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User does not exist',
        })
    }

    res.send(req.auth)

    const { title, content } = req.body

    const post = await db('posts').insert({ title, content, user_id: user.id })

    res.send(post)
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
}