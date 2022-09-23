const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
var url = require('url');

const bcrypt = require('bcrypt')
const { imageUpload } = require('../helpers/image-upload')
const {sessionRedirect} = require('../helpers/session-redirect')

module.exports = class postController {
    

    static async postPage(req, res) {
      const title = req.params.title

      

      const post = await Post.findOne({include: Comment,where: {title: title},raw: true})


      var comment = await Comment.findAll({
        where: {
            PostId: post.id,
        },
        include: User,
     
          raw: true,
        })

        Comment.findAll({
          where: {
            PostId: post.id,
          },
          include: User
        }).then((data) => {
    
          const comments = data.map((result) => result.get({ plain: true }))
          
          res.render('post/post', { post, comments })
        })
  
        
      
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
              
              console.log(posts)
              res.render('home/posts', { posts, postsQty, search })
            })
            .catch((err) => console.log(err))

    }

    static async comment(req, res) {
      console.log("AAAAAA")

      var url_title = await req.params.title

      const post = await Post.findOne({where: {title: url_title}, raw: true})

      console.log(post.id)

      const comment = {
        comment: req.body.comment,
        UserId: req.session.userid,
        PostId: post.id
      }

    
      await Comment.create(comment)
    
      console.log(comment)

      sessionRedirect(req, res, `/posts/${url_title}`)
    }
   
}