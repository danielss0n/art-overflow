const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/artOverflow')
  console.log('conectou!!!!!')
}

main()

module.exports = mongoose
