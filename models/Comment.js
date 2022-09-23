const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')
const Post = require('./Post')

const Comment = db.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        require: true
    },
    },
    {
      timestamps: false,
    })

Comment.belongsTo(User)




module.exports = Comment