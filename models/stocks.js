
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  stock: String,
  likes: Number
})

const StockDB = mongoose.model('StockPrice-stocks', stockSchema)

//Methods

StockDB.addLikeAndReturn = async function (stock) {

  let result = await this.findOneAndUpdate(
    { stock: stock },
    { $inc: { likes: 1 }},
    {
      upsert: true,
      new: true
    },
  ).then(result => result._doc.likes)
  
  return result
}

StockDB.getLikesAndReturn = async function (stock) {

  let numLikes = await this.findOne({ stock: stock.symbol })
    .then(res => {
      if(res) {return res._doc.likes}
    })
  return numLikes
}


module.exports = StockDB