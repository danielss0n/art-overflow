const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')
const Comment = require('./Comment')

const Post = db.define('Post', {
    PostId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
        references: {
            model: User,
            key: "UserId"
        }
    }
    },
    {
      timestamps: false,
    })

Post.belongsTo(User, {foreignKey: "PostId", as: 'User'})
User.hasMany(Post, {as: 'Post', foreignKey : 'PostId'})



module.exports = Post