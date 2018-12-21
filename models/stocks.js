
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  stock: String,
  likes: Number
})

const StockDB = mongoose.model('StockPrice-stocks', stockSchema)

//Methods

StockDB.addLikeAndReturn = function (stock) {

  let result = this.findOneAndUpdate(
    { stock: stock },
    { $inc: { likes: 1 }},
    {
      upsert: true,
      new: true
    },
  ).then(result => result._doc.likes)
  
  return result
}

StockDB.getLikesAndReturn = function (stock) {

  let numLikes = this.findOne({ stock: stock })
    .then(res => {
      if(res) {return res._doc.likes}
      else 
      if(!res) { return 0 }
    })

  return numLikes
}


module.exports = StockDB