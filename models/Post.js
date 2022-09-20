const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

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
    }
    },
    {
      timestamps: false,
    })

Post.belongsTo(User)
User.hasMany(Post)


module.exports = Post