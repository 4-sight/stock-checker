
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  stock: String,
  likes: Number
})

module.exports = mongoose.model('StockPrice-stocks', stockSchema)

