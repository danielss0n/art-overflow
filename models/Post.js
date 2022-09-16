const mongoose = require("mongoose");
const { Schema } = mongoose

const User = require('./User')

const Post = mongoose.model(
  'Post',
  new Schema({
      title: { type: String, required: true},
      description: { type: String, required: true},
      image: { type: String},
  })
)


module.exports = Post;