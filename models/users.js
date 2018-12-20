
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userIP: String,
  likedStocks: [String]
})

module.exports = mongoose.model('StockPrice-user', userSchema)

