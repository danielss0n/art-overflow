const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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