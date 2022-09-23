const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')
const Comment = require('./Comment')

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        require: true
    },
    image: {
        type: DataTypes.STRING,
        require: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        require: false
    }
    },
    {
      timestamps: false,
    })

Post.belongsTo(User)

User.hasMany(Post)

Post.hasMany(Comment)


module.exports = Post