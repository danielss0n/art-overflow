const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Comment = require('./Comment')
const User = db.define('User', {
    UserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    profilepic: {
      type: DataTypes.STRING,
    },
    skill: {
      type: DataTypes.STRING,
      require: true
    },
},    {
  timestamps: false,
})

module.exports = User