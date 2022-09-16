const User = require('../models/User')
const Post = require('../models/Post')

module.exports = class homeController {
    static render(req, res) {
        res.render('home/homePage')
    }

    static async showPosts(req, res) {
        const posts = await Post.find({}).lean()
    

        res.render('home/posts', { posts })
    }
}