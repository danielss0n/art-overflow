const Post = require('../models/Post')
const User = require('../models/User')

const bcrypt = require('bcrypt')
const { imageUpload } = require('../helpers/image-upload')
const {sessionRedirect} = require('../helpers/session-redirect')

module.exports = class postController {
    

    static async postPage(req, res) {
      const title = req.params.title

      const post = await Post.findOne({where: {title: title},raw: true})
      res.render('post/post',  {post} )
    }

    static createPage(req, res) {
      res.render('post/postingPage')
    }

    static async create(req, res) {

        const newPost = {
            title: req.body.title,
            description: req.body.description, 
            image: req.body.filename, 
            UserId: req.session.userid
        }

        Post.create(newPost)
        
        sessionRedirect(req, res, '/posts/dashboard')
    
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
          return res.redirect("/login");
        }

    
    const posts = user.Posts.map((result) => result.dataValues)

    
    let emptyPosts = true;
    if (posts.length > 0) {
      emptyPosts = false;
    }
    
    
    res.render("home/dashboard" , { posts, emptyPosts } );
    }

    static render(req, res) {
        res.render('home/homePage')
    }

    static async showPosts(req, res) {
        const posts = await Post.findAll({raw: true})

        //const user = await User.findOne({where: {id: posts.UserId}}
        let search = ''

        if (req.query.search) {
        search = req.query.search
        }

        // order results, newest first
        let order = 'DESC'

        if (req.query.order === 'old') {
        order = 'ASC'
        } else {
        order = 'DESC'
        }

        Post.findAll({
            include: User,
          })
            .then((data) => {
              let postsQty = data.length
      
              if (postsQty === 0) {
                postsQty = false
              }
      
              const posts = data.map((result) => result.get({ plain: true }))
      
              res.render('home/posts', { posts, postsQty, search })
            })
            .catch((err) => console.log(err))

    }
   
}