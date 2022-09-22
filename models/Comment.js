const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')
const Post = require('./Post')

const Comment = db.define('Comment', {
    CommentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comment: {
        type: DataTypes.STRING,
        require: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "UserId"
        },
    },
    PostId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: "PostId"
        }
    }
    },
    {
      timestamps: false,
    })

Comment.belongsTo(User, {foreignKey: 'UserId', as: 'UserId'})

Comment.belongsTo(Post, {foreignKey: 'PostId', as: 'PostId'})

Post.hasMany(Comment, {as: 'CommentId', foreignKey: 'CommentId'})
User.hasMany(Comment)


module.exports = Comment