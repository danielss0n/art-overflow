const Post = require('../models/Post')
const User = require('../models/User')

const bcrypt = require('bcrypt')
const { imageUpload } = require('../helpers/image-upload')

module.exports = class authController {
    static posting(req, res) {
        const {title, description} = req.body

        const image = req.file.originalname.replace(/\s/g, '')
        

        
        const newPost = new Post({title, description, image})
        newPost.save()

        return
        

    }

    static async dashboard(req, res) {
        const userId = req.session.userid;

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Post,
            plain: true,
        });



    if (!user) {
      res.redirect("/login");
    }

    /*
    const posts = user.Post.map((result) => result.dataValues);

    let emptyPosts = false;
    if (posts.length === 0) {
      emptyPosts = true;
    }
    */
    
    res.render("home/dashboard" /*, { posts, emptyPosts } */);
    }

   
}